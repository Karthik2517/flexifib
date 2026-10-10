import type { Metadata } from "next"
import { Container } from "@/components/layout/section"
import { PageHero } from "@/components/patterns/page-hero"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { formatPrice, shipping } from "@/content/products"
import { inboxes } from "@/content/site"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about FlexiFib product status, sourcing, materials, EcoBrush development and orders.",
  alternates: { canonical: "/help/faq" },
}

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Products & status",
    items: [
      {
        q: "What can I buy today?",
        a: "The Launch Collection — carefully selected products made by external production partners and retailed by FlexiFib. Everything else on the site is clearly labelled as in development or a future programme.",
      },
      {
        q: "Is the Launch Collection the same as EcoBrush?",
        a: "No. EcoBrush is FlexiFib’s own proprietary toothbrush programme and is still in development. Launch Collection toothbrushes are sourced products.",
      },
      {
        q: "When will EcoBrush, HempSoft or FlexiPack be available?",
        a: "We’ll only announce dates once design, testing, compliance and manufacturing are genuinely ready. Register interest on each programme page to hear first.",
      },
    ],
  },
  {
    title: "Materials & claims",
    items: [
      {
        q: "Where are Launch Collection products made?",
        a: "By external production partners. Each product page shows the confirmed country of manufacture once supplier documentation has been verified.",
      },
      {
        q: "Are your products biodegradable or plastic-free?",
        a: "We only make claims like these when we hold evidence for the exact product. If a product page doesn’t make a claim, we don’t yet have the evidence to make it.",
      },
    ],
  },
  {
    title: "Orders",
    items: [
      {
        q: "How much is delivery?",
        a: `UK delivery is ${formatPrice(shipping.standardRate)}, or free on orders of ${formatPrice(shipping.freeThreshold)} or more. Orders usually arrive within ${shipping.minDays}–${shipping.maxDays} working days.`,
      },
      {
        q: "How do I pay?",
        a: "Checkout is hosted by Stripe. FlexiFib never sees or stores your card details.",
      },
      {
        q: "How do I change or cancel an order?",
        a: `Email ${inboxes.orders} as soon as possible with your order reference. You can also cancel within 14 days of delivery — see our returns page.`,
      },
    ],
  },
]

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  }

  return (
    <>
      <PageHero
        tone="inverse"
        eyebrow="Customer help"
        title="Frequently asked questions"
        description={<p>Quick answers about our products, materials and orders.</p>}
      />
      <Container className="section-y max-w-[calc(var(--container-prose)+var(--gutter)*2)]">
        {groups.map((group) => (
          <section key={group.title} className="mb-12 last:mb-0">
            <h2 className="text-subheading">{group.title}</h2>
            <Accordion data-card="" className="mt-4 rounded-xl border border-border bg-surface-raised px-5 sm:px-6">
              {group.items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="min-h-14 py-4 text-[0.9375rem] font-semibold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-text-muted">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
        <p className="mt-12 text-sm text-text-muted">
          Can’t find your answer?{" "}
          <a href={`mailto:${inboxes.support}`} className="font-semibold text-text-brand underline underline-offset-3">
            Email {inboxes.support}
          </a>
        </p>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
