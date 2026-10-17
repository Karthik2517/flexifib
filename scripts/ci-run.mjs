import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"

const plan = JSON.parse(readFileSync("ci-plan.json", "utf8"))
function run(command, args, env = {}) {
  console.log(`Running: ${command} ${args.join(" ")}`)
  const result = spawnSync(command, args, { stdio: "inherit", env: { ...process.env, ...env }, shell: false })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

switch (process.argv[2]) {
  case "quality":
    if (plan.changed.some((file) => file.startsWith("scripts/ci-")) || plan.fullBrowsers) run("npm", ["run", "test:ci"])
    if (plan.lint.length) run("node", ["node_modules/eslint/bin/eslint.js", "--no-warn-ignored", ...plan.lint])
    if (plan.typecheck) run("npm", ["run", "typecheck"])
    if (plan.unit !== "none") run("node", ["node_modules/vitest/vitest.mjs", "run", ...(plan.unit === "changed" ? ["--changed", plan.base, "--passWithNoTests"] : [])])
    if (!plan.lint.length && !plan.typecheck && plan.unit === "none") console.log("No code checks needed for this diff.")
    break
  case "build":
    if (plan.build) run("npm", ["run", "build"])
    else console.log("No production build needed for this diff.")
    break
  case "e2e":
    if (!plan.e2e) { console.log("No browser checks needed for this diff."); break }
    run("node", ["node_modules/@playwright/test/cli.js", "test", ...(plan.grep ? ["--grep", plan.grep] : []), ...process.argv.slice(3)], {
      E2E_SKIP_BUILD: "1",
      E2E_FULL: plan.fullBrowsers ? "1" : "0",
      ...(plan.routes?.length ? { CI_AFFECTED_ROUTES: JSON.stringify(plan.routes) } : {}),
    })
    break
  default:
    throw new Error("Usage: node scripts/ci-run.mjs quality|build|e2e [Playwright options]")
}
