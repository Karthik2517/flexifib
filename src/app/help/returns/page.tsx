import type { Metadata } from "next"
import { ProsePage } from "@/components/patterns/prose-page"
import { inboxes } from "@/content/site"

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "How to cancel an order or return an item to FlexiFib, exceptions, and refund timing.",
  alternates: { canonical: "/help/returns" },
}

export default function ReturnsPage() {
  return (
    <ProsePage
      eyebrow="Customer help"
      title="Returns & refunds"
      intro="Your right to cancel, how to return an item, and when you’ll be refunded."
      updated="9 October 2026"
      sections={[
        {
          heading: "Your right to cancel",
          body: (
            <p>
              You can cancel your order for any reason within 14 days of the day you receive
              it. To cancel, email <a href={`mailto:${inboxes.orders}`}>{inboxes.orders}</a>{" "}
              with your order reference and the items you want to return.
            </p>
          ),
        },
        {
          heading: "Hygiene exception",
          body: (
            <p>
              For health and hygiene reasons, toothbrushes that have been unsealed after
              delivery can’t be returned unless they are faulty. This does not affect your
              statutory rights for faulty items.
            </p>
          ),
        },
        {
          heading: "How to return an item",
          body: (
            <ul>
              <li>Tell us you’d like to return an item within 14 days of delivery.</li>
              <li>Send it back within 14 days of telling us, in its original packaging.</li>
              <li>Unless the item is faulty or incorrect, you pay the cost of returning it.</li>
            </ul>
          ),
        },
        {
          heading: "Refunds",
          body: (
            <p>
              We’ll refund you to your original payment method within 14 days of receiving the
              returned item (or evidence that you’ve sent it). If you cancel the whole order,
              we also refund the standard delivery charge.
            </p>
          ),
        },
        {
          heading: "Faulty or incorrect items",
          body: (
            <p>
              If something arrives faulty, damaged or not as described, email{" "}
              <a href={`mailto:${inboxes.support}`}>{inboxes.support}</a> with a photo and your
              order reference. We’ll arrange a replacement or refund, including return postage.
            </p>
          ),
        },
      ]}
      related={[
        { label: "Shipping & delivery", href: "/help/shipping" },
        { label: "Terms & conditions", href: "/legal/terms" },
        { label: "Contact", href: "/contact" },
      ]}
    />
  )
}
