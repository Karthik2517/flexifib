import { describe, expect, it } from "vitest"
import { safeNext } from "@/lib/auth/config"

describe("auth return destinations", () => {
  it.each([null, "https://evil.test", "//evil.test", "/\\evil.test", "/\nevil.test", "/a/..//evil.test", "/auth/callback?code=again"])("rejects unsafe destination %s", (next) => {
    expect(safeNext(next)).toBe("/shop")
  })
  it.each(["/login", "/signup?next=/login", "/forgot-password", "/reset-password"])("avoids returning to an auth screen: %s", (next) => {
    expect(safeNext(next)).toBe("/shop")
  })
  it("preserves local product and account destinations", () => {
    expect(safeNext("/shop/launch-toothbrush-soft?variant=soft")).toBe("/shop/launch-toothbrush-soft?variant=soft")
    expect(safeNext("/account")).toBe("/account")
  })
})
