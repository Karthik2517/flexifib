import { describe, expect, it } from "vitest"
import { z } from "zod/mini"
import { businessSchema, contactSchema, interestSchema, newsletterSchema } from "@/lib/forms"

describe("form schemas", () => {
  it("requires a valid email", () => {
    expect(newsletterSchema.safeParse({ email: "nope" }).success).toBe(false)
    expect(newsletterSchema.safeParse({ email: " a@b.co " }).success).toBe(true)
  })

  it("validates contact messages", () => {
    const result = contactSchema.safeParse({ name: "A", email: "x@y.z", topic: "nope", subject: "", message: "short" })
    expect(result.success).toBe(false)
    const fields = Object.keys(z.flattenError(result.error!).fieldErrors)
    expect(fields).toEqual(expect.arrayContaining(["name", "topic", "subject", "message"]))
  })

  it("accepts a complete business enquiry", () => {
    expect(
      businessSchema.safeParse({
        name: "Alex Smith",
        company: "Acme",
        email: "alex@acme.test",
        country: "United Kingdom",
        type: "packaging",
        interest: "flexipack",
        message: "We need moulded trays for 10k units a month.",
      }).success
    ).toBe(true)
  })

  it("only accepts known programmes", () => {
    expect(interestSchema.safeParse({ email: "a@b.co", programme: "other" }).success).toBe(false)
  })
})
