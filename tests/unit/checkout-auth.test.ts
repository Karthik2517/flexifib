import { beforeEach, describe, expect, it, vi } from "vitest"
import { products } from "@/content/products"

const mocks = vi.hoisted(() => ({ getUser: vi.fn(), create: vi.fn(), getStripe: vi.fn() }))
vi.mock("@/lib/auth/server", () => ({ getAuthenticatedUser: mocks.getUser }))
vi.mock("@/lib/stripe", () => ({ getStripe: mocks.getStripe }))
vi.mock("next/headers", () => ({ headers: async () => new Headers({ origin: "http://localhost:3000" }) }))
import { startCheckout } from "@/app/actions/checkout"

describe("checkout authorization", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getStripe.mockReturnValue({ checkout: { sessions: { create: mocks.create } } })
  })
  it("rejects a direct checkout call without a verified account before touching Stripe", async () => {
    mocks.getUser.mockResolvedValue(null)
    const result = await startCheckout([{ slug: products[0].slug, quantity: 1 }])
    expect(result).toEqual({ ok: false, error: "Please log in with a verified account before checking out." })
    expect(mocks.getStripe).not.toHaveBeenCalled()
    expect(mocks.create).not.toHaveBeenCalled()
  })
  it("binds checkout to the server-verified identity, not client input", async () => {
    mocks.getUser.mockResolvedValue({ id: "verified-user", email: "customer@example.test" })
    mocks.create.mockResolvedValue({ url: "https://checkout.stripe.com/test" })
    const result = await startCheckout([{ slug: products[0].slug, quantity: 1, user_id: "forged" }])
    expect(result.ok).toBe(true)
    expect(mocks.create).toHaveBeenCalledWith(expect.objectContaining({ client_reference_id: "verified-user", customer_email: "customer@example.test", metadata: expect.objectContaining({ user_id: "verified-user" }) }))
  })
})
