import { expect, test } from "./fixtures"

test.describe("forms", () => {
  test("contact form shows inline errors and focuses the first invalid field", async ({ consented: page }) => {
    await page.goto("/contact")
    await page.getByRole("button", { name: "Send message" }).click()
    await expect(page.getByLabel("Name", { exact: true })).toBeFocused()
    await expect(page.getByText("Please enter your name.")).toBeVisible()
    await expect(page.getByText("Please enter your email address.")).toBeVisible()
    await expect(page.getByLabel("Name", { exact: true })).toHaveAttribute("aria-invalid", "true")
  })

  test("business form pre-selects the programme from the URL", async ({ consented: page }) => {
    await page.goto("/business?interest=flexipack#enquiry")
    await expect(page.getByLabel("Product or programme of interest")).toHaveValue("flexipack")
  })

  test("newsletter rejects an invalid email", async ({ consented: page }) => {
    await page.goto("/")
    const email = page.getByLabel("Email address for FlexiFib journey updates")
    await email.fill("not-an-email")
    await page.getByRole("button", { name: "Join updates" }).click()
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible()
  })

  test("a complete contact message gets a clear outcome", async ({ consented: page }) => {
    await page.goto("/contact")
    await page.getByLabel("Name", { exact: true }).fill("Test Person")
    await page.getByLabel("Email", { exact: true }).fill("test@example.com")
    await page.getByLabel("What is your message about?").selectOption("general")
    await page.getByLabel("Subject", { exact: true }).fill("Hello there")
    await page.getByLabel("Message", { exact: true }).fill("This is an automated end-to-end test message.")
    await page.waitForTimeout(2600) // anti-spam minimum fill time
    await page.getByRole("button", { name: "Send message" }).click()
    // Without RESEND_API_KEY a production build reports a friendly failure; with it, success.
    await expect(
      page.getByRole("status").or(page.getByRole("alert").filter({ hasText: /couldn’t send/ }))
    ).toBeVisible()
  })
})
