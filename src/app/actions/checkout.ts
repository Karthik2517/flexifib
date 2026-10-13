"use server"

import { headers } from "next/headers"
import { site } from "@/content/site"
import { buildCheckoutSession, checkoutRequestSchema } from "@/lib/checkout"
import { getStripe } from "@/lib/stripe"
import { getAuthenticatedUser } from "@/lib/auth/server"

export type CheckoutResult = { ok: true; url: string } | { ok: false; error: string }

async function resolveOrigin() {
  // Production always returns to the canonical domain; previews/dev use the request origin.
  if (process.env.VERCEL_ENV === "production") return site.url
  const h = await headers()
  const origin = h.get("origin")
  if (origin) return origin
  const host = h.get("x-forwarded-host") ?? h.get("host")
  return host ? `${h.get("x-forwarded-proto") ?? "https"}://${host}` : site.url
}

export async function startCheckout(input: unknown): Promise<CheckoutResult> {
  const user = await getAuthenticatedUser()
  if (!user) {
    return { ok: false, error: "Please log in with a verified account before checking out." }
  }
  const parsed = checkoutRequestSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: "Your basket couldn’t be read. Please refresh and try again." }
  }

  const stripe = getStripe()
  if (!stripe) {
    console.error("[checkout] STRIPE_SECRET_KEY is not configured")
    return {
      ok: false,
      error: "Checkout is temporarily unavailable. Please try again shortly.",
    }
  }

  const session = buildCheckoutSession(parsed.data, await resolveOrigin())
  if (!session) {
    return {
      ok: false,
      error: "The items in your basket are no longer available.",
    }
  }

  try {
    const created = await stripe.checkout.sessions.create({
      ...session.params,
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: { ...session.params.metadata, user_id: user.id },
    })
    if (!created.url) throw new Error("Stripe returned no session URL")
    return { ok: true, url: created.url }
  } catch (error) {
    console.error("[checkout] Failed to create session", error)
    return {
      ok: false,
      error: "We couldn’t connect to secure checkout. Please try again.",
    }
  }
}
