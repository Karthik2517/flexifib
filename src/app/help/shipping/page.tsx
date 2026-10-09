import type { Metadata } from "next"
import { ProsePage } from "@/components/patterns/prose-page"
import { formatPrice, shipping } from "@/content/products"
import { inboxes } from "@/content/site"

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description: "Where FlexiFib delivers, delivery costs, dispatch times and what to expect.",
  alternates: { canonical: "/help/shipping" },
}

export default function ShippingPage() {
  return (
    <ProsePage
      eyebrow="Customer help"
      title="Shipping & delivery"
      intro="Where we deliver, what it costs and when to expect your order."
      updated="9 October 2026"
      sections={[
        {
          heading: "Where we deliver",
          body: (
            <p>
              We currently deliver to addresses in the United Kingdom. We’ll update this page
              if we begin shipping internationally.
            </p>
          ),
        },
        {
          heading: "Delivery costs",
          body: (
            <ul>
              <li>
                Standard UK delivery: <strong>{formatPrice(shipping.standardRate)}</strong>
              </li>
              <li>
                Free UK delivery on orders of{" "}
                <strong>{formatPrice(shipping.freeThreshold)}</strong> or more
              </li>
            </ul>
          ),
        },
        {
          heading: "Delivery times",
          body: (
            <p>
              Orders usually arrive within {shipping.minDays}–{shipping.maxDays} working days of
              being placed. You’ll see an order confirmation as soon as your payment is complete,
              and we’ll contact you if there is any delay with your order.
            </p>
          ),
        },
        {
          heading: "Problems with delivery",
          body: (
            <p>
              If your order hasn’t arrived within the expected time, or arrives damaged, email{" "}
              <a href={`mailto:${inboxes.orders}`}>{inboxes.orders}</a> with your order
              reference and we’ll put it right.
            </p>
          ),
        },
      ]}
      related={[
        { label: "Returns & refunds", href: "/help/returns" },
        { label: "FAQ", href: "/help/faq" },
        { label: "Terms & conditions", href: "/legal/terms" },
      ]}
    />
  )
}
