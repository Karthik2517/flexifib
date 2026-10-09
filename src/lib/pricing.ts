import { getProduct, shipping, type Product } from "@/content/products"

export type CartLine = { slug: string; quantity: number }

export type PricedLine = {
  product: Product
  quantity: number
  lineTotal: number
}

export function clampQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1
  return Math.min(shipping.maxQuantityPerLine, Math.max(1, Math.floor(quantity)))
}

/**
 * Resolve cart lines against the catalogue. Unknown or out-of-stock products
 * are dropped, so a stale basket can never be charged for something we no
 * longer sell. Used by both the basket UI and the checkout server action.
 */
export function priceLines(lines: CartLine[]): PricedLine[] {
  const merged = new Map<string, number>()
  for (const line of lines) {
    merged.set(line.slug, (merged.get(line.slug) ?? 0) + line.quantity)
  }

  const priced: PricedLine[] = []
  for (const [slug, quantity] of merged) {
    const product = getProduct(slug)
    if (!product || !product.inStock) continue
    const qty = clampQuantity(quantity)
    priced.push({ product, quantity: qty, lineTotal: product.price * qty })
  }
  return priced
}

export function subtotalOf(lines: PricedLine[]) {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0)
}

export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0
  return subtotal >= shipping.freeThreshold ? 0 : shipping.standardRate
}

export function amountToFreeShipping(subtotal: number) {
  return Math.max(0, shipping.freeThreshold - subtotal)
}
