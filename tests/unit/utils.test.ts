import { describe, expect, it } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("keeps custom font sizes alongside text colours", () => {
    expect(cn("text-title", "text-text-inverse")).toBe("text-title text-text-inverse")
  })
  it("still resolves conflicts within the custom scale", () => {
    expect(cn("text-heading", "text-subheading")).toBe("text-subheading")
  })
})
