import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getAuthConfig } from "@/lib/auth/config"

export async function proxy(request: NextRequest) {
  const auth = getAuthConfig()
  let response = NextResponse.next({ request })
  if (!auth) return response

  const client = createServerClient(auth.url, auth.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values) {
        values.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        values.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        response.headers.set("Cache-Control", "private, no-store")
      },
    },
  })
  // Refresh cookies before rendering. Checkout independently verifies the user.
  try {
    await client.auth.getClaims()
  } catch {
    // Public browsing still works during an auth outage; protected actions fail closed.
  }
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2)$).*)"],
}
