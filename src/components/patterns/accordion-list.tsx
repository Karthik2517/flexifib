"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export type AccordionEntry = { q: string; a: string }

export default function AccordionList({ items }: { items: AccordionEntry[] }) {
  return (
    <Accordion>
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q}>
          <AccordionTrigger className="min-h-14 py-4 text-[0.9375rem] font-semibold hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-text-muted">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
