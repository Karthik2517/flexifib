import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import heroEdinburgh from "@/assets/images/hero-edinburgh.jpg"
import toothbrush from "@/assets/images/toothbrush.jpg"
import labBench from "@/assets/images/lab-bench.jpg"
import fibreTwine from "@/assets/images/fibre-twine.jpg"
import { NewsletterForm } from "@/components/forms/email-capture"
import { Container, Section, SectionHeader } from "@/components/layout/section"
import { ButtonLink } from "@/components/patterns/button-link"
import { Card, CardGrid, InfoCard } from "@/components/patterns/cards"
import { Checklist } from "@/components/patterns/checklist"
import { MediaSplit } from "@/components/patterns/media-split"
import { PageHero } from "@/components/patterns/page-hero"
import { Pathway } from "@/components/patterns/pathway"
import { ProgrammeCard } from "@/components/patterns/programme-card"
import { StatusBadge } from "@/components/patterns/status-badge"
import { insights } from "@/content/insights"
import { developmentPathway, programmes } from "@/content/programmes"
import { site } from "@/content/site"
import { verifiedToday, workingTowards } from "@/content/sustainability"

export default function HomePage() {
  return (
    <>
      <PageHero
        size="large"
        eyebrow="Sustainable material innovation"
        title={
          <>
            Better materials
            <br className="hidden sm:block" /> for everyday life.
          </>
        }
        description={
          <p>
            Thoughtfully selected everyday products today.
            <br className="hidden sm:block" /> Next-generation hemp-based materials tomorrow.
          </p>
        }
        image={heroEdinburgh}
        imageAlt="Raw hemp fibre, glassware and a toothbrush on a windowsill overlooking Edinburgh"
        imagePosition="70% center"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop" size="lg">
            Shop Launch Collection
          </ButtonLink>
          <ButtonLink href="/innovation" size="lg" variant="outline">
            Discover our innovation
          </ButtonLink>
        </div>
        <ul
          // Phones: one swipeable row instead of three stacked boxes.
          className="mt-8 grid gap-3 max-sm:-mx-(--gutter) max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:scroll-px-(--gutter) max-sm:overflow-x-auto max-sm:px-(--gutter) max-sm:[scrollbar-width:none] max-sm:[&>li]:w-[72%] max-sm:[&>li]:shrink-0 max-sm:[&>li]:snap-start sm:mt-10 sm:grid-cols-3"
        >
          {[
            ["Clear product status", "Available or in development — always labelled"],
            ["Transparent origin", "Sourced products clearly disclosed"],
            ["UK business", `${site.company.legalName} · ${site.company.number}`],
          ].map(([title, text]) => (
            <li
              key={title}
              className="rounded-lg border border-border bg-surface-raised/80 px-4 py-3"
            >
              <p className="eyebrow text-[0.6875rem] tracking-[0.06em] text-text-brand">{title}</p>
              <p className="mt-1 text-xs text-text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section aria-labelledby="what-we-do">
        <SectionHeader
          eyebrow="What FlexiFib does"
          id="what-we-do"
          title="Today’s choices. Tomorrow’s materials."
          description="FlexiFib is building a new generation of hemp-based everyday products. While our proprietary products are developed and tested, the Launch Collection gives customers access to carefully selected products from specialist manufacturing partners."
        />
        <div data-reveal="stagger" className="grid gap-5 lg:grid-cols-2">
          <Card interactive className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
            <div className="flex flex-col">
              <StatusBadge>Available today</StatusBadge>
              <h3 className="mt-4 text-subheading">Launch Collection</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Selected products manufactured by external production partners and retailed
                by FlexiFib — a practical route to early revenue, real customer feedback and
                market validation while our proprietary R&amp;D continues.
              </p>
              <ButtonLink href="/shop" className="mt-6 w-fit">
                Shop Launch Collection
              </ButtonLink>
            </div>
            <div className="relative hidden aspect-square w-40 overflow-hidden rounded-lg bg-surface-sunken sm:block lg:w-28 xl:w-44">
              <Image
                src={toothbrush}
                alt=""
                fill
                placeholder="blur"
                sizes="176px"
                className="object-cover transition-transform duration-400 ease-out-quint group-hover/card:scale-[1.04]"
              />
            </div>
          </Card>
          <Card interactive className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
            <div className="flex flex-col">
              <StatusBadge>In development</StatusBadge>
              <h3 className="mt-4 text-subheading">FlexiFib Innovation</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Our proprietary programmes focus on hemp-based oral care, household products
                and packaging. Each one progresses through material research, design,
                prototyping, testing and future scale-up.
              </p>
              <ButtonLink href="/innovation" variant="outline" className="mt-6 w-fit">
                Explore our innovation
              </ButtonLink>
            </div>
            <div className="relative hidden aspect-square w-40 overflow-hidden rounded-lg bg-surface-sunken sm:block lg:w-28 xl:w-44">
              <Image
                src={labBench}
                alt=""
                fill
                placeholder="blur"
                sizes="176px"
                className="object-cover object-[70%_center] transition-transform duration-400 ease-out-quint group-hover/card:scale-[1.04]"
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section tone="warm" aria-labelledby="platform">
        <SectionHeader
          eyebrow="Product platform"
          id="platform"
          title="Our flagship product platform"
          description="One materials strategy. Three areas of everyday impact."
          action={
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-brand hover:underline"
            >
              View all products <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        />
        <CardGrid columns={3} layout="carousel">
          {programmes.map((programme) => (
            <ProgrammeCard key={programme.slug} programme={programme} />
          ))}
        </CardGrid>
      </Section>

      <Section aria-labelledby="pathway">
        <SectionHeader
          eyebrow="Innovation & R&D"
          id="pathway"
          title="Engineering what comes next"
          description="Every FlexiFib programme follows the same evidence-led pathway, from raw fibre to manufacturable product."
        />
        <Pathway steps={developmentPathway} />
      </Section>

      <Section tone="raised" aria-labelledby="why-hemp">
        <MediaSplit
          image={fibreTwine}
          imageAlt="Natural fibre twine bound tightly around a bundle of raw plant stems"
        >
          <p className="eyebrow mb-3 text-text-brand">Why hemp?</p>
          <h2 id="why-hemp" className="text-heading">
            A material worth exploring.
          </h2>
          <p className="mt-4 text-lead text-text-muted">
            Hemp is a fast-growing fibre crop with strong natural fibres and potential across
            a wide range of material applications.
          </p>
          <p className="mt-4 text-text-muted">
            FlexiFib is researching where hemp can be technically and commercially useful —
            from oral care to household products and packaging. We publish verified properties
            separately from development targets, and we only make claims about a finished
            product once there is evidence for that exact product.
          </p>
          <ButtonLink href="/sustainability" variant="outline" className="mt-8">
            Learn about our approach
          </ButtonLink>
        </MediaSplit>
      </Section>

      <Section tone="inverse" aria-labelledby="honesty">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow mb-3 text-text-accent-inverse">Sustainability</p>
            <h2 id="honesty" className="text-heading">
              Honesty is part of sustainability.
            </h2>
            <p className="mt-4 text-text-inverse-muted">
              We clearly distinguish between the products we source today and the
              technologies we are developing for tomorrow. Materials, origin, testing and
              disposal information are published wherever they have been verified.
            </p>
            <ButtonLink href="/sustainability" variant="inverse" className="mt-8">
              Read Sustainability &amp; Materials
            </ButtonLink>
          </div>
          <div data-reveal="stagger" className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/6 p-6 ring-1 ring-white/10">
              <h3 className="eyebrow text-text-inverse">What we can verify today</h3>
              <Checklist items={verifiedToday.slice(0, 4)} inverse className="mt-4" />
            </div>
            <div className="rounded-xl bg-white/6 p-6 ring-1 ring-white/10">
              <h3 className="eyebrow text-text-inverse">What we are working towards</h3>
              <Checklist items={workingTowards.slice(0, 4)} variant="open" inverse className="mt-4" />
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="business">
        <SectionHeader
          eyebrow="For business"
          id="business"
          title="Build better products with us."
          description="Retailers, hospitality businesses, manufacturers, researchers and future packaging customers — start a conversation with the right team."
        />
        <CardGrid columns={5} layout="compact">
          {[
            ["Retail & wholesale", "Stock selected products."],
            ["Hotels & hospitality", "Explore supply opportunities."],
            ["Manufacturing partners", "Discuss production and scale-up."],
            ["Research partners", "R&D and testing collaboration."],
            ["Packaging enquiries", "Discuss future applications."],
          ].map(([title, text]) => (
            <InfoCard key={title} title={title}>
              {text}
            </InfoCard>
          ))}
        </CardGrid>
        <div data-reveal className="mt-10 flex justify-center">
          <ButtonLink href="/business" size="lg">
            Partner with FlexiFib
          </ButtonLink>
        </div>
      </Section>

      <Section tone="warm" aria-labelledby="insights">
        <SectionHeader
          eyebrow="Insights"
          id="insights"
          title="Ideas, research and progress."
          description="A small number of technically accurate articles — written when there is something genuinely worth saying."
          action={
            <Link
              href="/insights"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-text-brand hover:underline"
            >
              All insights <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        />
        <CardGrid columns={3} layout="carousel">
          {insights.map((insight) => (
            <InfoCard
              key={insight.slug}
              title={insight.title}
              size="large"
              eyebrow={<StatusBadge>{insight.pillar}</StatusBadge>}
            >
              <p>{insight.summary}</p>
              <p className="mt-4 text-xs font-semibold tracking-wide text-text-accent uppercase">
                In preparation
              </p>
            </InfoCard>
          ))}
        </CardGrid>
      </Section>

      <section aria-labelledby="journey" className="bg-surface-sunken">
        <Container
          data-reveal
          className="grid gap-6 py-12 sm:py-14 md:grid-cols-[1fr_minmax(0,28rem)] md:items-center md:gap-12"
        >
          <div>
            <h2 id="journey" className="text-subheading">
              Follow the FlexiFib journey.
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Product-development updates, launch news and early-access invitations. No spam —
              unsubscribe any time.
            </p>
          </div>
          <NewsletterForm />
        </Container>
      </section>
    </>
  )
}
