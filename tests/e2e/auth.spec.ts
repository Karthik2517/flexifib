import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "./fixtures"

test("guests must log in before adding products", async ({ consented: page }) => {
  await page.goto("/shop/launch-toothbrush-soft")
  await expect(page.getByRole("button", { name: "Add to basket", exact: true })).toHaveCount(0)
  await page.getByRole("link", { name: "Log in to add to basket" }).click()
  await expect(page).toHaveURL(/\/login\?next=%2Fshop%2Flaunch-toothbrush-soft$/)
  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible()
  await page.getByRole("link", { name: "Create an account", exact: true }).click()
  await expect(page).toHaveURL(/\/signup\?next=%2Fshop%2Flaunch-toothbrush-soft$/)
  await expect(page.getByRole("button", { name: "Sign up with Google" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Sign up with Apple" })).toBeVisible()
  await expect(page.locator("#main input")).toHaveCount(0)
})

test("the header basket prompts a guest to log in", async ({ consented: page }) => {
  await page.goto("/shop")
  await page.getByRole("button", { name: "Log in to view basket" }).click()
  await expect(page).toHaveURL(/\/login\?next=%2Fshop$/)
  await expect(page.getByRole("dialog", { name: "Your basket" })).toHaveCount(0)
})

test("account access redirects guests and old recovery pages return to social login", async ({ consented: page }) => {
  await page.goto("/account")
  await expect(page).toHaveURL(/\/login\?next=%2Faccount$/)
  for (const route of ["/reset-password", "/forgot-password"]) {
    await page.goto(route)
    await expect(page).toHaveURL(/\/login$/)
    await expect(page.getByRole("button", { name: "Log in with Google" })).toBeVisible()
    await expect(page.locator("#main input")).toHaveCount(0)
  }
})

test("invalid OAuth callbacks stay on the site", async ({ consented: page }) => {
  await page.goto("/auth/callback?next=https://evil.example")
  await expect(page).toHaveURL(/\/login\?error=oauth&next=%2Fshop$/)
  await expect(page.getByRole("main").getByRole("alert")).toContainText("Sign-in wasn’t completed")
})

test("social buttons remain readable in light and dark mode, including disabled states", async ({ consented: page }, testInfo) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme })
    for (const route of ["/login", "/signup"]) {
      await page.goto(route)
      const storyTitle = page.locator(".ff-auth-story-title")
      expect(await storyTitle.evaluate((element) => getComputedStyle(element).color)).toBe(
        await page.locator(".ff-auth-story-copy").evaluate((element) => getComputedStyle(element).color),
      )
      const action = route === "/signup" ? "Sign up with " : "Log in with "
      for (const provider of ["Google", "Apple"]) {
        const button = page.getByRole("button", { name: action + provider })
        await expect(button).toBeVisible()
        // Axe excludes disabled controls from contrast checks. Test their actual
        // painted colours too: missing auth configuration must not hide labels.
        const appearance = await button.evaluate((element) => {
          const style = getComputedStyle(element)
          function luminance(color: string) {
            const rgb = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map((n) => {
              const c = n / 255
              return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
            })
            return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
          }
          const foreground = luminance(style.color)
          const background = luminance(style.backgroundColor)
          return {
            contrast: (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05),
            opacity: style.opacity,
            background: style.backgroundColor,
            backgroundImage: style.backgroundImage,
          }
        })
        expect(appearance.contrast).toBeGreaterThanOrEqual(4.5)
        expect(appearance.opacity).toBe("1")
        expect(appearance.background).not.toBe("rgba(0, 0, 0, 0)")
        expect(appearance.backgroundImage).toBe("none")
      }
      const results = await new AxeBuilder({ page }).include("#main").analyze()
      expect(results.violations).toEqual([])
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      if (route === "/signup") {
        await page.getByRole("main").screenshot({ path: testInfo.outputPath("signup-" + colorScheme + ".png") })
      }
    }
  }
})

test("signup fits a narrow phone screen", async ({ consented: page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/signup")
  await expect(page.getByRole("button", { name: "Sign up with Google" })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
