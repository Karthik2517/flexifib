import AxeBuilder from "@axe-core/playwright"
import { expect, routes, test } from "./fixtures"

const affected: string[] | undefined = process.env.CI_AFFECTED_ROUTES
  ? JSON.parse(process.env.CI_AFFECTED_ROUTES)
  : undefined
const httpRoutes = (affected ?? routes).filter((route) => !["/login", "/signup", "/account", "/forgot-password", "/reset-password"].includes(route))
const browserRoutes = affected ?? ["/", "/shop/launch-toothbrush-soft", "/contact"]

// HTTP checks cover every content URL; browser checks cover distinct templates.
test("public routes return server-rendered content", { tag: "@routes" }, async ({ request }) => {
  for (const route of httpRoutes) {
    const response = await request.get(route)
    expect(response.status(), route).toBe(200)
    expect(await response.text(), route).toMatch(/<h1[\s>]/)
  }
})

for (const route of browserRoutes) {
  test(`${route} is usable and accessible`, { tag: `@route:${route}` }, async ({ consented: page }) => {
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    await page.goto(route)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    if (route === "/contact") {
      // Include the deferred form rather than auditing only its skeleton.
      await page.getByRole("heading", { name: "Send a message" }).scrollIntoViewIfNeeded()
      await expect(page.getByRole("button", { name: "Send message" })).toBeVisible()
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze()
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([])
    expect(errors).toEqual([])
  })
}

test("theme choice survives navigation and reload", { tag: "@theme" }, async ({ consented: page }) => {
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto("/")
  await page.getByRole("button", { name: "Switch to dark theme" }).click()
  await page.goto("/shop")
  await page.reload()
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible()
  await page.getByRole("button", { name: "Switch to light theme" }).click()
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible()
})

test("unknown pages offer a route back to the site", { tag: "@routing" }, async ({ consented: page }) => {
  const response = await page.goto("/this-page-does-not-exist")
  expect(response?.status()).toBe(404)
  await expect(page.getByRole("link", { name: "Go to the homepage" })).toBeVisible()
})
