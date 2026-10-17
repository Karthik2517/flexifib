import { beforeEach, describe, expect, it, vi } from "vitest"
import { submitForm } from "@/app/actions/forms"
import { submitApplication } from "@/app/actions/careers"
import { inboxes } from "@/content/site"
import { MIN_FILL_MS, type FormKind } from "@/lib/forms"

const delivery = vi.hoisted(() => ({ sendInternalEmail: vi.fn(), addNewsletterContact: vi.fn() }))
vi.mock("@/lib/email", () => delivery)

const contact = {
  name: "Test Customer", email: "customer@example.test", topic: "orders",
  subject: "Order enquiry", message: "Please help me with my recent order.",
}
const spamFields = () => ({ website: "", startedAt: Date.now() - MIN_FILL_MS - 1000 })

beforeEach(() => {
  vi.resetAllMocks()
  delivery.sendInternalEmail.mockResolvedValue("sent")
  delivery.addNewsletterContact.mockResolvedValue("sent")
})

describe("public form delivery", () => {
  it.each([
    ["contact", contact, inboxes.orders],
    ["business", { name: "Test Buyer", email: "buyer@example.test", company: "Example Ltd",
      country: "United Kingdom", type: "research", interest: "materials",
      message: "We would like to discuss materials testing." }, inboxes.research],
    ["interest", { email: "customer@example.test", programme: "ecobrush" }, inboxes.general],
  ] satisfies [FormKind, Record<string, string>, string][])(
    "%s routes valid enquiries and reports delivery failure honestly",
    async (kind, data, to) => {
      const payload = { ...data, ...spamFields() }
      expect((await submitForm(kind, payload)).ok).toBe(true)
      expect(delivery.sendInternalEmail).toHaveBeenCalledWith(expect.objectContaining({ to, replyTo: data.email }))
      delivery.sendInternalEmail.mockResolvedValue("failed")
      expect((await submitForm(kind, payload)).ok).toBe(false)
    }
  )

  it("rejects invalid input before requesting delivery", async () => {
    const result = await submitForm("contact", { ...contact, email: "invalid", ...spamFields() })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.fieldErrors?.email).toBeDefined()
    expect(delivery.sendInternalEmail).not.toHaveBeenCalled()
  })

  it.each([{ website: "spam" }, { startedAt: Date.now() }])(
    "does not send honeypot or instant submissions (%j)", async (override) => {
      await submitForm("contact", { ...contact, ...spamFields(), ...override })
      expect(delivery.sendInternalEmail).not.toHaveBeenCalled()
    }
  )

  it.each([
    ["sent", "sent", true], ["sent", "failed", true],
    ["failed", "sent", true], ["failed", "failed", false],
  ])("newsletter contact=%s notification=%s returns success=%s", async (contactResult, notifyResult, ok) => {
    delivery.addNewsletterContact.mockResolvedValue(contactResult)
    delivery.sendInternalEmail.mockResolvedValue(notifyResult)
    const result = await submitForm("newsletter", { email: "subscriber@example.test", ...spamFields() })
    expect(result.ok).toBe(ok)
    expect(delivery.addNewsletterContact).toHaveBeenCalledWith("subscriber@example.test")
  })
})

function application() {
  const form = new FormData()
  for (const [key, value] of Object.entries({
    name: "Test Applicant", email: "applicant@example.test", location: "Edinburgh",
    area: "materials-rd", message: "Experience in natural-fibre composites and testing.",
    privacy: "true", website: "", startedAt: String(spamFields().startedAt),
  })) form.set(key, value)
  form.set("cv", new File(["%PDF-1.4 test"], "cv.pdf", { type: "application/pdf" }))
  return form
}

describe("application delivery", () => {
  it("forwards the CV bytes to the careers inbox", async () => {
    expect((await submitApplication(application())).ok).toBe(true)
    expect(delivery.sendInternalEmail).toHaveBeenCalledWith(expect.objectContaining({
      to: inboxes.careers, replyTo: "applicant@example.test",
      attachments: [{ filename: "cv.pdf", content: Buffer.from("%PDF-1.4 test") }],
    }))
  })

  it("does not claim success when CV delivery fails", async () => {
    delivery.sendInternalEmail.mockResolvedValue("failed")
    expect((await submitApplication(application())).ok).toBe(false)
  })

  it("does not forward an application without privacy acknowledgement", async () => {
    const form = application()
    form.set("privacy", "false")
    expect((await submitApplication(form)).ok).toBe(false)
    expect(delivery.sendInternalEmail).not.toHaveBeenCalled()
  })
})
