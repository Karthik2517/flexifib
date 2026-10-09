"use client"

/**
 * Thin, consent-aware wrapper around GA4. `gtag` only exists once the visitor
 * has accepted analytics cookies (see components/consent/analytics.tsx), so
 * every call here is a safe no-op until then.
 */

type GtagParams = Record<string, string | number | boolean | undefined | object[]>

declare global {
  interface Window {
    gtag?: (command: "event" | "config" | "consent" | "js", ...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function track(event: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", event, params)
}

export type AnalyticsItem = {
  item_id: string
  item_name: string
  item_variant?: string
  price: number
  quantity: number
}

export function trackAddToCart(item: AnalyticsItem) {
  track("add_to_cart", {
    currency: "GBP",
    value: item.price * item.quantity,
    items: [item],
  })
}

export function trackBeginCheckout(items: AnalyticsItem[], value: number) {
  track("begin_checkout", { currency: "GBP", value, items })
}

export function trackPurchase(transactionId: string, value: number) {
  track("purchase", { currency: "GBP", value, transaction_id: transactionId })
}

export function trackLead(form: string) {
  track("generate_lead", { form })
}
