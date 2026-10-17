import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { test } from "node:test"
import { createPlan, readDiff, sourceGraph } from "./ci-plan.mjs"

const graph = sourceGraph()
const plan = (changed, options = {}) => createPlan(changed, { graph, base: "HEAD~1", ...options })

test("documentation changes skip lint, types, unit tests, build and browsers", () => {
  const p = plan(["README.md", "src/assets/images/CREDITS.md"])
  assert.deepEqual(p.lint, [])
  assert.equal(p.typecheck, false)
  assert.equal(p.unit, "none")
  assert.equal(p.build, false)
  assert.equal(p.e2e, false)
})

test("a contact-page change selects that page and its form only", () => {
  const p = plan(["src/app/contact/page.tsx"])
  assert.deepEqual(p.routes, ["/contact"])
  assert.equal(p.unit, "changed")
  assert.deepEqual(p.lint, ["src/app/contact/page.tsx"])
  const filter = new RegExp(p.grep)
  assert.equal(filter.test("forms contact @contact"), true)
  assert.equal(filter.test("smoke /contact @route:/contact"), true)
  assert.equal(filter.test("forms business @business"), false)
  assert.equal(filter.test("forms newsletter @newsletter"), false)
})

test("dynamic imports propagate form changes to their page", () => {
  const p = plan(["src/components/forms/contact-form.tsx"])
  assert.deepEqual(p.routes, ["/contact"])
  assert.equal(new RegExp(p.grep).test("forms contact @contact"), true)
})

test("shared form changes include all importing pages", () => {
  const p = plan(["src/components/forms/fields.tsx"])
  // Account uses FormAlert from the same module; all consumers matter.
  assert.ok(p.e2e)
  for (const route of ["/contact", "/business", "/careers", "/login", "/signup"]) {
    assert.ok(p.routes === null || p.routes.includes(route), route)
  }
})

test("a shared header change widens browser checks through the root layout", () => {
  const p = plan(["src/components/layout/site-header.tsx"])
  assert.equal(p.e2e, true)
  assert.equal(p.grep, null)
  assert.equal(p.routes, null)
})

test("nested account layouts select the account route group", () => {
  const p = plan(["src/app/(auth)/layout.tsx"])
  assert.ok(p.routes.includes("/login"))
  assert.ok(p.routes.includes("/account"))
  assert.equal(p.routes.includes("/contact"), false)
})

test("dependency changes run all checks but only default browsers", () => {
  const p = plan(["package-lock.json"])
  assert.equal(p.unit, "all")
  assert.equal(p.build, true)
  assert.equal(p.e2e, true)
  assert.equal(p.grep, null)
  assert.equal(p.fullBrowsers, false)
})

test("unit-test edits do not rebuild or run browsers", () => {
  const p = plan(["tests/unit/pricing.test.ts"])
  assert.equal(p.unit, "changed")
  assert.equal(p.e2e, false)
  assert.equal(p.build, false)
})

test("a browser-spec edit selects that spec", () => {
  const p = plan(["tests/e2e/forms.spec.ts"])
  assert.equal(p.unit, "none")
  assert.equal(p.e2e, true)
  assert.equal(new RegExp(p.grep).test("forms.spec.ts › validation"), true)
  assert.equal(new RegExp(p.grep).test("auth.spec.ts › login"), false)
})

test("source deletion widens checks instead of dropping coverage", () => {
  const p = plan(["src/components/removed-component.tsx"])
  assert.equal(p.unit, "all")
  assert.equal(p.e2e, true)
  assert.equal(p.grep, null)
})

test("a missing comparison commit falls back to all checks", () => {
  const diff = readDiff({ base: "0000000000000000000000000000000000000000" })
  const p = createPlan(diff.changed, diff)
  assert.equal(p.unit, "all")
  assert.equal(p.build, true)
  assert.equal(p.e2e, true)
  assert.equal(p.fullBrowsers, false)
})

test("explicit full compatibility runs opt in to the extra browsers", () => {
  const p = plan([], { full: true, fullBrowsers: true })
  assert.equal(p.unit, "all")
  assert.equal(p.e2e, true)
  assert.equal(p.fullBrowsers, true)
})

test("Git comparison covers multi-commit pushes, PR merge bases and renames/deletions", () => {
  const root = mkdtempSync(path.join(tmpdir(), "flexifib-ci-plan-"))
  const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
  const commit = (name) => { git("add", "-A"); git("commit", "-m", name); return git("rev-parse", "HEAD") }
  try {
    git("init", "-b", "main")
    git("config", "user.name", "CI selector test")
    git("config", "user.email", "ci@example.test")
    writeFileSync(path.join(root, "README.md"), "initial")
    const base = commit("initial")
    git("checkout", "-b", "feature")
    writeFileSync(path.join(root, "first.ts"), "export const first = 1")
    commit("first feature change")
    writeFileSync(path.join(root, "second.ts"), "export const second = 2")
    const feature = commit("second feature change")
    assert.deepEqual(readDiff({ root, base }).changed, ["first.ts", "second.ts"])

    git("checkout", "main")
    writeFileSync(path.join(root, "target-only.ts"), "export const target = 1")
    const target = commit("unrelated base branch change")
    git("checkout", "feature")
    assert.deepEqual(readDiff({ root, base: target, mergeBase: true }).changed, ["first.ts", "second.ts"])

    git("mv", "first.ts", "renamed.ts")
    git("rm", "second.ts")
    commit("rename and delete")
    assert.deepEqual(readDiff({ root, base: feature }).changed, ["first.ts", "renamed.ts", "second.ts"])
    assert.equal(readDiff({ root, base: "missing-ref" }).full, true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
