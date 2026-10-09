import { describe, expect, it } from "vitest"
import { applicationSchema, CV_MAX_BYTES, validateCv } from "@/lib/careers-form"

const valid = {
  name: "Alex Smith",
  email: "alex@example.com",
  location: "Edinburgh, UK",
  link: "",
  area: "materials-rd",
  message: "I have five years of experience in natural-fibre composites and testing.",
  privacy: true,
}

const file = (name: string, type: string, size = 1000) =>
  new File([new Uint8Array(size)], name, { type })

describe("applicationSchema", () => {
  it("accepts a complete application", () => {
    expect(applicationSchema.safeParse(valid).success).toBe(true)
  })

  it("requires the privacy notice to be acknowledged", () => {
    expect(applicationSchema.safeParse({ ...valid, privacy: false }).success).toBe(false)
  })

  it("only accepts full http(s) links", () => {
    expect(applicationSchema.safeParse({ ...valid, link: "linkedin.com/in/alex" }).success).toBe(false)
    expect(applicationSchema.safeParse({ ...valid, link: "https://linkedin.com/in/alex" }).success).toBe(true)
  })

  it("rejects unknown areas", () => {
    expect(applicationSchema.safeParse({ ...valid, area: "marketing" }).success).toBe(false)
  })
})

describe("validateCv", () => {
  it("treats the CV as optional", () => {
    expect(validateCv(null)).toBeNull()
  })
  it("accepts PDF and Word documents", () => {
    expect(validateCv(file("cv.pdf", "application/pdf"))).toBeNull()
    expect(
      validateCv(file("cv.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
    ).toBeNull()
  })
  it("rejects other file types, including disguised ones", () => {
    expect(validateCv(file("cv.png", "image/png"))).toMatch(/PDF or Word/)
    expect(validateCv(file("cv.exe", "application/pdf"))).toMatch(/PDF or Word/)
  })
  it("rejects files over the size limit", () => {
    expect(validateCv(file("cv.pdf", "application/pdf", CV_MAX_BYTES + 1))).toMatch(/4 MB/)
  })
})
