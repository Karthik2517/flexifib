import { describe, expect, it } from "vitest"
import { products, shipping } from "@/content/products"
import { amountToFreeShipping, clampQuantity, priceLines, shippingFor, subtotalOf } from "@/lib/pricing"

const [first, second] = products

describe("priceLines", () => {
  it("prices lines from the catalogue, not from the caller", () => {
    const priced = priceLines([{ slug: first.slug, quantity: 3 }])
    expect(priced).toHaveLength(1)
    expect(priced[0].lineTotal).toBe(first.price * 3)
  })

  it("drops unknown products", () => {
    expect(priceLines([{ slug: "does-not-exist", quantity: 1 }])).toEqual([])
  })

  it("merges duplicate lines and clamps quantity", () => {
    const priced = priceLines([
      { slug: first.slug, quantity: 8 },
      { slug: first.slug, quantity: 8 },
    ])
    expect(priced).toHaveLength(1)
    expect(priced[0].quantity).toBe(shipping.maxQuantityPerLine)
  })

  it("sums a subtotal across lines", () => {
    const priced = priceLines([
      { slug: first.slug, quantity: 1 },
      { slug: second.slug, quantity: 2 },
    ])
    expect(subtotalOf(priced)).toBe(first.price + second.price * 2)
  })
})

describe("shipping", () => {
  it("charges the standard rate below the threshold", () => {
    expect(shippingFor(shipping.freeThreshold - 1)).toBe(shipping.standardRate)
  })
  it("is free at and above the threshold", () => {
    expect(shippingFor(shipping.freeThreshold)).toBe(0)
  })
  it("is zero for an empty basket", () => {
    expect(shippingFor(0)).toBe(0)
  })
  it("reports the amount left to free delivery", () => {
    expect(amountToFreeShipping(500)).toBe(shipping.freeThreshold - 500)
    expect(amountToFreeShipping(shipping.freeThreshold + 1)).toBe(0)
  })
})

describe("clampQuantity", () => {
  it.each([
    [0, 1],
    [-4, 1],
    [2.7, 2],
    [999, shipping.maxQuantityPerLine],
    [Number.NaN, 1],
  ])("clamps %s to %s", (input, expected) => {
    expect(clampQuantity(input)).toBe(expected)
  })
})
