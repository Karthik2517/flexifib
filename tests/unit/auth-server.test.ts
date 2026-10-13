import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({ getUser: vi.fn(), config: { value: { url: "https://auth.example.test", key: "public-key" } as { url: string; key: string } | null } }))
vi.mock("@/lib/auth/config", () => ({ getAuthConfig: () => mocks.config.value }))
vi.mock("@supabase/ssr", () => ({ createServerClient: () => ({ auth: { getUser: mocks.getUser } }) }))
vi.mock("next/headers", () => ({ cookies: async () => ({ getAll: () => [], set: vi.fn() }) }))
import { getAuthenticatedUser } from "@/lib/auth/server"

describe("server authentication", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.config.value = { url: "https://auth.example.test", key: "public-key" }
  })
  it.each([
    { id: "anonymous", is_anonymous: true, email_confirmed_at: "2026-01-01" },
    { id: "unverified", email_confirmed_at: null },
    null,
  ])("rejects an absent, anonymous or unverified user", async (user) => {
    mocks.getUser.mockResolvedValue({ data: { user }, error: null })
    expect(await getAuthenticatedUser()).toBeNull()
  })
  it("accepts only a user returned by the auth service", async () => {
    const user = { id: "confirmed", email_confirmed_at: "2026-01-01", is_anonymous: false }
    mocks.getUser.mockResolvedValue({ data: { user }, error: null })
    expect(await getAuthenticatedUser()).toEqual(user)
  })
  it("fails closed on an expired/invalid token or auth outage", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: null }, error: { message: "Invalid JWT" } })
    expect(await getAuthenticatedUser()).toBeNull()
    mocks.getUser.mockRejectedValue(new Error("Network unavailable"))
    expect(await getAuthenticatedUser()).toBeNull()
  })
  it("fails closed without configuration", async () => {
    mocks.config.value = null
    expect(await getAuthenticatedUser()).toBeNull()
    expect(mocks.getUser).not.toHaveBeenCalled()
  })
})
