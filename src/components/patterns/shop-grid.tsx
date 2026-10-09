"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useId, useTransition } from "react"
import { ChevronDown, Info } from "lucide-react"
import type { Product } from "@/content/products"

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const

type SortValue = (typeof sortOptions)[number]["value"]

export function sortProducts<T extends Pick<Product, "price">>(items: T[], sort: string) {
  if (sort === "price-asc") return [...items].sort((a, b) => a.price - b.price)
  if (sort === "price-desc") return [...items].sort((a, b) => b.price - a.price)
  return items
}

function useSort(): SortValue {
  const value = useSearchParams().get("sort")
  return sortOptions.some((option) => option.value === value) ? (value as SortValue) : "featured"
}

/** Sort control; state lives in the URL so it survives reloads, sharing and Back. */
export function SortSelect() {
  const id = useId()
  const sort = useSort()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        Sort
      </label>
      <div className="relative">
        <select
          id={id}
          value={sort}
          aria-busy={isPending}
          onChange={(event) => {
            const params = new URLSearchParams(searchParams)
            if (event.target.value === "featured") params.delete("sort")
            else params.set("sort", event.target.value)
            params.delete("checkout")
            const query = params.toString()
            startTransition(() =>
              router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
            )
          }}
          className="h-11 appearance-none rounded-md border border-input bg-surface-raised pr-9 pl-3 text-sm font-medium outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-text-muted"
        />
      </div>
    </div>
  )
}

/**
 * Reorders server-rendered product cards on the client. The cards themselves
 * stay Server Components; only their order depends on the URL.
 */
export function SortedGrid({
  items,
}: {
  items: { slug: string; price: number; node: React.ReactNode }[]
}) {
  const sort = useSort()
  return (
    <ul role="list" className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {sortProducts(items, sort).map((item) => item.node)}
    </ul>
  )
}

export function CheckoutCancelledNotice() {
  const cancelled = useSearchParams().get("checkout") === "cancelled"
  if (!cancelled) return null
  return (
    <div
      role="status"
      className="mb-6 flex gap-3 rounded-lg bg-surface-tint p-4 text-sm text-ink-700"
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-text-brand" />
      <p>Checkout was cancelled and you haven’t been charged. Your basket has been saved.</p>
    </div>
  )
}
