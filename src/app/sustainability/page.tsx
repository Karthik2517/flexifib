import type { Metadata } from "next"
import hempField from "@/assets/images/hemp-field.jpg"
import { Section, SectionHeader } from "@/components/layout/section"
import { CardGrid, InfoCard } from "@/components/patterns/cards"
import { CtaBand, NotePanel } from "@/components/patterns/callouts"
import { Checklist } from "@/components/patterns/checklist"
import { PageHero } from "@/components/patterns/page-hero"
import { Pathway } from "@/components/patterns/pathway"
import { guardedClaims, verifiedToday, workingTowards } from "@/content/sustainability"

export const metadata: Metadata = {
  title: "Sustainability & Materials",
  description:
    "FlexiFib treats sustainability as an evidence discipline: what we can verify today, what we are working towards, and how a claim becomes publishable.",
  alternates: { canonical: "/sustainability" },
}

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        tone="inverse"
        eyebrow="Sustainability & materials"
        title={
          <>
            A more sustainable future,
            <br className="hidden xl:block" /> built on better materials.
          </>
        }
        description={
          <p>
            We treat sustainability as an evidence discipline, not a marketing adjective. This
            page separates what we can verify today from what we are still working towards.
          </p>
        }
        image={hempField}
        imageAlt="A field of tall hemp plants growing under an open sky"
      />

      <Section aria-label="Verified today and working towards">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-heading">What we can verify today</h2>
            <Checklist items={verifiedToday} className="mt-6" />
          </div>
          <div>
            <h2 className="text-heading">What we are working towards</h2>
            <Checklist items={workingTowards} variant="open" className="mt-6" />
          </div>
        </div>
      </Section>

      <Section className="pt-0!" aria-labelledby="guardrail">
        <SectionHeader
          id="guardrail"
          title="Our green-claims guardrail"
          description="We will not use any of these claims about a product until we hold evidence for that exact product and material."
        />
        <NotePanel eyebrow="Not published without evidence">
          <ul className="flex flex-wrap gap-2">
            {guardedClaims.map((claim) => (
              <li
                key={claim}
                className="rounded-full border border-surface-tint-strong bg-surface-raised px-3 py-1 text-sm text-text-body"
              >
                {claim}
              </li>
            ))}
          </ul>
        </NotePanel>
      </Section>

      <Section className="pt-0!" aria-labelledby="publishable">
        <SectionHeader id="publishable" title="How a claim becomes publishable" />
        <Pathway
          variant="numeral"
          steps={[
            { title: "Define the exact claim" },
            { title: "Identify the evidence needed" },
            { title: "Verify the exact product or material" },
            { title: "Record the source and test" },
            { title: "Publish with appropriate qualification" },
          ]}
        />
      </Section>

      <Section className="pt-0!" aria-labelledby="reporting">
        <SectionHeader
          id="reporting"
          title="Future impact reporting"
          description="As our products mature, we intend to report on each of these areas."
        />
        <CardGrid columns={5}>
          <InfoCard title="Material inputs">What materials, and in what percentages?</InfoCard>
          <InfoCard title="Product lifespan">How long does the product realistically last?</InfoCard>
          <InfoCard title="Transport">Where do materials and products travel from?</InfoCard>
          <InfoCard title="Manufacturing">What processes and energy inputs are used?</InfoCard>
          <InfoCard title="End of life">What happens in realistic disposal conditions?</InfoCard>
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="principle">
        <CtaBand
          eyebrow="Our principle"
          title={<span id="principle">Honesty is part of sustainability.</span>}
          description="If the evidence changes, this website changes. If a material has limitations, we explain them. Transparency is more credible than broad environmental promises."
        />
      </Section>
    </>
  )
}
