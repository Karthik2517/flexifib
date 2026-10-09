import { z } from "zod/mini"
import type { Inbox } from "@/content/site"

/**
 * Form schemas shared by the browser (React Hook Form) and the server action,
 * so validation rules and error messages can never drift apart.
 * Uses `zod/mini` — the tree-shakeable build — to keep client bundles small.
 */

const text = (min: number, minMessage: string, max: number, maxMessage?: string) =>
  z.string().check(z.trim(), z.minLength(min, minMessage), z.maxLength(max, maxMessage))

const name = text(2, "Please enter your name.", 120)
const email = z
  .string()
  .check(
    z.trim(),
    z.minLength(1, "Please enter your email address."),
    z.maxLength(200),
    z.email("Please enter a valid email address.")
  )
const message = text(
  10,
  "Please tell us a little more (at least 10 characters).",
  5000,
  "Please keep your message under 5,000 characters."
)

/** Spam protection: a hidden honeypot field plus a minimum fill time. */
export const antiSpamSchema = z.object({
  website: z._default(z.string().check(z.maxLength(0)), ""),
  startedAt: z.number().check(z.int(), z.positive()),
})
export const MIN_FILL_MS = 2500

export const contactTopics = [
  { value: "general", label: "General enquiry", inbox: "general" },
  { value: "support", label: "Customer support", inbox: "support" },
  { value: "orders", label: "An existing order", inbox: "orders" },
  { value: "partnerships", label: "Partnerships", inbox: "partnerships" },
  { value: "press", label: "Press & media", inbox: "press" },
  { value: "research", label: "Research", inbox: "research" },
] as const satisfies readonly { value: string; label: string; inbox: Inbox }[]

export const contactSchema = z.object({
  name,
  email,
  topic: z.enum(contactTopics.map((t) => t.value) as [string, ...string[]], {
    error: "Please choose what your message is about.",
  }),
  subject: text(3, "Please add a short subject.", 160),
  message,
})
export type ContactValues = z.infer<typeof contactSchema>

export const businessTypes = [
  { value: "retail", label: "Retail or wholesale", inbox: "wholesale" },
  { value: "hospitality", label: "Hotels & hospitality", inbox: "wholesale" },
  { value: "corporate", label: "Corporate buying", inbox: "wholesale" },
  { value: "distribution", label: "Distribution", inbox: "wholesale" },
  { value: "manufacturing", label: "Manufacturing partner", inbox: "partnerships" },
  { value: "packaging", label: "Packaging requirement", inbox: "partnerships" },
  { value: "research", label: "Research collaboration", inbox: "research" },
  { value: "university", label: "University partnership", inbox: "research" },
  { value: "other", label: "Something else", inbox: "partnerships" },
] as const satisfies readonly { value: string; label: string; inbox: Inbox }[]

export const businessInterests = [
  { value: "launch-collection", label: "Launch Collection" },
  { value: "ecobrush", label: "EcoBrush" },
  { value: "hempsoft", label: "HempSoft" },
  { value: "flexipack", label: "FlexiPack" },
  { value: "materials", label: "Materials & R&D generally" },
] as const

export const businessSchema = z.object({
  name,
  company: text(2, "Please enter your company or organisation.", 160),
  email,
  country: text(2, "Please enter your country.", 80),
  type: z.enum(businessTypes.map((t) => t.value) as [string, ...string[]], {
    error: "Please choose an enquiry type.",
  }),
  interest: z.enum(businessInterests.map((t) => t.value) as [string, ...string[]], {
    error: "Please choose a product or programme.",
  }),
  scale: z._default(z.string().check(z.trim(), z.maxLength(160)), ""),
  message,
})
export type BusinessValues = z.infer<typeof businessSchema>

export const newsletterSchema = z.object({ email })
export type NewsletterValues = z.infer<typeof newsletterSchema>

export const interestProgrammes = ["ecobrush", "hempsoft", "flexipack"] as const
export const interestSchema = z.object({
  email,
  programme: z.enum(interestProgrammes),
})
export type InterestValues = z.infer<typeof interestSchema>

export type FormKind = "contact" | "business" | "newsletter" | "interest"

export type FormResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[] | undefined> }
