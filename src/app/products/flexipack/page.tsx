import type { Metadata } from "next"
import { Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { CardGrid, InfoCard } from "@/components/patterns/cards"
import { CtaBand } from "@/components/patterns/callouts"
import { MediaSplit } from "@/components/patterns/media-split"
import { PageHero } from "@/components/patterns/page-hero"
import { StatusBadge } from "@/components/patterns/status-badge"
import { getProgramme } from "@/content/programmes"

export const metadata: Metadata = {
  title: "FlexiPack — Next-generation packaging solutions",
  description:
    "FlexiPack is FlexiFib’s B2B programme exploring hemp fibres and biocomposites for packaging applications.",
  alternates: { canonical: "/products/flexipack" },
}

const programme = getProgramme("flexipack")

const toProve = [
  ["Material formulation", "Performance must suit the intended packaging application."],
  ["Processability", "Determine suitable moulding, extrusion or converting routes."],
  ["Barrier & durability", "Validate strength, moisture and barrier needs, and handling performance."],
  ["Food contact", "Only claim food-contact suitability after the applicable testing and compliance."],
  ["End of life", "Substantiate recyclability, compostability or biodegradation for the exact material system."],
  ["Economics", "Unit cost and scale must work for real B2B customers."],
]

export default function FlexiPackPage() {
  return (
    <>
      <PageHero
        badge={<StatusBadge>{programme.statusDetail}</StatusBadge>}
        title="FlexiPack"
        subtitle="Next-generation packaging solutions."
        description={
          <p>
            FlexiPack is FlexiFib’s B2B programme exploring hemp fibres and biocomposite
            systems for packaging applications. We’re keen to talk to manufacturers and
            buyers — and honest that the work is at the research and development stage.
          </p>
        }
        image={programme.image}
        imageAlt="Concept image: moulded fibre food containers and a kraft pouch"
      >
        <ButtonLink href="/business?interest=flexipack#enquiry" size="lg">
          Discuss a packaging requirement
        </ButtonLink>
      </PageHero>

      <Section aria-labelledby="applications">
        <SectionHeader id="applications" title="Potential applications" />
        <CardGrid columns={5}>
          <InfoCard title="Protective packaging">Moulded protective forms</InfoCard>
          <InfoCard title="E-commerce">Mailing and fulfilment formats</InfoCard>
          <InfoCard title="Consumer products">Trays, inserts and containers</InfoCard>
          <InfoCard title="Hospitality">Food-service opportunities, subject to testing</InfoCard>
          <InfoCard title="Industrial">Selected protective and component packaging</InfoCard>
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="prove">
        <MediaSplit image={programme.image} imageAlt="Moulded fibre packaging samples">
          <p className="eyebrow mb-3 text-text-brand">A more responsible research approach</p>
          <h2 id="prove" className="text-heading">
            What FlexiPack needs to prove
          </h2>
          <dl className="mt-6 divide-y divide-border">
            {toProve.map(([title, text]) => (
              <div key={title} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <dt className="text-sm font-bold text-ink-900">{title}</dt>
                <dd className="text-sm text-text-muted">{text}</dd>
              </div>
            ))}
          </dl>
        </MediaSplit>
      </Section>

      <Section className="pt-0!" aria-labelledby="challenge">
        <CtaBand
          eyebrow="For business"
          title={<span id="challenge">Have a packaging challenge?</span>}
          description="Tell us about the application, volumes, performance requirements and target timeline. We’ll be straightforward about what is possible today and what still needs validation."
          action={
            <ButtonLink href="/business?interest=flexipack#enquiry" variant="inverse" size="lg">
              Start a conversation
            </ButtonLink>
          }
        />
      </Section>
    </>
  )
}
