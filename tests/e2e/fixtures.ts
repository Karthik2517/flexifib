import { test as base, expect, type Page } from "@playwright/test"
import { readFile } from "node:fs/promises"

export const routes = [
  "/",
  "/shop",
  "/shop/launch-toothbrush-soft",
  "/products",
  "/products/ecobrush",
  "/products/hempsoft",
  "/products/flexipack",
  "/innovation",
  "/sustainability",
  "/our-story",
  "/business",
  "/insights",
  "/careers",
  "/contact",
  "/help",
  "/help/shipping",
  "/help/returns",
  "/help/faq",
  "/help/product-safety",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/terms",
  "/legal/accessibility",
  "/legal/recruitment-privacy",
  "/legal/company",
]

/** Pre-set a consent choice so the banner doesn't cover content. */
export async function setConsent(page: Page, analytics = false) {
  await page.context().addCookies([
    {
      name: "ff_consent",
      value: encodeURIComponent(JSON.stringify({ v: 1, analytics })),
      url: "http://localhost:3100",
    },
  ])
}

export async function loginTestCustomer(page: Page) {
  const statePath = process.env.E2E_AUTH_STORAGE_STATE
  base.skip(!statePath, "Requires saved Google/Apple test-customer session cookies")
  const state = JSON.parse(await readFile(statePath!, "utf8"))
  await page.context().addCookies(state.cookies)
  await page.goto("/account")
  await expect(page.getByRole("heading", { name: "Your account" })).toBeVisible()
}

export const test = base.extend<{ consented: Page }>({
  consented: async ({ page }, provide) => {
    await setConsent(page)
    await provide(page)
  },
})

export { expect }
