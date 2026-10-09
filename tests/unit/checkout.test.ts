import { describe, expect, it } from "vitest"
import { products, shipping } from "@/content/products"
import { buildCheckoutSession, checkoutRequestSchema } from "@/lib/checkout"

const product = products[0]

describe("checkoutRequestSchema", () => {
  it("rejects client-supplied prices and bad quantities", () => {
    expect(checkoutRequestSchema.safeParse([]).success).toBe(false)
    expect(checkoutRequestSchema.safeParse([{ slug: product.slug, quantity: 0 }]).success).toBe(false)
    expect(checkoutRequestSchema.safeParse([{ slug: product.slug, quantity: 1.5 }]).success).toBe(false)
    const parsed = checkoutRequestSchema.parse([{ slug: product.slug, quantity: 1, price: 1 }])
    expect(parsed[0]).not.toHaveProperty("price")
  })
})

describe("buildCheckoutSession", () => {
  it("uses catalogue prices and the shared shipping rule", () => {
    const session = buildCheckoutSession([{ slug: product.slug, quantity: 2 }], "https://example.test")
    expect(session).not.toBeNull()
    const item = session!.params.line_items[0]
    expect(item.price_data.unit_amount).toBe(product.price)
    expect(item.quantity).toBe(2)
    const rate = session!.params.shipping_options[0].shipping_rate_data
    const expected = product.price * 2 >= shipping.freeThreshold ? 0 : shipping.standardRate
    expect(rate.fixed_amount.amount).toBe(expected)
    expect(session!.params.success_url).toBe(
      "https://example.test/checkout/success?session_id={CHECKOUT_SESSION_ID}"
    )
  })

  it("returns null when nothing purchasable remains", () => {
    expect(buildCheckoutSession([{ slug: "gone", quantity: 1 }], "https://example.test")).toBeNull()
  })
})
