import { expect, test } from "./fixtures"

test.describe("catalogue navigation", () => {
  test("shop links open the selected product", async ({ consented: page }) => {
    await page.goto("/shop")
    await page.getByRole("link", { name: /View product: Launch Toothbrush — Medium/ }).click()
    await expect(page).toHaveURL(/\/shop\/launch-toothbrush-medium$/)
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Medium")
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
