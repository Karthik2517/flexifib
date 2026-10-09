import type { MetadataRoute } from "next"
import { products } from "@/content/products"
import { site } from "@/content/site"

const staticRoutes = [
  "",
  "/shop",
  "/products",
  "/products/ecobrush",
  "/products/hempsoft",
  "/products/flexipack",
  "/innovation",
  "/sustainability",
  "/our-story",
  "/business",
  "/insights",
  "/careers",
  "/contact",
  "/help",
  "/help/shipping",
  "/help/returns",
  "/help/faq",
  "/help/product-safety",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/terms",
  "/legal/accessibility",
  "/legal/recruitment-privacy",
  "/legal/company",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/legal") ? 0.3 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${site.url}/shop/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
