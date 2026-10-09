import { z } from "zod/mini"
import { contributionAreas } from "@/content/careers"

/**
 * Open-application rules, shared by the browser and the server action.
 * The CV is validated separately because it travels as a File, not JSON.
 */

export const CV_MAX_BYTES = 4 * 1024 * 1024 // Vercel caps request bodies at 4.5 MB
export const CV_ACCEPT = ".pdf,.doc,.docx"
const CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])
const CV_EXTENSIONS = /\.(pdf|docx?)$/i

const trimmed = (min: number, minMessage: string, max: number) =>
  z.string().check(z.trim(), z.minLength(min, minMessage), z.maxLength(max))

export const applicationSchema = z.object({
  name: trimmed(2, "Please enter your name.", 120),
  email: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Please enter your email address."),
      z.maxLength(200),
      z.email("Please enter a valid email address.")
    ),
  location: trimmed(2, "Please tell us where you are based.", 120),
  link: z._default(
    z.string().check(
      z.trim(),
      z.maxLength(300),
      z.refine((value) => value === "" || /^https?:\/\/\S+\.\S+/.test(value), {
        error: "Please enter a full link starting with https://",
      })
    ),
    ""
  ),
  area: z.enum(contributionAreas.map((area) => area.value) as [string, ...string[]], {
    error: "Please choose the area that interests you most.",
  }),
  message: trimmed(30, "Please tell us a little more (at least 30 characters).", 4000),
  privacy: z.literal(true, { error: "Please confirm you have read the recruitment privacy notice." }),
})

export type ApplicationValues = z.infer<typeof applicationSchema>

/** Returns an error message, or null when the CV is acceptable (it is optional). */
export function validateCv(file: File | null | undefined): string | null {
  if (!file || file.size === 0) return null
  if (file.size > CV_MAX_BYTES) return "Please upload a CV smaller than 4 MB."
  const typeOk = CV_TYPES.has(file.type) || (file.type === "" && CV_EXTENSIONS.test(file.name))
  if (!typeOk || !CV_EXTENSIONS.test(file.name)) return "Please upload your CV as a PDF or Word document."
  return null
}
