import "server-only"
import { Resend } from "resend"

let client: Resend | null = null

function getResend() {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return null
  client ??= new Resend(key)
  return client
}

export type DeliveryResult = "sent" | "logged" | "failed"

/**
 * Send an internal notification email. Without RESEND_API_KEY, submissions
 * are logged in development and reported as a failure in production so a
 * visitor is never told a message was sent when it wasn't.
 */
export async function sendInternalEmail(options: {
  to: string
  subject: string
  text: string
  replyTo?: string
  attachments?: { filename: string; content: Buffer }[]
}): Promise<DeliveryResult> {
  const resend = getResend()
  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      const { attachments, ...rest } = options
      console.info("[email:dev] Would send", rest, attachments?.map((a) => a.filename) ?? [])
      return "logged"
    }
    console.error("[email] RESEND_API_KEY is not configured")
    return "failed"
  }

  const from = process.env.RESEND_FROM ?? "FlexiFib Website <website@flexifib.com>"
  const { error } = await resend.emails.send({
    from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    replyTo: options.replyTo,
    attachments: options.attachments,
  })
  if (error) {
    console.error("[email] Resend error", error)
    return "failed"
  }
  return "sent"
}

export async function addNewsletterContact(email: string): Promise<DeliveryResult> {
  const resend = getResend()
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID?.trim()
  if (!resend || !segmentId) return "logged"
  const { error } = await resend.contacts.create({
    email,
    segments: [{ id: segmentId }],
  })
  if (error) {
    console.error("[email] Failed to add newsletter contact", error)
    return "failed"
  }
  return "sent"
}
