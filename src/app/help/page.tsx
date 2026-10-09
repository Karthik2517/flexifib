import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section, SectionHeader } from "@/components/layout/section"
import { PageHero } from "@/components/patterns/page-hero"

export const metadata: Metadata = {
  title: "Help & Legal",
  description:
    "Delivery, returns, FAQs, product safety, privacy, cookies and the terms of buying from FlexiFib.",
  alternates: { canonical: "/help" },
}

const customerHelp = [
  { title: "Shipping & delivery", href: "/help/shipping", text: "Where we deliver, costs, dispatch times and what to expect." },
  { title: "Returns & refunds", href: "/help/returns", text: "Cancellations, how to return an item, exceptions and refund timing." },
  { title: "FAQ", href: "/help/faq", text: "Product status, sourcing, materials, EcoBrush development and orders." },
  { title: "Product safety", href: "/help/product-safety", text: "Care, warnings, traceability, complaints and recall contacts." },
]

const legal = [
  { title: "Privacy notice", href: "/legal/privacy", text: "What personal data we collect, why, who we share it with and your rights." },
  { title: "Cookie policy", href: "/legal/cookies", text: "The cookies and similar technologies we use, and how to control them." },
  { title: "Terms & conditions", href: "/legal/terms", text: "Who we are, ordering, pricing, payment, delivery and liability." },
  { title: "Accessibility statement", href: "/legal/accessibility", text: "Our commitment, known limitations and how to report a problem." },
  { title: "Recruitment privacy notice", href: "/legal/recruitment-privacy", text: "How we use information from job applications and expressions of interest." },
  { title: "Company information", href: "/legal/company", text: "FLEXIFIB ECO LTD, company number and registered details." },
]

function LinkCard({ title, href, text }: { title: string; href: string; text: string }) {
  return (
    <li className="group relative rounded-xl border border-border bg-surface-raised p-6 shadow-(--shadow-card) transition-[box-shadow,transform] duration-(--duration-popover) ease-out-quart hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)">
      <h3 className="text-subheading">
        <Link href={href} className="after:absolute after:inset-0">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-text-muted">{text}</p>
      <ArrowRight
        aria-hidden="true"
        className="absolute top-6 right-6 size-4 text-text-brand transition-transform group-hover:translate-x-0.5"
      />
    </li>
  )
}

export default function HelpPage() {
  return (
    <>
      <PageHero
        tone="inverse"
        eyebrow="Help & legal"
        title="Clear information builds trust."
        description={
          <p>
            Everything you need to understand delivery, returns, privacy, cookies and the terms
            of buying from FlexiFib — before you place an order.
          </p>
        }
      />
      <Section aria-labelledby="customer-help">
        <SectionHeader id="customer-help" title="Customer help" />
        <ul role="list" className="grid gap-4 sm:grid-cols-2">
          {customerHelp.map((item) => (
            <LinkCard key={item.href} {...item} />
          ))}
        </ul>
      </Section>
      <Section className="pt-0!" aria-labelledby="legal">
        <SectionHeader id="legal" title="Legal" />
        <ul role="list" className="grid gap-4 sm:grid-cols-2">
          {legal.map((item) => (
            <LinkCard key={item.href} {...item} />
          ))}
        </ul>
      </Section>
    </>
  )
}
