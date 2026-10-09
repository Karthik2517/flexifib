import type { StaticImageData } from "next/image"
import toothbrush from "@/assets/images/toothbrush.jpg"

/**
 * Launch Collection catalogue — the single source of truth for what can be
 * bought, and for what it costs. The checkout server action prices orders
 * from this file only; the browser never supplies a price.
 *
 * PRICES ARE PLACEHOLDERS (£5) until supplier pricing is confirmed.
 * Attribute values set to null render as "Awaiting supplier confirmation".
 */

export type ProductAttribute = {
  label: string
  value: string | null
}

export type Product = {
  slug: string
  name: string
  variant: string
  /** Price in pence (GBP) */
  price: number
  summary: string
  description: string[]
  image: StaticImageData
  imageAlt: string
  inStock: boolean
  attributes: ProductAttribute[]
  materials: string
  origin: string
  care: string
}

const sharedAttributes = (packaging: string | null): ProductAttribute[] => [
  { label: "Handle material", value: null },
  { label: "Bristle material", value: null },
  { label: "Country of manufacture", value: null },
  { label: "Dimensions", value: null },
  { label: "Packaging", value: packaging },
  { label: "Product code / batch", value: null },
]

const sharedOrigin =
  "Launch Collection toothbrushes are manufactured by an external production partner and selected and retailed by FlexiFib Eco Ltd. The confirmed country of manufacture is shown in Key information once supplier documentation has been verified."

const sharedCare =
  "Rinse thoroughly after each use and store upright in a well-ventilated place so the handle can dry between uses. Replace your toothbrush every three months, or sooner if the bristles become splayed."

export const products: Product[] = [
  {
    slug: "launch-toothbrush-soft",
    name: "Launch Toothbrush",
    variant: "Soft",
    price: 500,
    summary: "A carefully selected everyday toothbrush with soft bristles.",
    description: [
      "A carefully selected toothbrush offered as part of FlexiFib’s Launch Collection, with soft bristles for a gentle daily clean.",
      "The Launch Collection lets us serve customers today while our proprietary EcoBrush programme continues through research and development.",
    ],
    image: toothbrush,
    imageAlt: "Launch Toothbrush standing upright in a stone holder beside hemp leaves",
    inStock: true,
    attributes: sharedAttributes(null),
    materials:
      "Handle, bristle and packaging composition will be listed here exactly as stated in verified supplier documentation.",
    origin: sharedOrigin,
    care: sharedCare,
  },
  {
    slug: "launch-toothbrush-medium",
    name: "Launch Toothbrush",
    variant: "Medium",
    price: 500,
    summary: "The same Launch Collection toothbrush with medium bristles.",
    description: [
      "A carefully selected toothbrush offered as part of FlexiFib’s Launch Collection, with medium bristles for people who prefer a firmer feel.",
      "The Launch Collection lets us serve customers today while our proprietary EcoBrush programme continues through research and development.",
    ],
    image: toothbrush,
    imageAlt: "Launch Toothbrush standing upright in a stone holder beside hemp leaves",
    inStock: true,
    attributes: sharedAttributes(null),
    materials:
      "Handle, bristle and packaging composition will be listed here exactly as stated in verified supplier documentation.",
    origin: sharedOrigin,
    care: sharedCare,
  },
  {
    slug: "launch-toothbrush-family-pack",
    name: "Launch Toothbrush",
    variant: "Family Pack",
    price: 500,
    summary: "A multi-pack of Launch Collection toothbrushes for the household.",
    description: [
      "A household pack of Launch Collection toothbrushes. Pack contents and bristle mix will be confirmed alongside final stock and pricing.",
      "The Launch Collection lets us serve customers today while our proprietary EcoBrush programme continues through research and development.",
    ],
    image: toothbrush,
    imageAlt: "Launch Toothbrush standing upright in a stone holder beside hemp leaves",
    inStock: true,
    attributes: sharedAttributes(null),
    materials:
      "Handle, bristle and packaging composition will be listed here exactly as stated in verified supplier documentation.",
    origin: sharedOrigin,
    care: sharedCare,
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function productTitle(product: Pick<Product, "name" | "variant">) {
  return `${product.name} — ${product.variant}`
}

/** Shipping rules shared by the basket UI and the checkout server action. */
export const shipping = {
  currency: "gbp",
  freeThreshold: 2000,
  standardRate: 299,
  minDays: 3,
  maxDays: 5,
  maxQuantityPerLine: 10,
  countries: ["GB"] as const,
} as const

export function formatPrice(pence: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100)
}
