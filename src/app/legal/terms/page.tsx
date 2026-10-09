import type { Metadata } from "next"
import Link from "next/link"
import { ProsePage } from "@/components/patterns/prose-page"
import { inboxes, site } from "@/content/site"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply when you buy from FlexiFib.",
  alternates: { canonical: "/legal/terms" },
}

export default function TermsPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Terms & conditions"
      intro="These terms apply to orders placed on this website. Please read them before you buy."
      updated="9 October 2026"
      sections={[
        {
          heading: "About us",
          body: (
            <p>
              This website is operated by {site.company.legalName}, a company registered in
              Scotland under number {site.company.number}. Contact us at{" "}
              <a href={`mailto:${inboxes.support}`}>{inboxes.support}</a>.
            </p>
          ),
        },
        {
          heading: "Products and descriptions",
          body: (
            <p>
              Only Launch Collection products marked as available can be ordered. Programmes
              described as in development or future (including EcoBrush, HempSoft and
              FlexiPack) are not for sale. Product images may differ slightly from the item
              you receive.
            </p>
          ),
        },
        {
          heading: "Ordering and contract",
          body: (
            <p>
              When you complete checkout you make an offer to buy. A contract is formed when we
              confirm your order. We may decline an order — for example if an item is out of
              stock or a pricing error has occurred — in which case we will refund you in full.
            </p>
          ),
        },
        {
          heading: "Prices and payment",
          body: (
            <p>
              Prices are shown in pounds sterling. Delivery charges are shown before you pay.
              Payment is taken securely by Stripe when you place your order.
            </p>
          ),
        },
        {
          heading: "Delivery",
          body: (
            <p>
              See our <Link href="/help/shipping">shipping page</Link> for where we deliver,
              costs and timescales. Risk in the goods passes to you on delivery.
            </p>
          ),
        },
        {
          heading: "Cancellations and returns",
          body: (
            <p>
              You have the right to cancel within 14 days of delivery, subject to the
              exceptions explained in our <Link href="/help/returns">returns policy</Link>. This
              does not affect your statutory rights under the Consumer Rights Act 2015.
            </p>
          ),
        },
        {
          heading: "Our liability",
          body: (
            <p>
              We are responsible for foreseeable loss or damage caused by our breach of these
              terms or our negligence. We do not exclude liability where it would be unlawful to
              do so, including for death or personal injury caused by negligence.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by Scots law. You may bring proceedings in the courts of
              Scotland, or in the courts of the part of the UK where you live.
            </p>
          ),
        },
      ]}
    />
  )
}
