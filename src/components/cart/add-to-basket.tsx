"use client"

import { useState } from "react"
import { Check, ShoppingBag } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import { Button } from "@/components/ui/button"
import { productTitle, type Product } from "@/content/products"
import { trackAddToCart } from "@/lib/analytics"
import { useCart } from "@/lib/cart-store"
import { QuantityStepper } from "./quantity-stepper"

type Props = Pick<Product, "slug" | "name" | "variant" | "price" | "inStock">

export function AddToBasket({ product }: { product: Props }) {
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const add = useCart((state) => state.add)
  const open = useCart((state) => state.open)

  function handleAdd() {
    add(product.slug, quantity)
    trackAddToCart({
      item_id: product.slug,
      item_name: product.name,
      item_variant: product.variant,
      price: product.price / 100,
      quantity,
    })
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1400)
    // Let the button confirm first, then reveal the basket.
    window.setTimeout(open, 260)
    setQuantity(1)
  }

  if (!product.inStock) {
    return (
      <p className="rounded-md bg-surface-warm p-4 text-sm font-semibold text-ink-700">
        Currently out of stock.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold" aria-hidden="true">
        Quantity
      </span>
      <div className="flex flex-wrap gap-3">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          label={`Quantity of ${productTitle(product)}`}
        />
        <Button size="lg" className="min-w-52 flex-1 sm:flex-none" onClick={handleAdd}>
          <AnimatePresence mode="popLayout" initial={false}>
            {justAdded ? (
              <m.span
                key="added"
                className="inline-flex items-center gap-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.14 }}
              >
                <Check aria-hidden="true" className="size-4" /> Added
              </m.span>
            ) : (
              <m.span
                key="add"
                className="inline-flex items-center gap-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.14 }}
              >
                <ShoppingBag aria-hidden="true" className="size-4" /> Add to basket
              </m.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {justAdded ? `${productTitle(product)} added to basket` : ""}
      </p>
    </div>
  )
}
