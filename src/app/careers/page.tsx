import type { Metadata } from "next"
import { ApplicationForm } from "@/components/forms/application-form"
import { Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { Card, CardGrid, InfoCard } from "@/components/patterns/cards"
import { CtaBand } from "@/components/patterns/callouts"
import { PageHero } from "@/components/patterns/page-hero"
import { Pathway } from "@/components/patterns/pathway"
import { StatusBadge } from "@/components/patterns/status-badge"
import {
  contributionAreas,
  reasonsToJoin,
  recruitmentPrinciples,
  recruitmentSteps,
  vacancies,
} from "@/content/careers"
import { inboxes } from "@/content/site"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at FlexiFib — an early-stage Scottish materials and consumer-products company. Current opportunities and open applications.",
  alternates: { canonical: "/careers" },
}

function BrandMark() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border bg-surface-raised p-8 shadow-(--shadow-card) sm:p-10 lg:min-h-[22rem]">
      <svg viewBox="0 0 200 200" role="img" aria-label="FlexiFib mark" className="w-40 sm:w-48">
        <circle cx="100" cy="100" r="88" fill="var(--color-sage-100)" />
        <rect x="92" y="40" width="16" height="130" rx="3" fill="var(--color-forest-900)" transform="rotate(-28 100 105)" />
        <rect x="92" y="40" width="16" height="130" rx="3" fill="var(--color-sand-300)" transform="rotate(28 100 105)" />
        <circle cx="139" cy="45" r="18" fill="var(--color-forest-900)" />
      </svg>
      <p className="eyebrow mt-6 text-text-brand">Materials · Products · Impact</p>
    </div>
  )
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        badge={<StatusBadge>Careers · Early-stage company</StatusBadge>}
        title="Careers at FlexiFib"
        subtitle="Help us build better materials for everyday life."
        description={
          <p>
            FlexiFib is an early-stage Scottish materials and consumer-products company exploring
            hemp-based innovation across oral care, household products and packaging. We welcome
            interest from people who want to contribute to practical, evidence-led sustainability.
          </p>
        }
        aside={<BrandMark />}
      >
        <ButtonLink href="#opportunities" size="lg">
          View opportunities
        </ButtonLink>
      </PageHero>

      <Section aria-labelledby="why">
        <SectionHeader
          id="why"
          title="Why work with FlexiFib?"
          description="A genuine early-stage opportunity: help shape products, systems and partnerships from the beginning."
        />
        <CardGrid columns={4}>
          {reasonsToJoin.map((reason) => (
            <InfoCard key={reason.title} title={reason.title}>
              {reason.description}
            </InfoCard>
          ))}
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="contribute">
        <SectionHeader id="contribute" title="Where you could contribute" />
        <CardGrid columns={3}>
          {contributionAreas.map((area) => (
            <InfoCard key={area.value} title={area.label}>
              {area.description}
            </InfoCard>
          ))}
        </CardGrid>
      </Section>

      <Section className="pt-0!" id="opportunities" aria-labelledby="opportunities-heading">
        <SectionHeader id="opportunities-heading" title="Current opportunities" />
        {vacancies.length === 0 ? (
          <div className="flex flex-col gap-6 rounded-xl bg-surface-tint p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-2 text-text-brand">Current status</p>
              <h3 className="text-subheading">No live vacancies at present.</h3>
              <p className="mt-2 text-sm text-ink-700">
                We only advertise genuine roles, so there’s nothing listed right now. We still
                welcome expressions of interest from people whose experience fits our future
                needs.
              </p>
            </div>
            <ButtonLink href="#apply" variant="outline" className="shrink-0">
              Send an open application
            </ButtonLink>
          </div>
        ) : (
          <ul role="list" className="flex flex-col gap-4">
            {vacancies.map((vacancy) => (
              <Card as="li" key={vacancy.slug} className="p-6 sm:p-8">
                <StatusBadge>{vacancy.area}</StatusBadge>
                <h3 className="mt-3 text-subheading">{vacancy.title}</h3>
                <p className="mt-1 text-sm font-semibold text-ink-900">
                  {[vacancy.type, vacancy.location, vacancy.salary].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-3 text-sm text-text-muted">{vacancy.summary}</p>
                {vacancy.closingDate && (
                  <p className="mt-3 text-xs text-text-muted">Closing date: {vacancy.closingDate}</p>
                )}
                <ButtonLink href="#apply" size="sm" className="mt-5">
                  Apply
                </ButtonLink>
              </Card>
            ))}
          </ul>
        )}

        <Card className="mt-6 flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-2 text-text-brand">Students, researchers &amp; collaborators</p>
            <h3 className="text-subheading">Interested in sustainable materials or product innovation?</h3>
            <p className="mt-2 text-sm text-text-muted">
              We welcome interest from students, researchers, universities and early-career
              specialists in materials science, consumer products, sustainable packaging,
              manufacturing and commercialisation.
            </p>
          </div>
          <ButtonLink href="/business?interest=materials#enquiry" variant="outline" className="shrink-0">
            Research &amp; collaboration
          </ButtonLink>
        </Card>
      </Section>

      <Section className="pt-0!" id="apply" aria-labelledby="apply-heading">
        <SectionHeader
          id="apply-heading"
          title="Open application"
          description={`Your application goes directly to ${inboxes.careers}. We reply to every relevant application.`}
        />
        <Card className="p-6 sm:p-8 lg:p-10">
          <ApplicationForm />
        </Card>
      </Section>

      <Section className="pt-0!" aria-labelledby="expect">
        <SectionHeader id="expect" title="What to expect when we recruit" />
        <Pathway steps={recruitmentSteps} />
      </Section>

      <Section className="pt-0!" aria-labelledby="principles">
        <SectionHeader id="principles" title="Our recruitment principles" />
        <ul role="list" className="grid gap-3 sm:grid-cols-2">
          {recruitmentPrinciples.map((principle) => (
            <Card as="li" key={principle} className="flex items-center gap-3 px-5 py-4">
              <Check aria-hidden="true" className="size-4 shrink-0 text-text-brand" strokeWidth={2.5} />
              <span className="text-sm font-semibold text-ink-900">{principle}</span>
            </Card>
          ))}
        </ul>
      </Section>

      <Section className="pt-0!" aria-labelledby="no-role">
        <CtaBand
          eyebrow="Work with FlexiFib"
          title={<span id="no-role">Don’t see the right role yet?</span>}
          description={`Send an expression of interest or email ${inboxes.careers}. We’ll contact suitable applicants when a genuine opportunity arises.`}
          action={
            <ButtonLink href="#apply" variant="inverse" size="lg">
              Open application
            </ButtonLink>
          }
        />
      </Section>
    </>
  )
}
