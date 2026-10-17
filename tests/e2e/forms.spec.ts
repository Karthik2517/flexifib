import { expect, test } from "./fixtures"

test.describe("forms", () => {
  test("contact form shows inline errors and focuses the first invalid field", { tag: "@contact" }, async ({ consented: page }) => {
    await page.goto("/contact#message")
    await page.getByRole("button", { name: "Send message" }).click()
    await expect(page.getByLabel("Name", { exact: true })).toBeFocused()
    await expect(page.getByLabel("Name", { exact: true })).toHaveAttribute("aria-invalid", "true")
    await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("aria-invalid", "true")
  })

  test("business form pre-selects the programme from the URL", { tag: "@business" }, async ({ consented: page }) => {
    await page.goto("/business?interest=flexipack#enquiry")
    await expect(page.getByLabel("Product or programme of interest")).toHaveValue("flexipack")
  })

  test("newsletter rejects an invalid email", { tag: "@newsletter" }, async ({ consented: page }) => {
    await page.goto("/")
    await page.getByRole("heading", { name: "Follow the FlexiFib journey." }).scrollIntoViewIfNeeded()
    const email = page.getByLabel("Email address for FlexiFib journey updates")
    await email.fill("not-an-email")
    await page.getByRole("button", { name: "Join updates" }).click()
    await expect(email).toHaveAttribute("aria-invalid", "true")
  })
})
