import type { Metadata } from "next"
import { InterestForm } from "@/components/forms/email-capture"
import { Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { CardGrid, InfoCard, RowList } from "@/components/patterns/cards"
import { CtaBand, NotePanel } from "@/components/patterns/callouts"
import { PageHero } from "@/components/patterns/page-hero"
import { StatusBadge } from "@/components/patterns/status-badge"
import { getProgramme } from "@/content/programmes"

export const metadata: Metadata = {
  title: "HempSoft — A softer future for everyday essentials",
  description:
    "HempSoft is FlexiFib’s future programme exploring hemp-based tissue and household paper products.",
  alternates: { canonical: "/products/hempsoft" },
}

const programme = getProgramme("hempsoft")

export default function HempSoftPage() {
  return (
    <>
      <PageHero
        badge={<StatusBadge>{programme.statusDetail}</StatusBadge>}
        title="HempSoft"
        subtitle="A softer future for everyday essentials."
        description={
          <p>
            HempSoft is FlexiFib’s future programme exploring whether hemp fibres can be
            developed into useful tissue and household paper products. It is a research
            direction, not a product available to buy.
          </p>
        }
        image={programme.image}
        imageAlt="Concept image: a tissue box, paper towels and a roll"
      >
        <ButtonLink href="#follow" size="lg" className="w-fit">
            Follow HempSoft
          </ButtonLink>
      </PageHero>

      <Section aria-labelledby="applications">
        <SectionHeader id="applications" title="Potential applications" />
        <CardGrid columns={5} layout="compact">
          <InfoCard title="Toilet tissue">Household hygiene</InfoCard>
          <InfoCard title="Kitchen roll">Everyday cleaning</InfoCard>
          <InfoCard title="Facial tissue">Soft-use applications</InfoCard>
          <InfoCard title="Paper towels">Household and commercial</InfoCard>
          <InfoCard title="Hospitality supply">A future B2B opportunity</InfoCard>
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="research">
        <SectionHeader id="research" title="What must be researched before launch" />
        <RowList
          rows={[
            { title: "Fibre processing", description: "Can hemp fibres be processed to the required softness, strength and consistency?" },
            { title: "Product performance", description: "Absorbency, wet strength, dust and lint, and user comfort must all be validated." },
            { title: "Manufacturing route", description: "Identify suitable pulping, converting and finishing processes and partners." },
            { title: "End-of-life evidence", description: "We won’t assume biodegradability or compostability without evidence for the finished product." },
            { title: "Commercial economics", description: "Cost, yield, scale and what customers are willing to pay must support a viable product." },
          ]}
        />
      </Section>

      <Section className="pt-0!" aria-label="Current status">
        <NotePanel eyebrow="Current status" title="Future product programme">
          HempSoft has no price, stock, performance claims or launch date. Imagery on this page
          is conceptual and shows the research direction only.
        </NotePanel>
      </Section>

      <Section className="pt-0!" aria-labelledby="platform">
        <SectionHeader
          id="platform"
          title="Why HempSoft matters to the wider FlexiFib platform"
          description="HempSoft shows that FlexiFib’s long-term opportunity is broader than one toothbrush. The same material strategy can be explored across several high-frequency everyday product categories — for consumers and for business customers."
        />
      </Section>

      <Section className="pt-0!" id="follow" aria-labelledby="follow-heading">
        <CtaBand
          eyebrow="Follow the research"
          title={<span id="follow-heading">Want to hear about HempSoft?</span>}
          description="We’ll only email when there is genuine research progress to share."
          action={
            <div className="w-full md:w-[24rem]">
              <InterestForm programme="hempsoft" inverse />
            </div>
          }
        />
      </Section>
    </>
  )
}
