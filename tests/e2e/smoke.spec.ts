import AxeBuilder from "@axe-core/playwright"
import { expect, routes, test } from "./fixtures"

test.describe("every public route", () => {
  test("scroll reveals initialise after hydration without console errors", async ({ consented: page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Checked once in desktop Chromium")
    await page.emulateMedia({ reducedMotion: "no-preference" })
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text())
    })

    await page.goto("/")
    const pending = page.locator('[data-reveal-state="pending"]').first()
    await expect(pending).toBeAttached()
    await pending.evaluate((element) => element.setAttribute("data-test-reveal-target", ""))
    const target = page.locator("[data-test-reveal-target]")
    await target.scrollIntoViewIfNeeded()
    await expect(target).toHaveAttribute("data-reveal-state", "in")
    expect(errors).toEqual([])
  })

  test("theme choice applies site-wide and persists", async ({ consented: page }, testInfo) => {
    test.skip(
      !["chromium", "mobile-chrome"].includes(testInfo.project.name),
      "Checked once on desktop and mobile Chromium",
    )
    await page.emulateMedia({ colorScheme: "light" })
    await page.goto("/")

    await page.getByRole("button", { name: "Switch to dark theme" }).click()
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")
    expect(await page.evaluate(() => localStorage.getItem("ff_theme"))).toBe("dark")
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("dark")

    await page.goto("/shop")
    await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible()
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")

    await page.reload()
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")
    await page.getByRole("button", { name: "Switch to light theme" }).click()
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light")
    expect(await page.evaluate(() => localStorage.getItem("ff_theme"))).toBe("light")
    // Chromium normalizes the authored `only light` value to `light only` in CSSOM.
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("light only")
    await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute("content", "only light")
  })

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

  test("dark theme keeps every route accessible", async ({ consented: page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Checked once on desktop Chromium")
    test.setTimeout(120_000)
    await page.emulateMedia({ colorScheme: "dark" })
    for (const route of routes) {
      await page.goto(route)
      const results = await new AxeBuilder({ page }).withTags(["wcag2aa", "wcag21aa"]).analyze()
      expect(
        results.violations.map((v) => `${route} ${v.id}: ${v.help} (${v.nodes.length})`)
      ).toEqual([])
    }
  })

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
