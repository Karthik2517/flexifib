import { execFileSync } from "node:child_process"
import { appendFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const projectRoot = fileURLToPath(new URL("../", import.meta.url))
const code = /\.(?:[cm]?[jt]sx?)$/
const browserFile = /^tests\/e2e\/.*\.spec\.ts$/
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

function filesUnder(root, directory) {
  if (!existsSync(path.join(root, directory))) return []
  return readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const name = `${directory}/${entry.name}`
    return entry.isDirectory() ? filesUnder(root, name) : [name]
  })
}

// Follow local imports, re-exports, import(), require() and local mock targets.
// This covers shared helpers and dynamically loaded components as well as pages.
export function sourceGraph(root = projectRoot) {
  const files = filesUnder(root, "src")
  const known = new Set(files)
  const reverse = new Map()
  for (const file of files.filter((file) => code.test(file))) {
    const source = ts.createSourceFile(file, readFileSync(path.join(root, file), "utf8"), ts.ScriptTarget.Latest, true)
    const imports = new Set()
    function visit(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        imports.add(node.moduleSpecifier.text)
      }
      if (ts.isCallExpression(node) && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) imports.add(node.arguments[0].text)
      ts.forEachChild(node, visit)
    }
    visit(source)
    for (const specifier of imports) {
      const base = specifier.startsWith("@/") ? `src/${specifier.slice(2)}`
        : specifier.startsWith(".") ? path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier)) : null
      if (!base) continue
      const resolved = [base, ...[".ts", ".tsx", ".js", ".jsx", ".mts", "/index.ts", "/index.tsx"].map((suffix) => base + suffix)].find((candidate) => known.has(candidate))
      if (!resolved) continue
      if (!reverse.has(resolved)) reverse.set(resolved, new Set())
      reverse.get(resolved).add(file)
    }
  }
  return { files, reverse }
}

function routeOf(page) {
  return "/" + page.replace(/^src\/app\//, "").replace(/(?:^|\/)page\.[jt]sx?$/, "")
    .split("/").filter((part) => part && !part.startsWith("(")).join("/")
}

export function createPlan(changed, { root = projectRoot, base = null, full = false, fullBrowsers = false, graph } = {}) {
  const meaningful = changed.filter((file) => !/\.(?:md|txt)$/.test(file) && !/^(?:LICENSE|\.gitignore)$/.test(file))
  const runtime = meaningful.some((file) => /^(?:src|public)\//.test(file))
  const all = full || meaningful.some((file) =>
    /^(?:package(?:-lock)?\.json|tsconfig\.json|vercel\.json|next\.config\..*|postcss\.config\..*|tailwind\.config\..*|eslint\.config\..*|scripts\/ci-.*|\.github\/workflows\/.*)$/.test(file)
    || (file.startsWith("src/") && !existsSync(path.join(root, file))))
  const unitAll = all || meaningful.some((file) => /^vitest\.config\./.test(file) || file === "tests/unit/setup.ts")
  const browserAll = all || meaningful.some((file) => file === "playwright.config.ts" || file === "tests/e2e/fixtures.ts" || file.startsWith("public/"))
  const unit = unitAll ? "all" : meaningful.some((file) => file.startsWith("src/") || file.startsWith("tests/unit/")) ? "changed" : "none"
  const lintAll = all || meaningful.some((file) => /^eslint\.config\./.test(file))
  const lint = lintAll ? ["."] : meaningful.filter((file) => code.test(file) && existsSync(path.join(root, file)))
  const typecheck = all || meaningful.some((file) => /\.(?:tsx?|mts|cts)$/.test(file))
  const browserFiles = meaningful.filter((file) => browserFile.test(file) && existsSync(path.join(root, file)))
  const tags = new Set()
  const routes = new Set()
  let broad = browserAll || meaningful.some((file) => file.startsWith("tests/e2e/") && !browserFile.test(file))

  if (runtime && !broad) {
    const { files, reverse } = graph ?? sourceGraph(root)
    const affected = new Set(meaningful)
    for (const file of affected) for (const consumer of reverse.get(file) ?? []) affected.add(consumer)
    broad = ["src/app/layout.tsx", "src/app/template.tsx", "src/app/globals.css", "src/proxy.ts"].some((file) => affected.has(file))
    const pages = files.filter((file) => /^src\/app\/.+page\.[jt]sx?$/.test(file) || file === "src/app/page.tsx")
    for (const page of pages) {
      const layoutAffected = [...affected].some((file) => /\/(?:layout|template)\.[jt]sx?$/.test(file) && page.startsWith(path.posix.dirname(file) + "/"))
      if (!affected.has(page) && !layoutAffected) continue
      const route = routeOf(page)
      // Use the existing product smoke fixture for this generated route family.
      if (route === "/shop/[slug]") routes.add("/shop/launch-toothbrush-soft")
      else if (route.includes("[")) broad = true // Unknown parameter fixture: widen rather than silently skip.
      else routes.add(route)
    }
    if ([...affected].some((file) => file.startsWith("src/app/auth/"))) tags.add("@auth")
    for (const route of routes) {
      tags.add(`@route:${route}`)
      if (route === "/" || route === "/insights") tags.add("@newsletter")
      if (route === "/contact") tags.add("@contact")
      if (route === "/business") tags.add("@business")
      if (route === "/careers") tags.add("@careers")
      if (route.startsWith("/shop")) { tags.add("@shop"); tags.add("@cart") }
      if (["/login", "/signup", "/account"].includes(route)) tags.add("@auth")
    }
    if (routes.size) tags.add("@routes")
  }
  // A deleted spec cannot be run by filename, so check its remaining siblings.
  if (meaningful.some((file) => browserFile.test(file) && !existsSync(path.join(root, file)))) broad = true
  const e2e = broad || tags.size > 0 || browserFiles.length > 0
  const patterns = [...tags].map((tag) => `(?:^|\\s)${escape(tag)}(?=\\s|$)`)
  patterns.push(...browserFiles.map((file) => escape(path.posix.basename(file))))
  return {
    changed, base, unit: unit === "changed" && !base ? "all" : unit,
    lint, typecheck, build: e2e || runtime || all, e2e,
    fullBrowsers,
    grep: broad ? null : patterns.join("|"),
    routes: broad ? null : browserFiles.includes("tests/e2e/smoke.spec.ts")
      ? [...new Set(["/", "/shop/launch-toothbrush-soft", "/contact", ...routes])].sort()
      : [...routes].sort(),
    reason: broad ? "Shared app/configuration change or full run" : "Checks selected from changed files and transitive local imports",
  }
}

export function readDiff({ root = projectRoot, base, mergeBase = false } = {}) {
  if (!base || /^0+$/.test(base)) return { changed: [], base: null, full: true }
  try {
    const verified = execFileSync("git", ["rev-parse", "--verify", `${base}^{commit}`], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
    const comparison = mergeBase ? execFileSync("git", ["merge-base", verified, "HEAD"], { cwd: root, encoding: "utf8" }).trim() : verified
    const changed = execFileSync("git", ["diff", "--name-only", "--no-renames", "-z", comparison, "HEAD"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean)
    return { changed, base: comparison, full: false }
  } catch {
    return { changed: [], base: null, full: true }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const diff = process.argv[2] === "--files"
    ? { changed: process.argv.slice(3), base: process.env.CI_DIFF_BASE || "HEAD", full: false }
    : readDiff({ base: process.env.CI_DIFF_BASE, mergeBase: process.env.GITHUB_EVENT_NAME === "pull_request" })
  const plan = createPlan(diff.changed, { ...diff, full: diff.full || process.env.E2E_FULL === "1", fullBrowsers: process.env.E2E_FULL === "1" })
  writeFileSync("ci-plan.json", JSON.stringify(plan, null, 2) + "\n")
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `e2e=${plan.e2e}\nbuild=${plan.build}\n`)
  console.log(JSON.stringify(plan, null, 2))
}
