import { z } from "zod"
import { productTitle, shipping } from "@/content/products"
import { priceLines, shippingFor, subtotalOf, type CartLine } from "./pricing"

export const checkoutRequestSchema = z
  .array(
    z.object({
      slug: z.string().min(1).max(100),
      quantity: z.number().int().min(1).max(shipping.maxQuantityPerLine),
    })
  )
  .min(1)
  .max(20)

/**
 * Build Stripe Checkout parameters from catalogue prices only.
 * Kept free of Stripe/network calls so it can be unit-tested directly.
 */
export function buildCheckoutSession(lines: CartLine[], origin: string) {
  const priced = priceLines(lines)
  if (priced.length === 0) return null

  const subtotal = subtotalOf(priced)
  const shippingCost = shippingFor(subtotal)

  return {
    subtotal,
    params: {
      mode: "payment" as const,
      line_items: priced.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: shipping.currency,
          unit_amount: product.price,
          product_data: {
            name: productTitle(product),
            description: product.summary,
            metadata: { slug: product.slug },
          },
        },
      })),
      shipping_address_collection: {
        allowed_countries: [...shipping.countries],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount" as const,
            display_name: shippingCost === 0 ? "Free UK delivery" : "Standard UK delivery",
            fixed_amount: { amount: shippingCost, currency: shipping.currency },
            delivery_estimate: {
              minimum: { unit: "business_day" as const, value: shipping.minDays },
              maximum: { unit: "business_day" as const, value: shipping.maxDays },
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop?checkout=cancelled`,
      metadata: {
        source: "flexifib-web",
        lines: priced.map((line) => `${line.product.slug}x${line.quantity}`).join(",").slice(0, 500),
      },
    },
  }
}
