"use server"

import { z } from "zod/mini"
import { inboxes } from "@/content/site"
import { addNewsletterContact, sendInternalEmail } from "@/lib/email"
import {
  antiSpamSchema,
  businessInterests,
  businessSchema,
  businessTypes,
  contactSchema,
  contactTopics,
  interestSchema,
  MIN_FILL_MS,
  newsletterSchema,
  type FormKind,
  type FormResult,
} from "@/lib/forms"

const schemas = {
  contact: contactSchema,
  business: businessSchema,
  newsletter: newsletterSchema,
  interest: interestSchema,
} as const

const UNAVAILABLE: FormResult = {
  ok: false,
  message: `Sorry — we couldn’t send that just now. Please try again, or email ${inboxes.general}.`,
}

function labelOf(list: readonly { value: string; label: string }[], value: string) {
  return list.find((item) => item.value === value)?.label ?? value
}

function lines(entries: [string, string | undefined][]) {
  return entries
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")
}

export async function submitForm(kind: FormKind, payload: unknown): Promise<FormResult> {
  const schema = schemas[kind]
  if (!schema) return { ok: false, message: "Unknown form." }

  const spam = antiSpamSchema.safeParse(payload)
  // Bots fill the hidden field or submit instantly. Pretend success so they learn nothing.
  if (!spam.success || Date.now() - spam.data.startedAt < MIN_FILL_MS) {
    return { ok: true, message: "Thank you." }
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  switch (kind) {
    case "contact": {
      const data = parsed.data as z.infer<typeof contactSchema>
      const topic = contactTopics.find((t) => t.value === data.topic)!
      const result = await sendInternalEmail({
        to: inboxes[topic.inbox],
        replyTo: data.email,
        subject: `[Website · ${topic.label}] ${data.subject}`,
        text: `${lines([
          ["Name", data.name],
          ["Email", data.email],
          ["Topic", topic.label],
        ])}\n\n${data.message}`,
      })
      if (result === "failed") return UNAVAILABLE
      return {
        ok: true,
        message: "Thanks — your message has been sent. We aim to reply within two working days.",
      }
    }

    case "business": {
      const data = parsed.data as z.infer<typeof businessSchema>
      const type = businessTypes.find((t) => t.value === data.type)!
      const result = await sendInternalEmail({
        to: inboxes[type.inbox],
        replyTo: data.email,
        subject: `[Business enquiry · ${type.label}] ${data.company}`,
        text: `${lines([
          ["Name", data.name],
          ["Company", data.company],
          ["Email", data.email],
          ["Country", data.country],
          ["Enquiry type", type.label],
          ["Interest", labelOf(businessInterests, data.interest)],
          ["Quantity / scale", data.scale],
        ])}\n\n${data.message}`,
      })
      if (result === "failed") return UNAVAILABLE
      return {
        ok: true,
        message:
          "Thank you — your enquiry has reached the right team. We’ll reply within three working days.",
      }
    }

    case "newsletter": {
      const data = parsed.data as z.infer<typeof newsletterSchema>
      const [contact, notify] = await Promise.all([
        addNewsletterContact(data.email),
        sendInternalEmail({
          to: inboxes.general,
          subject: "[Website] New journey-updates subscriber",
          text: `Email: ${data.email}`,
        }),
      ])
      if (contact === "failed" && notify === "failed") return UNAVAILABLE
      return {
        ok: true,
        message: "You’re on the list. We’ll only write when there’s real progress to share.",
      }
    }

    case "interest": {
      const data = parsed.data as z.infer<typeof interestSchema>
      const result = await sendInternalEmail({
        to: inboxes.general,
        replyTo: data.email,
        subject: `[Website] Registered interest · ${data.programme}`,
        text: lines([
          ["Email", data.email],
          ["Programme", data.programme],
        ]),
      })
      if (result === "failed") return UNAVAILABLE
      return {
        ok: true,
        message: "Thanks — we’ll email you when there’s a genuine development update.",
      }
    }
  }
}
