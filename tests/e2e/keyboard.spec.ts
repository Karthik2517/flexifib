import { expect, test, loginTestCustomer } from "./fixtures"

test.describe("keyboard", () => {
  test("skip link moves focus to main content", { tag: "@navigation" }, async ({ consented: page, browserName }) => {
    test.skip(browserName === "webkit", "Safari doesn't Tab to links by default")
    await page.goto("/")
    await page.keyboard.press("Tab")
    const skip = page.getByRole("link", { name: "Skip to content" })
    await expect(skip).toBeFocused()
    await page.keyboard.press("Enter")
    await expect(page).toHaveURL(/#main$/)
  })

  test("basket drawer traps focus, closes on Escape and restores focus", { tag: "@cart" }, async ({ consented: page }) => {
    await loginTestCustomer(page)
    await page.goto("/shop/launch-toothbrush-soft")
    const add = page.getByRole("button", { name: /Add to basket/ })
    await add.click()
    const drawer = page.getByRole("dialog", { name: "Your basket" })
    await expect(drawer).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(drawer).toBeHidden()
    const open = page.getByRole("button", { name: /Open basket/ })
    await open.focus()
    await page.keyboard.press("Enter")
    await expect(drawer).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(open).toBeFocused()
  })

  test("mobile menu opens, navigates and closes", { tag: "@navigation" }, async ({ consented: page, isMobile }) => {
    test.skip(!isMobile, "Mobile only")
    await page.goto("/")
    await page.getByRole("button", { name: "Open menu" }).click()
    const menu = page.getByRole("dialog")
    await menu.getByRole("link", { name: "Sustainability" }).click()
    await expect(page).toHaveURL(/\/sustainability$/)
    await expect(menu).toBeHidden()
    await expect(page.getByRole("heading", { level: 1 })).toContainText("sustainable future")
  })
})
