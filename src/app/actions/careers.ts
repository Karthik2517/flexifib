"use server"

import { z } from "zod/mini"
import { contributionAreas } from "@/content/careers"
import { inboxes } from "@/content/site"
import { applicationSchema, validateCv } from "@/lib/careers-form"
import { sendInternalEmail } from "@/lib/email"
import { MIN_FILL_MS, type FormResult } from "@/lib/forms"

const text = (formData: FormData, key: string) => {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

/**
 * Open applications arrive as multipart FormData so a CV can be attached.
 * The CV is forwarded to the careers inbox by email and is never stored by
 * the website itself (see the recruitment privacy notice).
 */
export async function submitApplication(formData: FormData): Promise<FormResult> {
  const startedAt = Number(text(formData, "startedAt"))
  if (text(formData, "website") !== "" || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { ok: true, message: "Thank you." }
  }

  const parsed = applicationSchema.safeParse({
    name: text(formData, "name"),
    email: text(formData, "email"),
    location: text(formData, "location"),
    link: text(formData, "link"),
    area: text(formData, "area"),
    message: text(formData, "message"),
    privacy: text(formData, "privacy") === "true",
  })

  const cv = formData.get("cv")
  const file = cv instanceof File && cv.size > 0 ? cv : null
  const cvError = validateCv(file)

  if (!parsed.success || cvError) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: {
        ...(parsed.success ? {} : z.flattenError(parsed.error).fieldErrors),
        ...(cvError ? { cv: [cvError] } : {}),
      },
    }
  }

  const data = parsed.data
  const area = contributionAreas.find((a) => a.value === data.area)?.label ?? data.area
  const result = await sendInternalEmail({
    to: inboxes.careers,
    replyTo: data.email,
    subject: `[Open application · ${area}] ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Location: ${data.location}`,
      data.link && `Link: ${data.link}`,
      `Area of interest: ${area}`,
      `CV attached: ${file ? file.name : "No"}`,
      `Privacy notice confirmed: yes`,
      "",
      data.message,
    ]
      .filter((line) => line !== "")
      .join("\n"),
    attachments: file
      ? [{ filename: file.name.replace(/[^\w.\- ]/g, "_"), content: Buffer.from(await file.arrayBuffer()) }]
      : undefined,
  })

  if (result === "failed") {
    return {
      ok: false,
      message: `Sorry — we couldn’t send your application just now. Please try again, or email ${inboxes.careers}.`,
    }
  }
  return {
    ok: true,
    message:
      "Thank you — your application has reached our team. We’ll be in touch if a suitable opportunity arises.",
  }
}
