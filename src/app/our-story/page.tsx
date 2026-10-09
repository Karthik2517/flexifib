import type { Metadata } from "next"
import heroEdinburgh from "@/assets/images/hero-edinburgh.jpg"
import { Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { CardGrid, InfoCard } from "@/components/patterns/cards"
import { CtaBand } from "@/components/patterns/callouts"
import { PageHero } from "@/components/patterns/page-hero"
import { StatusBadge } from "@/components/patterns/status-badge"

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "FlexiFib began with a question: can everyday products be designed around better material choices? Why hemp, why Scotland, and how the business works today.",
  alternates: { canonical: "/our-story" },
}

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A simple idea. A bigger purpose."
        description={
          <p>
            FlexiFib began with a question: can everyday products be designed around better
            material choices? We are exploring hemp as a platform for future oral-care,
            household and packaging applications.
          </p>
        }
        image={heroEdinburgh}
        imageAlt="A windowsill in Edinburgh with hemp fibre and a toothbrush"
        imagePosition="80% center"
      />

      <Section aria-labelledby="why-started">
        <SectionHeader
          id="why-started"
          title="Why we started"
          description="Many products are used for minutes but leave material waste behind for far longer. FlexiFib was created to investigate practical alternatives that still meet the performance, price and usability expectations of everyday customers."
          className="mb-0!"
        />
      </Section>

      <Section className="pt-0!" aria-label="Why hemp and why Scotland">
        <CardGrid columns={2}>
          <InfoCard title="Why hemp" size="large">
            Hemp offers strong natural fibres and a wide range of possible applications.
            We’re interested in where those fibres can be engineered into commercially useful
            materials.
          </InfoCard>
          <InfoCard title="Why Scotland" size="large">
            Scotland offers a strong environment for sustainability, research, materials
            innovation and future UK-based supply-chain development. Local sourcing and
            manufacturing are ambitions — we’ll say so clearly when they are in place.
          </InfoCard>
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="how-it-works">
        <SectionHeader id="how-it-works" title="How the business works today" />
        <CardGrid columns={2}>
          <InfoCard
            title="Sell selected products now"
            size="large"
            eyebrow={<StatusBadge>Commercial activity</StatusBadge>}
          >
            Launch Collection products generate early revenue and real customer evidence.
          </InfoCard>
          <InfoCard
            title="Build differentiated products next"
            size="large"
            eyebrow={<StatusBadge>Proprietary development</StatusBadge>}
          >
            EcoBrush, HempSoft and FlexiPack are developed through R&amp;D, validation and
            future manufacturing pathways.
          </InfoCard>
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="values">
        <SectionHeader id="values" title="What we stand for" />
        <CardGrid columns={4}>
          <InfoCard title="Practical">Sustainability must still work in everyday life.</InfoCard>
          <InfoCard title="Transparent">We say what is real today and what is still being developed.</InfoCard>
          <InfoCard title="Innovative">We build technical differentiation rather than rebranding generic products.</InfoCard>
          <InfoCard title="Commercial">A viable business, not just an environmental idea.</InfoCard>
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="explore">
        <CtaBand
          eyebrow="From idea to material platform"
          title={<span id="explore">Explore what FlexiFib is building.</span>}
          description="See the technical pathway and product programmes in detail."
          action={
            <ButtonLink href="/innovation" variant="inverse" size="lg">
              Explore innovation
            </ButtonLink>
          }
        />
      </Section>
    </>
  )
}
