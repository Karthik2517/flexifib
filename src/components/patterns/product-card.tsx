import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { formatPrice, productTitle, type Product } from "@/content/products"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"

export function ProductCard({ product }: { product: Product }) {
  const title = productTitle(product)
  return (
    <li
      data-card=""
      data-interactive=""
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface-raised shadow-(--shadow-card) transition-[box-shadow,translate] duration-200 ease-out-quint has-[a:hover]:-translate-y-1 has-[a:hover]:shadow-(--shadow-card-hover)">
      <div data-card-media="" className="relative aspect-[4/3] overflow-hidden bg-surface-sunken">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-400 ease-out-quint group-has-[a:hover]:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <StatusBadge>Launch Collection</StatusBadge>
        <h3 className="mt-3 text-subheading">{title}</h3>
        <p className="mt-1 font-semibold text-foreground tabular-nums">
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
              "after:absolute after:inset-0 after:content-['']",
              // No press scale: it would make the button the ::after's containing block mid-click
              "active:scale-none!"
            )}
          >
            View product
          </Link>
        </div>
      </div>
    </li>
  )
}
