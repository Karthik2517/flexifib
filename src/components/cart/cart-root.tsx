"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-store"

const loadDrawer = () => import("./cart-drawer")
const CartDrawer = dynamic(loadDrawer, { ssr: false })

/**
 * Always-mounted, tiny: restores the saved basket, keeps tabs in sync and
 * mounts the drawer the first time it is needed. The drawer code is fetched
 * while the browser is idle so the first open is still instant.
 */
export function CartRoot() {
  const isOpen = useCart((state) => state.isOpen)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    void useCart.persist.rehydrate()
    const onStorage = (event: StorageEvent) => {
      if (event.key === useCart.persist.getOptions().name) void useCart.persist.rehydrate()
    }
    window.addEventListener("storage", onStorage)

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500))
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout
    const handle = idle(() => void loadDrawer())

    return () => {
      window.removeEventListener("storage", onStorage)
      cancelIdle(handle)
    }
  }, [])

  // Mount once, then keep mounted so close animations and state persist.
  if (isOpen && !mounted) setMounted(true)

  return mounted ? <CartDrawer /> : null
}
