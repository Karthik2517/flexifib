import { expect, test } from "./fixtures"

// Visual regression on the most important templates. Baselines are
// platform-specific: generate them in CI (Linux) with `npm run test:visual:update`.
const pages = ["/", "/shop", "/shop/launch-toothbrush-soft", "/products/ecobrush", "/contact"]

test.describe("visual regression", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "Chromium baselines only")

  for (const route of pages) {
    test(`${route}`, async ({ consented: page }) => {
      await page.goto(route)
      await page.evaluate(() => document.fonts.ready)
      await expect(page).toHaveScreenshot({ fullPage: true })
    })
  }
})
