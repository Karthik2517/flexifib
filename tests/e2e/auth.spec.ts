import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "./fixtures"

test("guests return to their product after choosing to log in or sign up", async ({ consented: page }) => {
  await page.goto("/shop/launch-toothbrush-soft")
  await expect(page.getByRole("button", { name: "Add to basket", exact: true })).toHaveCount(0)
  await page.getByRole("link", { name: "Log in to add to basket" }).click()
  await expect(page).toHaveURL(/\/login\?next=%2Fshop%2Flaunch-toothbrush-soft$/)
  await page.getByRole("link", { name: "Create an account", exact: true }).click()
  await expect(page).toHaveURL(/\/signup\?next=%2Fshop%2Flaunch-toothbrush-soft$/)
  await expect(page.getByRole("button", { name: "Sign up with Google" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Sign up with Apple" })).toBeVisible()
})

test("the header basket prompts a guest to log in", async ({ consented: page }) => {
  await page.goto("/shop")
  await page.getByRole("button", { name: "Log in to view basket" }).click()
  await expect(page).toHaveURL(/\/login\?next=%2Fshop$/)
  await expect(page.getByRole("dialog", { name: "Your basket" })).toHaveCount(0)
})

test("account access redirects guests to login", async ({ consented: page }) => {
  await page.goto("/account")
  await expect(page).toHaveURL(/\/login\?next=%2Faccount$/)
  await expect(page.getByRole("button", { name: "Log in with Google" })).toBeVisible()
})

test("invalid OAuth callbacks stay on the site", async ({ consented: page }) => {
  await page.goto("/auth/callback?next=https://evil.example")
  await expect(page).toHaveURL(/\/login\?error=oauth&next=%2Fshop$/)
  await expect(page.getByRole("main").getByRole("alert")).toBeVisible()
})

test("account controls are accessible in both themes", async ({ consented: page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Shared account template checked once")
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme })
    await page.goto("/signup")
    const results = await new AxeBuilder({ page }).include("#main").analyze()
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([])
  }
})

test("signup controls remain reachable on a narrow phone", async ({ consented: page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/signup")
  await expect(page.getByRole("button", { name: "Sign up with Google" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Sign up with Apple" })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
