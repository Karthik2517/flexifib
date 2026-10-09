import type { Metadata } from "next"
import Image from "next/image"
import heroEdinburgh from "@/assets/images/hero-edinburgh.jpg"
import toothbrush from "@/assets/images/toothbrush.jpg"
import { Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { CardGrid } from "@/components/patterns/cards"
import { NotePanel } from "@/components/patterns/callouts"
import { PageHero } from "@/components/patterns/page-hero"
import { ProgrammeCard } from "@/components/patterns/programme-card"
import { StatusBadge } from "@/components/patterns/status-badge"
import { programmes, statusLabels } from "@/content/programmes"

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "FlexiFib’s product platform: the Launch Collection available today, and the EcoBrush, HempSoft and FlexiPack programmes in development.",
  alternates: { canonical: "/products" },
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our products"
        title="Better materials. Greater possibilities."
        description={
          <p>
            FlexiFib’s product platform combines products you can buy today with proprietary
            programmes still in development — and every one is clearly labelled with its
            current status.
          </p>
        }
        image={heroEdinburgh}
        imageAlt="Raw hemp fibre and a toothbrush on a windowsill overlooking Edinburgh"
        imagePosition="75% center"
      />

      <Section aria-labelledby="available">
        <SectionHeader id="available" title="Available today" />
        <div className="grid overflow-hidden rounded-xl border border-border bg-surface-raised shadow-(--shadow-card) md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
          <div className="relative aspect-[4/3] bg-sand-200 md:aspect-auto">
            <Image
              src={toothbrush}
              alt="A Launch Collection toothbrush in a stone holder"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 36vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col p-6 sm:p-10">
            <StatusBadge>Launch Collection · {statusLabels.available}</StatusBadge>
            <h3 className="mt-4 text-heading">Products you can buy today</h3>
            <p className="mt-3 max-w-xl text-text-muted">
              Externally manufactured products, selected and retailed by FlexiFib. They let us
              serve customers now and learn from real feedback — while staying clearly
              separate from our proprietary research and development.
            </p>
            <ButtonLink href="/shop" className="mt-8 w-fit">
              Shop Launch Collection
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="warm" aria-labelledby="platform">
        <SectionHeader
          id="platform"
          title="Proprietary programmes in development"
          description="None of these products are available to buy yet. Each page explains what the programme is exploring and what still has to be proven."
        />
        <CardGrid columns={3}>
          {programmes.map((programme) => (
            <ProgrammeCard key={programme.slug} programme={programme} showSummary={false} />
          ))}
        </CardGrid>
      </Section>

      <Section aria-label="Status labels">
        <NotePanel eyebrow="How to read our labels" title="A future product will never look purchasable.">
          <p>
            Every product and concept on this site carries a status label —{" "}
            {Object.values(statusLabels).join(", ")}. Only products marked “Available now”
            can be added to your basket.
          </p>
        </NotePanel>
      </Section>
    </>
  )
}
