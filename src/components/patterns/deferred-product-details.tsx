"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { DeferredMount } from "@/components/forms/deferred-mount"
import type { ProductDetails } from "./product-details-tabs"

const ProductDetailsTabs = dynamic(() => import("./product-details-tabs"))

function ProductDetailsFallback({ description }: { description: string }) {
  return (
    <div className="space-y-6">
      <div aria-hidden="true" className="flex gap-3 border-b border-border pb-2">
        {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-8 w-24 rounded-md" />)}
      </div>
      <p className="max-w-prose text-[0.9375rem] leading-relaxed text-text-body">{description}</p>
    </div>
  )
}

export function DeferredProductDetails({ details }: { details: ProductDetails }) {
  return (
    <DeferredMount fallback={<ProductDetailsFallback description={details.description[0]} />}>
      <ProductDetailsTabs details={details} />
    </DeferredMount>
  )
}
