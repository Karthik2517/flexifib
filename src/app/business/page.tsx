import type { Metadata } from "next"
import { Suspense } from "react"
import packaging from "@/assets/images/packaging.jpg"
import { BusinessForm } from "@/components/forms/business-form"
import { BusinessFormFromUrl } from "@/components/forms/business-form-from-url"
import { Section, SectionHeader } from "@/components/layout/section"
import { Card, CardGrid, InfoCard } from "@/components/patterns/cards"
import { PageHero } from "@/components/patterns/page-hero"
import { inboxes } from "@/content/site"

export const metadata: Metadata = {
  title: "For Business",
  description:
    "Work with FlexiFib: retailers, hospitality, corporate buyers, distributors, manufacturers, packaging buyers, research partners and universities.",
  alternates: { canonical: "/business" },
}

const audiences = [
  ["Retailers", "Stock selected products and future proprietary lines."],
  ["Hotels & hospitality", "Discuss guest amenities and sustainable supply opportunities."],
  ["Corporate buyers", "Employee, gifting and procurement opportunities."],
  ["Distributors", "UK and future international distribution conversations."],
  ["Manufacturers", "Material processing, tooling, prototyping and scale-up."],
  ["Research partners", "Testing, material science and validation collaborations."],
  ["Universities", "Research, facilities, talent and innovation partnerships."],
  ["Packaging buyers", "Discuss a future FlexiPack application or performance need."],
]

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="For business"
        title="Let’s build a better tomorrow, together."
        description={
          <p>
            We welcome conversations with retailers, hotels, corporate buyers, distributors,
            manufacturers, packaging customers, researchers and universities.
          </p>
        }
        image={packaging}
        imageAlt="Moulded fibre packaging and a kraft pouch"
      />

      <Section aria-labelledby="who">
        <SectionHeader id="who" title="Who we want to work with" />
        <CardGrid columns={4}>
          {audiences.map(([title, text]) => (
            <InfoCard key={title} title={title}>
              {text}
            </InfoCard>
          ))}
        </CardGrid>
      </Section>

      <Section className="pt-0!" id="enquiry" aria-labelledby="enquiry-heading">
        <SectionHeader
          id="enquiry-heading"
          title="Start a conversation"
          description="Tell us a little about your organisation and requirement and we’ll route it to the right person."
        />
        <Card className="p-6 sm:p-8 lg:p-10">
          <Suspense fallback={<BusinessForm />}>
            <BusinessFormFromUrl />
          </Suspense>
        </Card>
      </Section>

      <Section className="pt-0!" aria-labelledby="routes">
        <SectionHeader id="routes" title="Prefer email?" />
        <CardGrid columns={4}>
          {[
            ["Wholesale", inboxes.wholesale],
            ["Partnerships", inboxes.partnerships],
            ["Research", inboxes.research],
            ["Customer support", inboxes.support],
          ].map(([title, email]) => (
            <InfoCard key={title} title={title} className="bg-surface-tint shadow-none">
              <a href={`mailto:${email}`} className="break-all underline-offset-3 hover:underline">
                {email}
              </a>
            </InfoCard>
          ))}
        </CardGrid>
      </Section>
    </>
  )
}
