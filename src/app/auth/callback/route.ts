import { NextResponse, type NextRequest } from "next/server"
import { safeNext } from "@/lib/auth/config"
import { getServerAuthClient } from "@/lib/auth/server"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  const next = safeNext(request.nextUrl.searchParams.get("next"))
  if (code && !request.nextUrl.searchParams.has("error")) {
    try {
      const client = await getServerAuthClient()
      if (client) {
        const { error } = await client.auth.exchangeCodeForSession(code)
        if (!error) {
          const response = NextResponse.redirect(new URL(next, request.url))
          response.headers.set("Cache-Control", "private, no-store")
          return response
        }
      }
    } catch {
      // A failed exchange, missing verifier, or service outage must not grant access.
    }
  }
  const destination = new URL("/login", request.url)
  destination.searchParams.set("error", "oauth")
  destination.searchParams.set("next", next)
  const response = NextResponse.redirect(destination)
  response.headers.set("Cache-Control", "private, no-store")
  return response
}
