// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest"
import { shipping } from "@/content/products"
import { selectCount, useCart } from "@/lib/cart-store"

describe("cart store", () => {
  beforeEach(() => useCart.setState({ lines: [], isOpen: false, ownerId: "customer-a" }))

  it("does not let a signed-out visitor add or open a basket", () => {
    useCart.getState().setOwner(null)
    useCart.getState().add("a", 2)
    useCart.getState().open()
    expect(useCart.getState().lines).toEqual([])
    expect(useCart.getState().isOpen).toBe(false)
  })

  it("clears the basket on sign out and account switch, but keeps it on token refresh", () => {
    useCart.getState().add("a", 2)
    useCart.getState().setOwner("customer-a")
    expect(useCart.getState().lines).toHaveLength(1)
    useCart.getState().setOwner("customer-b")
    expect(useCart.getState().lines).toEqual([])
    useCart.getState().add("b")
    useCart.getState().open()
    useCart.getState().setOwner(null)
    expect(useCart.getState().lines).toEqual([])
    expect(useCart.getState().isOpen).toBe(false)
  })

  it("adds and merges items", () => {
    useCart.getState().add("a", 2)
    useCart.getState().add("a", 1)
    useCart.getState().add("b")
    expect(useCart.getState().lines).toEqual([
      { slug: "a", quantity: 3 },
      { slug: "b", quantity: 1 },
    ])
    expect(selectCount(useCart.getState())).toBe(4)
  })

  it("never exceeds the per-line maximum", () => {
    useCart.getState().add("a", 50)
    expect(useCart.getState().lines[0].quantity).toBe(shipping.maxQuantityPerLine)
  })

  it("removes a line when quantity drops to zero", () => {
    useCart.getState().add("a", 1)
    useCart.getState().setQuantity("a", 0)
    expect(useCart.getState().lines).toEqual([])
  })

  it("persists lines but not UI state", () => {
    useCart.getState().add("a", 1)
    useCart.getState().open()
    const stored = JSON.parse(window.localStorage.getItem("flexifib-basket") ?? "{}")
    expect(stored.state).toEqual({ ownerId: "customer-a", lines: [{ slug: "a", quantity: 1 }] })
  })
})
