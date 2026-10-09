"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { selectCount, useCart } from "@/lib/cart-store"

export function CartButton() {
  const count = useCart(selectCount)
  const hydrated = useCart((state) => state.hydrated)
  const open = useCart((state) => state.open)
  const visibleCount = hydrated ? count : 0

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative -mr-2.5"
      onClick={open}
      aria-label={
        visibleCount > 0
          ? `Open basket, ${visibleCount} ${visibleCount === 1 ? "item" : "items"}`
          : "Open basket"
      }
    >
      <ShoppingBag className="size-5" />
      {visibleCount > 0 && (
        <span
          key={visibleCount}
          aria-hidden="true"
          className="absolute top-1.5 right-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-primary px-1 text-[0.6875rem] font-bold text-primary-foreground tabular-nums animate-in fade-in-0 zoom-in-75 duration-(--duration-popover)"
        >
          {visibleCount}
        </span>
      )}
    </Button>
  )
}
