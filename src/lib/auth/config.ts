export function getAuthConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  return url && key ? { url, key } : null
}

/** Only permit local destinations, and avoid returning to another login screen. */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\s]/.test(value)) {
    return "/shop"
  }
  const url = new URL(value, "https://flexifib.invalid")
  if (url.origin !== "https://flexifib.invalid" || url.pathname.startsWith("//") || url.pathname.startsWith("/auth/")) return "/shop"
  if (/^\/(login|signup|forgot-password|reset-password)\/?$/.test(url.pathname)) return "/shop"
  return `${url.pathname}${url.search}${url.hash}`
}

export function loginHref(next: string) {
  return `/login?next=${encodeURIComponent(safeNext(next))}`
}
