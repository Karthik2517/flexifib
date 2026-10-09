import type { Metadata } from "next"
import { ProsePage } from "@/components/patterns/prose-page"
import { inboxes, site } from "@/content/site"

export const metadata: Metadata = {
  title: "Product Safety",
  description: "Care, warnings, traceability, complaints and recall information for FlexiFib products.",
  alternates: { canonical: "/help/product-safety" },
}

export default function ProductSafetyPage() {
  return (
    <ProsePage
      eyebrow="Customer help"
      title="Product safety"
      intro="How to use our products safely, how to report a problem, and how we handle recalls."
      updated="9 October 2026"
      sections={[
        {
          heading: "Using toothbrushes safely",
          body: (
            <ul>
              <li>Supervise children under 7 when brushing, and use a brush suitable for their age.</li>
              <li>Inspect the brush before each use. Stop using it if the handle cracks or bristles come loose.</li>
              <li>Replace your toothbrush every three months, or sooner if bristles are splayed.</li>
              <li>Store upright in a well-ventilated place so it can dry between uses.</li>
            </ul>
          ),
        },
        {
          heading: "Traceability",
          body: (
            <p>
              Each Launch Collection product page lists its product code and batch reference
              once confirmed by the supplier. Please quote it if you contact us about a product.
            </p>
          ),
        },
        {
          heading: "Reporting a safety concern",
          body: (
            <p>
              If you think a product is unsafe, stop using it and email{" "}
              <a href={`mailto:${inboxes.support}`}>{inboxes.support}</a> with your order
              reference, the product code if available, and a description or photo of the issue.
              We treat safety reports as a priority.
            </p>
          ),
        },
        {
          heading: "Recalls",
          body: (
            <p>
              If we ever need to recall a product, we’ll contact affected customers directly
              using their order details and publish a notice on this page. {site.company.legalName}{" "}
              is responsible for products sold through this website.
            </p>
          ),
        },
      ]}
      related={[
        { label: "Returns & refunds", href: "/help/returns" },
        { label: "Contact", href: "/contact" },
      ]}
    />
  )
}
