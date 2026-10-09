import AxeBuilder from "@axe-core/playwright"
import { expect, routes, test } from "./fixtures"

test.describe("every public route", () => {
  for (const route of routes) {
    test(`${route} renders, is accessible and error-free`, async ({ consented: page }, testInfo) => {
      const errors: string[] = []
      page.on("pageerror", (error) => errors.push(error.message))
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text())
      })

      const response = await page.goto(route)
      expect(response?.status()).toBe(200)
      await expect(page.locator("h1")).toHaveCount(1)
      await expect(page).toHaveTitle(/FlexiFib/)
      expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy()

      // Fluid layout: nothing may cause horizontal scrolling at any viewport.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      )
      expect(overflow).toBeLessThanOrEqual(0)

      // Accessibility is checked once per route (desktop Chromium) to keep CI fast.
      if (testInfo.project.name === "chromium") {
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze()
        expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([])
      }

      expect(errors).toEqual([])
    })
  }

  test("unknown pages return a helpful 404", async ({ consented: page }) => {
    const response = await page.goto("/this-page-does-not-exist")
    expect(response?.status()).toBe(404)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/can’t find that page/)
    await expect(page.getByRole("link", { name: "Go to the homepage" })).toBeVisible()
  })

  test("page titles are unique", async ({ consented: page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium")
    const titles = new Set<string>()
    for (const route of routes) {
      await page.goto(route)
      titles.add(await page.title())
    }
    expect(titles.size).toBe(routes.length)
  })
})
