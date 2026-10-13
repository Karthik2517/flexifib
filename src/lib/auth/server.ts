import "server-only"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { getAuthConfig } from "./config"

export async function getServerAuthClient({ readOnly = false } = {}) {
  const config = getAuthConfig()
  if (!config) return null
  const cookieStore = await cookies()
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(values) {
        // Server Components rely on the proxy to persist refreshed cookies.
        if (readOnly) return
        values.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
      },
    },
  })
}

export async function getAuthenticatedUser({ readOnly = false } = {}) {
  try {
    const client = await getServerAuthClient({ readOnly })
    if (!client) return null
    // Revalidate with the auth service; never authorize from a client-supplied session.
    const { data, error } = await client.auth.getUser()
    return !error && data.user?.email_confirmed_at && !data.user.is_anonymous ? data.user : null
  } catch {
    return null
  }
}
