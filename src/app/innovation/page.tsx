import type { Metadata } from "next"
import heroEdinburgh from "@/assets/images/hero-edinburgh.jpg"
import { Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { CardGrid, InfoCard } from "@/components/patterns/cards"
import { CtaBand } from "@/components/patterns/callouts"
import { MediaSplit } from "@/components/patterns/media-split"
import { PageHero } from "@/components/patterns/page-hero"
import { Pathway } from "@/components/patterns/pathway"
import { ProgrammeCard } from "@/components/patterns/programme-card"
import { programmes } from "@/content/programmes"

export const metadata: Metadata = {
  title: "Innovation & R&D",
  description:
    "How FlexiFib is exploring hemp fibres and next-generation biocomposites for practical, high-performance everyday products — shown honestly, stage by stage.",
  alternates: { canonical: "/innovation" },
}

export default function InnovationPage() {
  return (
    <>
      <PageHero
        eyebrow="Innovation & R&D"
        title="Innovation for a better tomorrow."
        description={
          <p>
            FlexiFib is exploring how hemp fibres and next-generation biocomposites can be
            turned into practical, high-performance everyday products. Here is our development
            pathway — shown honestly, without presenting future work as already complete.
          </p>
        }
        image={heroEdinburgh}
        imageAlt="Hemp fibre, laboratory glassware and natural materials on a sunlit windowsill"
        imagePosition="80% center"
      >
        <ButtonLink href="/products/ecobrush" size="lg">
          Explore EcoBrush
        </ButtonLink>
      </PageHero>

      <Section aria-labelledby="challenge">
        <SectionHeader
          id="challenge"
          title="The challenge"
          description="Many everyday products still depend on fossil-based plastics or materials with complex supply chains. FlexiFib’s opportunity is to investigate where hemp fibres and bio-based material systems can deliver useful performance in consumer and packaging applications."
          className="mb-0!"
        />
      </Section>

      <Section className="pt-0!" aria-labelledby="pathway">
        <SectionHeader id="pathway" title="From plant to product" description="Our development pathway." />
        <Pathway
          variant="numeral"
          steps={[
            { title: "Hemp fibre", description: "Characterise raw fibre and its intended application." },
            { title: "Formulation", description: "Develop compatible material systems and processing routes." },
            { title: "Prototype", description: "Translate material behaviour into practical product geometry." },
            { title: "Test & validate", description: "Performance, safety, durability and end-of-life evidence." },
            { title: "Protect & scale", description: "IP strategy, manufacturing pathway and commercial scale-up." },
          ]}
        />
      </Section>

      <Section className="pt-0!" aria-labelledby="programmes">
        <SectionHeader id="programmes" title="Three product programmes" />
        <CardGrid columns={3}>
          {programmes.map((programme) => (
            <ProgrammeCard key={programme.slug} programme={programme} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="raised" aria-labelledby="why-hemp">
        <MediaSplit image={heroEdinburgh} imageAlt="Raw hemp fibre beside a glass flask">
          <p className="eyebrow mb-3 text-text-brand">Why hemp?</p>
          <h2 id="why-hemp" className="text-heading">
            A promising fibre platform — not a magic material.
          </h2>
          <p className="mt-4 text-text-muted">
            Hemp is relevant because of fibre availability and its potential as a
            reinforcement in material systems. The applications we describe are areas of
            research. We don’t turn general properties of hemp into claims about a finished
            product — those need evidence for that exact product.
          </p>
          <ButtonLink href="/sustainability" variant="outline" className="mt-8">
            Read Sustainability &amp; Materials
          </ButtonLink>
        </MediaSplit>
      </Section>

      <Section aria-labelledby="evidence">
        <SectionHeader id="evidence" title="Evidence before claims" />
        <CardGrid columns={2}>
          <InfoCard title="Material evidence">
            Composition, supplier declarations, formulation records and test reports.
          </InfoCard>
          <InfoCard title="Performance evidence">
            Durability, mechanical performance, oral-care suitability and other relevant tests.
          </InfoCard>
          <InfoCard title="Environmental evidence">
            End-of-life conditions, biodegradation or compostability evidence, and lifecycle
            information.
          </InfoCard>
          <InfoCard title="IP discipline">
            Confidential formulations stay private; patents or design rights are described only
            once genuinely filed or granted.
          </InfoCard>
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="reality">
        <CtaBand
          eyebrow="Current development status"
          title={<span id="reality">We show reality clearly.</span>}
          description="Every programme carries a status — Concept, In development, Prototype, Testing or Planned. A credible early-stage status is stronger than presenting unfinished work as complete."
        />
      </Section>
    </>
  )
}
