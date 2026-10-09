"use client"

import { useEffect } from "react"
import { trackPurchase } from "@/lib/analytics"
import { useCart } from "@/lib/cart-store"

/**
 * Clears the basket once per paid Stripe session. Guarded by sessionStorage
 * because Next.js keeps visited routes alive (Activity) and re-runs effects
 * when you navigate back — that must never wipe a newer basket.
 */
export function OrderComplete({ sessionId, total }: { sessionId: string; total: number }) {
  useEffect(() => {
    const key = `ff_order_${sessionId}`
    try {
      if (window.sessionStorage.getItem(key)) return
      window.sessionStorage.setItem(key, "1")
    } catch {
      // Storage blocked: clearing twice is harmless only on this first visit.
    }
    // Persist writes on every set, so this also empties the stored basket.
    useCart.getState().clear()
    trackPurchase(sessionId, total / 100)
  }, [sessionId, total])

  return null
}
