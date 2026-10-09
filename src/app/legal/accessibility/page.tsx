import type { Metadata } from "next"
import { ProsePage } from "@/components/patterns/prose-page"
import { inboxes } from "@/content/site"

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "FlexiFib’s commitment to accessibility, known limitations and how to report a problem.",
  alternates: { canonical: "/legal/accessibility" },
}

export default function AccessibilityPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Accessibility statement"
      intro="We want everyone to be able to use this website."
      updated="9 October 2026"
      sections={[
        {
          heading: "Our commitment",
          body: (
            <>
              <p>
                We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.
                The site is designed so you can:
              </p>
              <ul>
                <li>navigate and buy using only a keyboard, with a visible focus indicator</li>
                <li>use a screen reader, with labelled controls and logical headings</li>
                <li>zoom text up to 200% without losing content</li>
                <li>reduce motion via your device’s “reduce motion” setting</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How we test",
          body: (
            <p>
              Every change is checked with automated accessibility tests (axe) across key pages,
              alongside manual keyboard and screen-reader checks.
            </p>
          ),
        },
        {
          heading: "Known limitations",
          body: (
            <p>
              Payment pages are provided by Stripe and are covered by Stripe’s own
              accessibility commitments. If you find any other barrier, please tell us.
            </p>
          ),
        },
        {
          heading: "Report a problem",
          body: (
            <p>
              Email <a href={`mailto:${inboxes.support}`}>{inboxes.support}</a> describing the
              page and the problem. We aim to respond within five working days, and can provide
              information in an alternative format on request.
            </p>
          ),
        },
      ]}
    />
  )
}
