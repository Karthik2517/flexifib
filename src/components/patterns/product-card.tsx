import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { formatPrice, productTitle, type Product } from "@/content/products"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"

export function ProductCard({ product }: { product: Product }) {
  const title = productTitle(product)
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface-raised shadow-(--shadow-card) transition-[box-shadow,transform] duration-(--duration-popover) ease-out-quart has-[a:hover]:-translate-y-0.5 has-[a:hover]:shadow-(--shadow-card-hover)">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-(--duration-large) ease-out-quart group-has-[a:hover]:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <StatusBadge>Launch Collection</StatusBadge>
        <h3 className="mt-3 text-subheading">{title}</h3>
        <p className="mt-1 font-semibold text-ink-900 tabular-nums">
          {formatPrice(product.price)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{product.summary}</p>
        <div className="mt-auto pt-5">
          <Link
            href={`/shop/${product.slug}`}
            // Product pages read their [slug] param; per-link prefetch makes them instant.
            prefetch
            aria-label={`View product: ${title}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "after:absolute after:inset-0 after:content-['']"
            )}
          >
            View product
          </Link>
        </div>
      </div>
    </li>
  )
}
