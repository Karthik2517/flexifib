import { expect, test } from "@playwright/test"

test.describe("cookie consent", { tag: "@consent" }, () => {
  test("banner offers equal accept/reject choices and remembers rejection", async ({ page }) => {
    const thirdParty: string[] = []
    page.on("request", (request) => {
      if (request.url().includes("googletagmanager.com")) thirdParty.push(request.url())
    })

    await page.goto("/")
    const banner = page.getByRole("region", { name: "Cookie consent" })
    await expect(banner).toBeVisible()
    await expect(banner.getByRole("button", { name: "Accept all" })).toBeVisible()
    await banner.getByRole("button", { name: "Reject optional" }).click()
    await expect(banner).toBeHidden()

    await page.reload()
    await expect(page.getByRole("region", { name: "Cookie consent" })).toBeHidden()
    const cookies = await page.context().cookies()
    expect(cookies.find((c) => c.name === "ff_consent")?.value).toContain("false")
    expect(thirdParty).toEqual([])
  })

  test("preferences can be managed and reopened from the footer", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Manage" }).click()
    const dialog = page.getByRole("dialog", { name: "Cookie preferences" })
    await expect(dialog).toBeVisible()
    await dialog.getByRole("switch", { name: /Analytics/ }).click()
    await dialog.getByRole("button", { name: "Save preferences" }).click()
    await expect(dialog).toBeHidden()

    const cookies = await page.context().cookies()
    expect(cookies.find((c) => c.name === "ff_consent")?.value).toContain("true")

    await page.getByRole("button", { name: "Cookie settings" }).click()
    await expect(page.getByRole("dialog", { name: "Cookie preferences" })).toBeVisible()
  })
})
