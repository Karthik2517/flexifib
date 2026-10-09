import { expect, test } from "./fixtures"

test.describe("careers", () => {
  test("states honestly that there are no live vacancies", async ({ consented: page }) => {
    await page.goto("/careers")
    await expect(page.getByRole("heading", { name: "No live vacancies at present." })).toBeVisible()
    await page.getByRole("link", { name: "View opportunities" }).click()
    await expect(page).toHaveURL(/#opportunities$/)
  })

  test("open application validates fields, privacy consent and CV type", async ({ consented: page }) => {
    await page.goto("/careers#apply")
    await page.getByRole("button", { name: "Submit interest" }).click()
    await expect(page.getByLabel("Full name")).toBeFocused()
    await expect(page.getByText("Please confirm you have read the recruitment privacy notice.")).toBeVisible()

    await page.getByLabel(/Upload CV/).setInputFiles({
      name: "cv.png",
      mimeType: "image/png",
      buffer: Buffer.from("not a cv"),
    })
    await page.getByRole("button", { name: "Submit interest" }).click()
    await expect(page.getByText("Please upload your CV as a PDF or Word document.")).toBeVisible()
  })

  test("a complete application gets a clear outcome", async ({ consented: page }) => {
    await page.goto("/careers#apply")
    await page.getByLabel("Full name").fill("Test Applicant")
    await page.getByLabel("Email address").fill("applicant@example.com")
    await page.getByLabel("Current location").fill("Edinburgh, UK")
    await page.getByLabel("Area of interest").selectOption("materials-rd")
    await page
      .getByLabel("Tell us how you could contribute")
      .fill("Automated test: experience in natural-fibre composites and validation testing.")
    await page.getByLabel(/Upload CV/).setInputFiles({
      name: "cv.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4 test"),
    })
    await page.getByLabel(/I have read the/).check()
    await page.waitForTimeout(2600) // anti-spam minimum fill time
    await page.getByRole("button", { name: "Submit interest" }).click()
    // Without RESEND_API_KEY a production build reports a friendly failure; with it, success.
    await expect(
      page.getByRole("status").or(page.getByRole("alert").filter({ hasText: /couldn’t send/ }))
    ).toBeVisible()
  })
})
