import type { Metadata } from "next"
import { Suspense } from "react"
import { RotateCcw, ShieldCheck, Truck, FileCheck2 } from "lucide-react"
import toothbrush from "@/assets/images/toothbrush.jpg"
import { Section, SectionHeader } from "@/components/layout/section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RowList } from "@/components/patterns/cards"
import { NotePanel } from "@/components/patterns/callouts"
import { PageHero } from "@/components/patterns/page-hero"
import { ProductCard } from "@/components/patterns/product-card"
import { CheckoutCancelledNotice, SortSelect, SortedGrid } from "@/components/patterns/shop-grid"
import { formatPrice, products, shipping } from "@/content/products"

export const metadata: Metadata = {
  title: "Shop the Launch Collection",
  description:
    "Carefully selected everyday products available today — clearly separated from FlexiFib’s proprietary products still in research and development.",
  alternates: { canonical: "/shop" },
}

const productCards = products.map((product) => ({
  slug: product.slug,
  price: product.price,
  node: <ProductCard key={product.slug} product={product} />,
}))

const shopFaq = [
  {
    q: "Where are Launch Collection products made?",
    a: "Launch Collection products are made by external production partners. Each product page states the confirmed country of manufacture once supplier documentation has been verified.",
  },
  {
    q: "Is the Launch Collection the EcoBrush?",
    a: "No. Launch Collection products are sourced products, selected and retailed by FlexiFib. EcoBrush is FlexiFib’s own proprietary toothbrush programme and is still in development.",
  },
  {
    q: "When will EcoBrush be available?",
    a: "We’ll only announce a launch date once design, testing, compliance and manufacturing are genuinely ready. Register your interest on the EcoBrush page to hear first.",
  },
  {
    q: "Can I return an order?",
    a: "Yes. You can cancel or return most items within 14 days of delivery. Our returns page explains the process and any exceptions before you buy.",
  },
]

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Launch Collection"
        description={
          <p>
            Carefully selected products for customers today — clearly separated from
            FlexiFib’s proprietary products still in research and development.
          </p>
        }
        image={toothbrush}
        imageFit="whole"
        imagePosition="50% 18%"
        imageAlt="A toothbrush standing in a stone holder beside hemp leaves"
      >
        <NotePanel eyebrow="Transparency note" className="max-w-xl bg-surface-raised p-5 sm:p-5">
          Every Launch Collection product is manufactured by an external production partner
          and selected and retailed by FlexiFib.
        </NotePanel>
      </PageHero>

      <Section aria-labelledby="shop-heading">
        <Suspense fallback={null}>
          <CheckoutCancelledNotice />
        </Suspense>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="shop-heading" className="text-heading">
            Shop
          </h2>
          <Suspense fallback={<div className="h-11 w-48" aria-hidden="true" />}>
            <SortSelect />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <ul role="list" className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {productCards.map((item) => item.node)}
            </ul>
          }
        >
          <SortedGrid items={productCards} />
        </Suspense>

        <ul className="mt-12 grid gap-6 rounded-xl bg-surface-tint p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
          {[
            {
              icon: Truck,
              title: "UK delivery",
              text: `${formatPrice(shipping.standardRate)}, free over ${formatPrice(shipping.freeThreshold)} · ${shipping.minDays}–${shipping.maxDays} working days`,
            },
            { icon: ShieldCheck, title: "Secure checkout", text: "Hosted payment by Stripe" },
            { icon: RotateCcw, title: "Clear returns", text: "14-day returns, policy visible before purchase" },
            { icon: FileCheck2, title: "Real product data", text: "Materials, origin and care from verified sources" },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-text-brand" />
              <div>
                <p className="eyebrow text-[0.75rem] tracking-[0.06em] text-text-brand">{title}</p>
                <p className="mt-1 text-sm text-text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-0!" aria-labelledby="standards">
        <SectionHeader
          id="standards"
          title="What we confirm before a product goes live"
          description="Every Launch Collection listing passes the same five checks."
        />
        <RowList
          numbered
          rows={[
            { title: "Exact product identity", description: "Supplier, manufacturer, model and country of manufacture are confirmed." },
            { title: "Materials verified", description: "Handle, bristles, packaging and any additives are accurately described." },
            { title: "Safety and compliance", description: "Required product-safety information, traceability and importer obligations are addressed." },
            { title: "Commercial details ready", description: "Price, stock, delivery cost, dispatch time, returns and support are final." },
            { title: "Claims evidenced", description: "No unsupported “biodegradable”, “plastic-free”, “antibacterial” or similar claims." },
          ]}
        />
      </Section>

      <Section className="pt-0!" aria-labelledby="shopping-info">
        <SectionHeader id="shopping-info" title="Shopping information" />
        <Accordion className="rounded-xl border border-border bg-surface-raised px-5 sm:px-6">
          {shopFaq.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="min-h-14 py-4 text-[0.9375rem] font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-text-muted">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </>
  )
}
