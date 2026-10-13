import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const mocks = vi.hoisted(() => ({ exchange: vi.fn() }))
vi.mock("@/lib/auth/server", () => ({ getServerAuthClient: async () => ({ auth: { exchangeCodeForSession: mocks.exchange } }) }))
import { GET } from "@/app/auth/callback/route"

describe("OAuth callback", () => {
  beforeEach(() => vi.clearAllMocks())

  it("exchanges the code before returning to the original product", async () => {
    mocks.exchange.mockResolvedValue({ error: null })
    const response = await GET(new NextRequest("https://flexifib.test/auth/callback?code=test-code&next=%2Fshop%2Fitem"))
    expect(mocks.exchange).toHaveBeenCalledWith("test-code")
    expect(response.headers.get("location")).toBe("https://flexifib.test/shop/item")
    expect(response.headers.get("cache-control")).toBe("private, no-store")
  })

  it("rejects cancelled consent without exchanging a code or reflecting provider error text", async () => {
    const response = await GET(new NextRequest("https://flexifib.test/auth/callback?error=access_denied&error_description=untrusted&code=bad&next=%2Fshop%2Fitem"))
    expect(mocks.exchange).not.toHaveBeenCalled()
    expect(response.headers.get("location")).toBe("https://flexifib.test/login?error=oauth&next=%2Fshop%2Fitem")
  })

  it("returns to login when the code exchange fails", async () => {
    mocks.exchange.mockResolvedValue({ error: { message: "Expired code" } })
    const response = await GET(new NextRequest("https://flexifib.test/auth/callback?code=expired"))
    expect(response.headers.get("location")).toBe("https://flexifib.test/login?error=oauth&next=%2Fshop")
  })

  it("never redirects to an external return URL after a successful exchange", async () => {
    mocks.exchange.mockResolvedValue({ error: null })
    const response = await GET(new NextRequest("https://flexifib.test/auth/callback?code=ok&next=%2F%2Fevil.example"))
    expect(response.headers.get("location")).toBe("https://flexifib.test/shop")
  })
})
