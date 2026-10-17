import type { Metadata } from "next"
import { DeferredInterestForm } from "@/components/forms/deferred-interest-form"
import { Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { CardGrid, InfoCard } from "@/components/patterns/cards"
import { CtaBand, NotePanel } from "@/components/patterns/callouts"
import { Checklist } from "@/components/patterns/checklist"
import { PageHero } from "@/components/patterns/page-hero"
import { Pathway } from "@/components/patterns/pathway"
import { StatusBadge } from "@/components/patterns/status-badge"
import { getProgramme } from "@/content/programmes"

export const metadata: Metadata = {
  title: "EcoBrush — Rethinking everyday oral care",
  description:
    "EcoBrush is FlexiFib’s proprietary toothbrush programme, currently in research and development. Follow its progress.",
  alternates: { canonical: "/products/ecobrush" },
}

const programme = getProgramme("ecobrush")

export default function EcoBrushPage() {
  return (
    <>
      <PageHero
        badge={<StatusBadge>{programme.statusDetail}</StatusBadge>}
        title="EcoBrush"
        subtitle="Rethinking everyday oral care."
        description={
          <p>
            EcoBrush is FlexiFib’s proprietary toothbrush programme. It is in active research
            and development — it isn’t available to buy until design, testing, compliance and
            manufacturing are genuinely ready.
          </p>
        }
        image={programme.image}
        imagePosition="50% 0%"
        imageAlt="Concept image: a toothbrush in a stone holder beside hemp leaves"
      >
        <div className="flex flex-col gap-5">
          <ButtonLink href="#follow" size="lg" className="w-fit">
            Follow development
          </ButtonLink>
          <p className="w-fit rounded-md bg-surface-tint px-4 py-2.5 text-xs font-semibold text-text-brand">
            Concept visuals only — final design, materials and specifications may change.
          </p>
        </div>
      </PageHero>

      <Section aria-labelledby="goals">
        <SectionHeader id="goals" title="What EcoBrush is trying to achieve" />
        <CardGrid columns={2}>
          <InfoCard title="Hemp-based material platform">
            Develop material solutions suitable for the handle and future components.
          </InfoCard>
          <InfoCard title="Replaceable-head architecture">
            Reduce how much material needs to be replaced during normal use.
          </InfoCard>
          <InfoCard title="Durable everyday performance">
            Balance sustainability ambitions with usability, hygiene and mechanical performance.
          </InfoCard>
          <InfoCard title="Evidence-led end of life">
            Validate disposal, degradation or recycling routes rather than assuming them.
          </InfoCard>
        </CardGrid>
      </Section>

      <Section className="pt-0!" aria-labelledby="pathway">
        <SectionHeader id="pathway" title="Development pathway" />
        <Pathway
          steps={[
            { title: "Concept & requirements" },
            { title: "Material formulation" },
            { title: "Prototype" },
            { title: "Performance & safety testing" },
            { title: "Manufacturing validation" },
            { title: "Commercial launch" },
          ]}
        />
      </Section>

      <Section className="pt-0!" aria-labelledby="status">
        <SectionHeader id="status" title="Current development status" />
        <NotePanel eyebrow="Status: In development">
          <p className="mb-4">Work currently under way:</p>
          <Checklist
            items={[
              "Material and formulation research",
              "Product geometry and replaceable-head engineering",
              "Prototype partner selection and iteration",
              "Testing and validation planning",
              "Future manufacturing pathway",
              "IP assessment before public disclosure",
            ]}
          />
        </NotePanel>
      </Section>

      <Section className="pt-0!" aria-labelledby="claims">
        <SectionHeader
          id="claims"
          title="What we won’t claim yet"
          description="Until there is evidence for the final product, we will not describe EcoBrush as “100% hemp”, “100% biodegradable”, “home compostable”, “antibacterial”, “plastic-free”, “made in Scotland”, “UK-grown hemp” or “patented”, or quote specific carbon or plastic savings."
        />
      </Section>

      <Section className="pt-0!" id="follow" aria-labelledby="follow-heading">
        <CtaBand
          eyebrow="Follow the development"
          title={<span id="follow-heading">Interested in EcoBrush?</span>}
          description="Register for development updates and launch information. For manufacturing or research collaboration, use our business enquiry form."
          action={
            <div className="w-full md:w-[24rem]">
              <DeferredInterestForm programme="ecobrush" inverse />
            </div>
          }
        />
      </Section>
    </>
  )
}
