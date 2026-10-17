"use client"

import dynamic from "next/dynamic"
import { DeferredMount } from "@/components/forms/deferred-mount"
import type { AccordionEntry } from "./accordion-list"

const AccordionList = dynamic(() => import("./accordion-list"))

function NativeDisclosureList({ items }: { items: AccordionEntry[] }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.q} className="not-last:border-b">
          <summary className="flex min-h-14 cursor-pointer items-center py-4 text-[0.9375rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            {item.q}
          </summary>
          <p className="pb-5 text-sm text-text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

export function DeferredAccordion({ items }: { items: AccordionEntry[] }) {
  return (
    <DeferredMount fallback={<NativeDisclosureList items={items} />}>
      <AccordionList items={items} />
    </DeferredMount>
  )
}
