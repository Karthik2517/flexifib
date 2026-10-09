"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, useTransition } from "react"
import { AlertCircle, Loader2, Lock, ShoppingBag, Trash2 } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import { startCheckout } from "@/app/actions/checkout"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { buttonVariants } from "@/components/ui/button"
import { formatPrice, productTitle, shipping } from "@/content/products"
import { trackBeginCheckout } from "@/lib/analytics"
import { selectCount, useCart } from "@/lib/cart-store"
import {
  amountToFreeShipping,
  priceLines,
  shippingFor,
  subtotalOf,
} from "@/lib/pricing"
import { cn } from "@/lib/utils"
import { QuantityStepper } from "./quantity-stepper"

/**
 * The basket panel. Loaded on demand by <CartRoot /> so its dependencies
 * (dialog, motion, checkout action) stay out of every page's initial bundle.
 */
export default function CartDrawer() {
  const lines = useCart((state) => state.lines)
  const isOpen = useCart((state) => state.isOpen)
  const setOpen = useCart((state) => state.setOpen)
  const setQuantity = useCart((state) => state.setQuantity)
  const remove = useCart((state) => state.remove)
  const count = useCart(selectCount)

  const priced = useMemo(() => priceLines(lines), [lines])
  const subtotal = subtotalOf(priced)
  const remaining = amountToFreeShipping(subtotal)
  const progress = Math.min(100, Math.round((subtotal / shipping.freeThreshold) * 100))

  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function checkout() {
    setError(null)
    startTransition(async () => {
      trackBeginCheckout(
        priced.map(({ product, quantity }) => ({
          item_id: product.slug,
          item_name: product.name,
          item_variant: product.variant,
          price: product.price / 100,
          quantity,
        })),
        subtotal / 100
      )
      const result = await startCheckout(
        priced.map(({ product, quantity }) => ({ slug: product.slug, quantity }))
      )
      if (result.ok) {
        window.location.assign(result.url)
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setOpen(open)}>
      <SheetContent
        side="right"
        className="gap-0 border-l-0 bg-surface-page p-0 shadow-(--shadow-drawer) duration-(--duration-drawer) data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetHeader className="flex-row items-baseline gap-3 border-b border-border px-5 py-4 pr-14 sm:px-6">
          <SheetTitle className="font-heading text-2xl font-semibold text-text-brand">
            Your basket
          </SheetTitle>
          <SheetDescription className="text-sm tabular-nums">
            {count} {count === 1 ? "item" : "items"}
          </SheetDescription>
        </SheetHeader>

        {priced.length > 0 && (
          <div className="border-b border-border bg-surface-tint px-5 py-3 sm:px-6">
            <p className="text-sm text-ink-700" aria-live="polite">
              {remaining > 0 ? (
                <>
                  Add <strong className="tabular-nums">{formatPrice(remaining)}</strong> more
                  for free UK delivery
                </>
              ) : (
                <>You’ve unlocked <strong>free UK delivery</strong></>
              )}
            </p>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-200"
              role="progressbar"
              aria-label="Progress to free delivery"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-(--duration-large) ease-out-quart"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6">
          {priced.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <ShoppingBag aria-hidden="true" className="size-12 text-sand-300" strokeWidth={1.5} />
              <h3 className="mt-4 text-subheading">Your basket is empty</h3>
              <p className="mt-2 max-w-xs text-sm text-text-muted">
                Browse the Launch Collection — carefully selected products available today.
              </p>
              <Link
                href="/shop"
                onNavigate={() => setOpen(false)}
                className={cn(buttonVariants(), "mt-6")}
              >
                Shop the Launch Collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              <AnimatePresence initial={false}>
                {priced.map(({ product, quantity, lineTotal }) => {
                  const title = productTitle(product)
                  return (
                    <m.li
                      key={product.slug}
                      layout="position"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4 py-5">
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-sand-200">
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/shop/${product.slug}`}
                              onNavigate={() => setOpen(false)}
                              className="font-semibold leading-snug text-ink-900 hover:underline"
                            >
                              {title}
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="-mt-1.5 -mr-2 text-text-muted"
                              onClick={() => remove(product.slug)}
                              aria-label={`Remove ${title}`}
                            >
                              <Trash2 />
                            </Button>
                          </div>
                          <p className="text-sm text-text-muted tabular-nums">
                            {formatPrice(product.price)} each
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <QuantityStepper
                              size="sm"
                              value={quantity}
                              onChange={(next) => setQuantity(product.slug, next)}
                              label={`Quantity of ${title}`}
                              min={1}
                            />
                            <span className="font-semibold tabular-nums">
                              {formatPrice(lineTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </m.li>
                  )
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {priced.length > 0 && (
          <div className="border-t border-border bg-surface-raised px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
            {error && (
              <div
                role="alert"
                className="mb-4 flex gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <dl className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-muted">Subtotal</dt>
                <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">UK delivery</dt>
                <dd className="tabular-nums">
                  {shippingFor(subtotal) === 0 ? "Free" : formatPrice(shippingFor(subtotal))}
                </dd>
              </div>
              <div className="mt-1 flex justify-between border-t border-border pt-2.5 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-semibold tabular-nums">
                  {formatPrice(subtotal + shippingFor(subtotal))}
                </dd>
              </div>
            </dl>
            <Button
              size="lg"
              className="mt-4 w-full"
              onClick={checkout}
              disabled={isPending}
              data-loading={isPending ? "" : undefined}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Connecting to secure checkout…
                </>
              ) : (
                <>
                  <Lock aria-hidden="true" />
                  Checkout securely
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-text-muted">
              Payment is handled by Stripe. Delivery {shipping.minDays}–{shipping.maxDays}{" "}
              working days. See{" "}
              <Link
                href="/help/returns"
                onNavigate={() => setOpen(false)}
                className="underline underline-offset-2"
              >
                returns
              </Link>
              .
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
