import Link from "next/link"
import type { ReactNode } from "react"
import { Container } from "@/components/layout/section"
import { PageHero } from "./page-hero"

export type ProseSection = { heading: string; body: ReactNode }

/** Long-form help and legal pages: inverse hero, contents list, readable measure. */
export function ProsePage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  related,
}: {
  eyebrow: string
  title: string
  intro: ReactNode
  updated?: string
  sections: ProseSection[]
  related?: { label: string; href: string }[]
}) {
  const slug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  return (
    <>
      <div
        aria-hidden="true"
        className="reading-progress fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-brass-300"
      />
      <PageHero tone="inverse" eyebrow={eyebrow} title={title} description={<p>{intro}</p>}>
        {updated && <p className="text-sm text-text-inverse-muted">Last updated {updated}</p>}
      </PageHero>
      <Container className="section-y grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
        {sections.length > 2 && (
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-text-brand">On this page</p>
            <ol className="mt-3 flex flex-col gap-0.5 border-l border-border">
              {sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${slug(section.heading)}`}
                    className="-ml-px inline-flex min-h-9 items-center border-l-2 border-transparent pl-4 text-sm text-text-muted transition-colors hover:border-primary hover:text-text-brand"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-(--container-prose) lg:col-start-2">
          {sections.map((section) => (
            <section data-reveal key={section.heading} aria-labelledby={slug(section.heading)} className="mb-12 last:mb-0">
              <h2 id={slug(section.heading)} className="scroll-mt-28 text-subheading">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink-700 [&_a]:font-semibold [&_a]:text-text-brand [&_a]:underline [&_a]:underline-offset-3 [&_li]:pl-1 [&_strong]:text-ink-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                {section.body}
              </div>
            </section>
          ))}
          {related && related.length > 0 && (
            <div className="mt-14 border-t border-border pt-8">
              <p className="eyebrow text-text-brand">Related</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-text-brand underline underline-offset-3"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
