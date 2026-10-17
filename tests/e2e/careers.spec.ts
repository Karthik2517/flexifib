import { expect, test } from "./fixtures"

test("application form focuses invalid fields and rejects an unsupported CV", { tag: "@careers" }, async ({ consented: page }) => {
  await page.goto("/careers#apply")
  await page.getByRole("button", { name: "Submit interest" }).click()
  await expect(page.getByLabel("Full name")).toBeFocused()
  await expect(page.getByLabel(/I have read the/)).toHaveAttribute("aria-invalid", "true")
  await page.getByLabel(/Upload CV/).setInputFiles({
    name: "cv.png",
    mimeType: "image/png",
    buffer: Buffer.from("not a cv"),
  })
  await page.getByRole("button", { name: "Submit interest" }).click()
  await expect(page.getByLabel(/Upload CV/)).toHaveAttribute("aria-invalid", "true")
})
