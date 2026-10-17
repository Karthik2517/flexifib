"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { getAuthConfig } from "@/lib/auth/config"
import { useCart } from "@/lib/cart-store"

type AuthState = { user: User | null; loading: boolean; configured: boolean }
const AuthContext = createContext<AuthState>({ user: null, loading: true, configured: false })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true, configured: !!getAuthConfig() })

  useEffect(() => {
    let active = true
    let revision = 0
    let unsubscribe: (() => void) | undefined
    const applyUser = (user: User | null) => {
      if (!active) return
      const verified = user?.email_confirmed_at && !user.is_anonymous ? user : null
      useCart.getState().setOwner(verified?.id ?? null)
      setState({ user: verified, loading: false, configured: !!getAuthConfig() })
    }
    async function initialize() {
      await useCart.persist.rehydrate()
      if (!active) return
      const configured = !!getAuthConfig()
      const hasSessionCookie = document.cookie
        .split("; ")
        .some((cookie) => cookie.startsWith("sb-") && cookie.includes("-auth-token"))
      if (!configured || !hasSessionCookie) return applyUser(null)
      const { getAuthClient } = await import("@/lib/auth/client")
      if (!active) return
      const client = getAuthClient()
      if (!client) return applyUser(null)
      const { data } = client.auth.onAuthStateChange((event, session) => {
        if (event === "INITIAL_SESSION") return
        revision++
        applyUser(session?.user ?? null)
      })
      unsubscribe = () => data.subscription.unsubscribe()
      const current = revision
      try {
        const result = await client.auth.getUser()
        if (revision === current) applyUser(result.error ? null : result.data.user)
      } catch {
        if (revision === current) applyUser(null)
      }
    }
    void initialize()
    return () => { active = false; unsubscribe?.() }
  }, [])

  return <AuthContext value={state}>{children}</AuthContext>
}

export function useAuth() { return useContext(AuthContext) }
