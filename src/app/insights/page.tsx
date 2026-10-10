import type { Metadata } from "next"
import Image from "next/image"
import researchNotebook from "@/assets/images/research-notebook.jpg"
import { NewsletterForm } from "@/components/forms/email-capture"
import { Section, SectionHeader } from "@/components/layout/section"
import { CardGrid, InfoCard, RowList } from "@/components/patterns/cards"
import { PageHero } from "@/components/patterns/page-hero"
import { StatusBadge } from "@/components/patterns/status-badge"
import { insightPillars, insights } from "@/content/insights"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Ideas, research and progress from FlexiFib — fewer, better articles on materials, product development and sustainability.",
  alternates: { canonical: "/insights" },
}

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Ideas, research and progress."
        description={
          <p>
            Articles on materials, product development and sustainability. We publish fewer,
            better pieces — with real technical value and clearly sourced claims.
          </p>
        }
        image={researchNotebook}
        imageAlt="An open notebook and pen on a wooden desk beside trailing leaves"
      />

      <Section aria-labelledby="pillars">
        <SectionHeader id="pillars" title="What we write about" />
        <CardGrid columns={4}>
          {insightPillars.map((pillar) => (
            <InfoCard key={pillar.title} title={pillar.title}>
              {pillar.description}
            </InfoCard>
          ))}
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="upcoming">
        <SectionHeader
          id="upcoming"
          title="Coming soon"
          description="Our first articles are being researched and reviewed. Join the updates list to hear when they’re published."
        />
        <ul role="list" className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {insights.map((insight) => (
            <li
              key={insight.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface-raised shadow-(--shadow-card)"
            >
              <div className="relative aspect-[16/9] bg-sand-200">
                <Image
                  src={insight.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <StatusBadge>{insight.pillar}</StatusBadge>
                <h3 className="mt-3 text-subheading">{insight.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{insight.summary}</p>
                <p className="mt-auto pt-5 text-xs font-semibold tracking-wide text-text-accent uppercase">
                  In preparation
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-xl">
          <p className="mb-3 text-sm font-semibold">Get new articles by email</p>
          <NewsletterForm />
        </div>
      </Section>

      <Section className="pt-0!" aria-labelledby="rules">
        <SectionHeader id="rules" title="Our editorial standards" />
        <RowList
          rows={[
            { title: "Evidence first", description: "Claims link to trustworthy sources, and we separate company data from general research." },
            { title: "No invented authority", description: "No fake studies, quotes, awards or media coverage." },
            { title: "Useful over frequent", description: "We publish when there is something genuinely worth saying." },
            { title: "Connected", description: "Articles link to the relevant product, programme and sustainability pages." },
            { title: "Written for readers", description: "Clear titles and headings, written naturally — never keyword-stuffed." },
          ]}
        />
      </Section>
    </>
  )
}
