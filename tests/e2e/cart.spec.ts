import { expect, test, loginTestCustomer } from "./fixtures"

test.describe("basket", () => {
  test.beforeEach(async ({ consented: page }) => { await loginTestCustomer(page) })
  test("add, adjust, persist and price a basket", async ({ consented: page }) => {
    await page.goto("/shop")
    await page.getByRole("link", { name: /View product: Launch Toothbrush — Soft/ }).click()
    await expect(page).toHaveURL(/\/shop\/launch-toothbrush-soft$/)

    await page.getByRole("button", { name: "Increase quantity" }).click()
    await page.getByRole("button", { name: /Add to basket/ }).click()

    const drawer = page.getByRole("dialog", { name: "Your basket" })
    await expect(drawer).toBeVisible()
    await expect(drawer.getByText("2 items")).toBeVisible()
    await expect(drawer.getByText("£10.00").first()).toBeVisible()
    await expect(drawer.getByText(/Add £10\.00 more for free UK delivery/)).toBeVisible()

    // Two more → £20 → free delivery
    await drawer.getByRole("button", { name: "Increase quantity" }).click()
    await drawer.getByRole("button", { name: "Increase quantity" }).click()
    await expect(drawer.getByText(/unlocked/)).toBeVisible()
    await expect(drawer.getByText("Free", { exact: true })).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(page.getByRole("button", { name: "Open basket, 4 items" })).toBeVisible()

    // Survives a reload
    await page.reload()
    await page.getByRole("button", { name: "Open basket, 4 items" }).click()
    await expect(page.getByRole("dialog", { name: "Your basket" }).getByText("4 items")).toBeVisible()
  })

  test("removing the last item shows the empty state", async ({ consented: page }) => {
    await page.goto("/shop/launch-toothbrush-medium")
    await page.getByRole("button", { name: /Add to basket/ }).click()
    const drawer = page.getByRole("dialog", { name: "Your basket" })
    await drawer.getByRole("button", { name: /Remove Launch Toothbrush — Medium/ }).click()
    await expect(drawer.getByRole("heading", { name: "Your basket is empty" })).toBeVisible()
  })

  test("checkout fails gracefully when payments are unavailable", async ({ consented: page }) => {
    test.skip(!!process.env.STRIPE_SECRET_KEY, "Only meaningful without a Stripe key")
    await page.goto("/shop/launch-toothbrush-soft")
    await page.getByRole("button", { name: /Add to basket/ }).click()
    await page.getByRole("button", { name: "Checkout securely" }).click()
    await expect(page.getByRole("alert")).toContainText(/temporarily unavailable/)
    await expect(page).toHaveURL(/\/shop\/launch-toothbrush-soft$/)
  })

  test("an unverified success URL never clears the basket", async ({ consented: page }) => {
    await page.goto("/shop/launch-toothbrush-soft")
    await page.getByRole("button", { name: /Add to basket/ }).click()
    await page.goto("/checkout/success?session_id=cs_test_fake")
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/couldn’t confirm/)
    await expect(page.getByRole("button", { name: "Open basket, 1 item" })).toBeAttached()
  })
})
