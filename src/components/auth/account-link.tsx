"use client"

import Link from "next/link"
import { UserRound } from "lucide-react"
import { useAuth } from "./auth-provider"

export function AccountLink() {
  const { user, loading } = useAuth()
  return (
    <Link href={user ? "/account" : "/login"} className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-text-brand hover:underline">
      <UserRound aria-hidden="true" className="size-5" />
      <span>{loading ? "Account" : user ? "Account" : "Log in"}</span>
    </Link>
  )
}
