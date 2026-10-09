import type { Metadata } from "next"
import toothbrush from "@/assets/images/toothbrush.jpg"
import { ContactForm } from "@/components/forms/contact-form"
import { Section, SectionHeader } from "@/components/layout/section"
import { Card, CardGrid, InfoCard } from "@/components/patterns/cards"
import { PageHero } from "@/components/patterns/page-hero"
import { inboxes, site } from "@/content/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact FlexiFib — customer support, orders, partnerships, press and research. FLEXIFIB ECO LTD, registered in Scotland.",
  alternates: { canonical: "/contact" },
}

const teams = [
  ["General enquiries", inboxes.general],
  ["Customer support", inboxes.support],
  ["Orders", inboxes.orders],
  ["Partnerships", inboxes.partnerships],
  ["Press", inboxes.press],
  ["Research", inboxes.research],
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        description={
          <p>
            Whether you’re a customer, business, manufacturer, researcher, investor or
            journalist, here’s how to reach the right part of FlexiFib.
          </p>
        }
        image={toothbrush}
        imageAlt="A toothbrush in a stone holder"
      />

      <Section aria-labelledby="teams">
        <SectionHeader id="teams" title="Contact the right team" />
        <CardGrid columns={3}>
          {teams.map(([title, email]) => (
            <InfoCard key={title} title={title}>
              <a href={`mailto:${email}`} className="break-all underline-offset-3 hover:underline">
                {email}
              </a>
            </InfoCard>
          ))}
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="message">
        <SectionHeader
          id="message"
          title="Send a message"
          description="We aim to reply within two working days."
        />
        <Card className="p-6 sm:p-8 lg:p-10">
          <ContactForm />
        </Card>
      </Section>

      <Section className="pt-0!" aria-labelledby="company">
        <SectionHeader id="company" title="Company information" />
        <div className="rounded-xl bg-surface-tint p-6 sm:p-8">
          <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-[12rem_1fr]">
            {[
              ["Legal name", site.company.legalName],
              ["Trading name", site.name],
              ["Company number", site.company.number],
              ["Registered in", site.company.jurisdiction],
              [
                "Registered office",
                site.company.registeredOffice ?? "Available on the Companies House register",
              ],
              ["Website", site.url.replace("https://", "")],
            ].map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="font-bold text-ink-900">{label}</dt>
                <dd className="text-ink-700">{value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={site.company.companiesHouseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-text-brand underline underline-offset-3"
          >
            View on Companies House
          </a>
        </div>
      </Section>
    </>
  )
}
