"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-store"
import { useAuth } from "@/components/auth/auth-provider"

const loadDrawer = () => import("./cart-drawer")
const CartDrawer = dynamic(loadDrawer, { ssr: false })

/**
 * Always-mounted, tiny: keeps the authenticated basket in sync across tabs and
 * mounts the drawer the first time it is needed. The drawer code is fetched
 * while the browser is idle so the first open is still instant.
 */
export function CartRoot() {
  const { user, loading } = useAuth()
  const isOpen = useCart((state) => state.isOpen)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === useCart.persist.getOptions().name) {
        void Promise.resolve(useCart.persist.rehydrate()).then(() => {
          // Never show another account's locally persisted basket.
          const state = useCart.getState()
          if (state.ownerId !== (user?.id ?? null)) state.setOwner(user?.id ?? null)
        })
      }
    }
    window.addEventListener("storage", onStorage)

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500))
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout
    const handle = user && !loading ? idle(() => void loadDrawer()) : undefined

    return () => {
      window.removeEventListener("storage", onStorage)
      if (handle !== undefined) cancelIdle(handle)
    }
  }, [loading, user, user?.id])

  // Mount once, then keep mounted so close animations and state persist.
  if (isOpen && !mounted) setMounted(true)

  return mounted && user && !loading ? <CartDrawer /> : null
}
