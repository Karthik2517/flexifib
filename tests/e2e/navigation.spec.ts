import { instant } from "@next/playwright"
import { expect, test } from "./fixtures"

test.describe("instant navigation", () => {
  test("shop → product renders immediately from the prefetched shell", async ({ consented: page }) => {
    await page.goto("/shop")
    await instant(page, async () => {
      await page.getByRole("link", { name: /View product: Launch Toothbrush — Medium/ }).click()
      await page.waitForURL((url) => url.pathname === "/shop/launch-toothbrush-medium")
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Launch Toothbrush")
    })
  })

  test("back button restores the previous page and its sort state", async ({ consented: page }) => {
    await page.goto("/shop")
    await page.getByLabel("Sort").selectOption("price-desc")
    await expect(page).toHaveURL(/sort=price-desc/)
    await page.getByRole("link", { name: /View product: Launch Toothbrush — Soft/ }).click()
    await expect(page).toHaveURL(/launch-toothbrush-soft/)
    await page.goBack()
    await expect(page).toHaveURL(/sort=price-desc/)
    await expect(page.getByLabel("Sort")).toHaveValue("price-desc")
  })
})
