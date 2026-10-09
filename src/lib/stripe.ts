import "server-only"
import Stripe from "stripe"

let client: Stripe | null = null

/** Lazily created so a missing key fails one request, not the whole build. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) return null
  client ??= new Stripe(key, { appInfo: { name: "FlexiFib storefront" } })
  return client
}
