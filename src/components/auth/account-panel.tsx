"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { FormAlert } from "@/components/forms/fields"
import { getAuthClient } from "@/lib/auth/client"
import { useAuth } from "./auth-provider"
import { AccountPanelSkeleton } from "./auth-skeleton"

export function AccountPanel() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!loading && !user) router.replace("/login?next=%2Faccount")
  }, [loading, user, router])

  async function signOut() {
    setPending(true)
    setError(null)
    try {
      const client = getAuthClient()
      if (!client) throw new Error("Unavailable")
      const { error } = await client.auth.signOut({ scope: "local" })
      if (error) throw error
      router.replace("/login")
      router.refresh()
    } catch {
      setError("We couldn’t sign you out. Please try again.")
    } finally { setPending(false) }
  }

  if (loading || !user) return <AccountPanelSkeleton />
  return (
    <section className="container-page py-12 sm:py-20">
      <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-border bg-surface-raised p-6 sm:p-9">
        <h1 className="font-heading text-3xl font-bold text-text-brand">Your account</h1>
        <p className="text-sm text-text-muted">Signed in as <span className="block mt-1 break-all font-semibold text-foreground">{user.email}</span></p>
        {error && <FormAlert message={error} />}
        <Link href="/shop" className={buttonVariants({ className: "w-full" })}>Continue shopping</Link>
        <p className="text-sm text-text-muted">You sign in through Google or Apple. Manage your password with that provider.</p>
        <Button variant="outline" className="w-full" onClick={signOut} disabled={pending}>{pending ? "Signing out…" : "Sign out"}</Button>
      </div>
    </section>
  )
}
