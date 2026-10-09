import { test as base, expect, type Page } from "@playwright/test"

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

export const test = base.extend<{ consented: Page }>({
  consented: async ({ page }, provide) => {
    await setConsent(page)
    await provide(page)
  },
})

export { expect }
