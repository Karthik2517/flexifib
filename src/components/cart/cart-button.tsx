"use client"

import { ShoppingBag } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { loginHref } from "@/lib/auth/config"
import { Button } from "@/components/ui/button"
import { selectCount, useCart } from "@/lib/cart-store"

export function CartButton() {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const count = useCart(selectCount)
  const hydrated = useCart((state) => state.hydrated)
  const open = useCart((state) => state.open)
  const visibleCount = hydrated && user ? count : 0

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative -mr-2.5"
      disabled={loading}
      onClick={() => user ? open() : router.push(loginHref(pathname))}
      aria-label={
        !user ? "Log in to view basket" : visibleCount > 0
          ? `Open basket, ${visibleCount} ${visibleCount === 1 ? "item" : "items"}`
          : "Open basket"
      }
    >
      <ShoppingBag className="size-5" />
      {visibleCount > 0 && (
        <span
          key={visibleCount}
          aria-hidden="true"
          className="absolute top-1.5 right-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-primary px-1 text-[0.6875rem] font-bold text-primary-foreground tabular-nums animate-in fade-in-0 zoom-in-75 duration-[var(--duration-popover)]"
        >
          {visibleCount}
        </span>
      )}
    </Button>
  )
}
