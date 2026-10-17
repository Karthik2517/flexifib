"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type ProductDetails = {
  description: string[]
  materials: string
  origin: string
  care: string
  standardRate: string
  freeThreshold: string
  minDays: number
  maxDays: number
}

export default function ProductDetailsTabs({ details }: { details: ProductDetails }) {
  const tabs = [
    { value: "description", label: "Description", body: details.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>) },
    { value: "materials", label: "Materials", body: <p>{details.materials}</p> },
    { value: "origin", label: "Origin", body: <p>{details.origin}</p> },
    { value: "care", label: "Care", body: <p>{details.care}</p> },
    {
      value: "delivery",
      label: "Delivery",
      body: (
        <>
          <p>
            We currently deliver to UK addresses. Standard delivery is {details.standardRate}, and
            free on orders of {details.freeThreshold} or more. Orders usually arrive within{" "}
            {details.minDays}–{details.maxDays} working days.
          </p>
          <p><Link href="/help/shipping" className="font-semibold text-text-brand underline underline-offset-3">Shipping &amp; delivery details</Link></p>
        </>
      ),
    },
    {
      value: "returns",
      label: "Returns",
      body: (
        <>
          <p>You can cancel your order or return unused items in their original packaging within 14 days of delivery. For hygiene reasons, opened toothbrushes can only be returned if they are faulty.</p>
          <p><Link href="/help/returns" className="font-semibold text-text-brand underline underline-offset-3">Returns &amp; refunds policy</Link></p>
        </>
      ),
    },
  ]

  return (
    <Tabs defaultValue="description" className="min-w-0 gap-6">
      <div className="-mx-(--gutter) overflow-x-auto px-(--gutter) max-sm:[mask-image:linear-gradient(to_right,#000_85%,transparent)]">
        <TabsList variant="line" className="h-auto! w-full min-w-max justify-start gap-0 border-b border-border p-0">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="h-12 flex-none px-3 text-sm font-semibold sm:px-4 after:bottom-[-1px]! data-active:text-text-brand">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} keepMounted className="max-w-prose space-y-4 text-[0.9375rem] leading-relaxed text-text-body data-hidden:hidden">
          <h2 className="sr-only">{tab.label}</h2>
          {tab.body}
        </TabsContent>
      ))}
    </Tabs>
  )
}
