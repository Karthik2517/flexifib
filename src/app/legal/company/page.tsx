import type { Metadata } from "next"
import { ProsePage } from "@/components/patterns/prose-page"
import { inboxes, site } from "@/content/site"

export const metadata: Metadata = {
  title: "Company Information",
  description: "FLEXIFIB ECO LTD — company number, jurisdiction and registered details.",
  alternates: { canonical: "/legal/company" },
}

export default function CompanyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Company information"
      intro={`${site.name} is the trading name of ${site.company.legalName}.`}
      sections={[
        {
          heading: "Registered details",
          body: (
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[12rem_1fr]">
              {[
                ["Legal name", site.company.legalName],
                ["Trading name", site.name],
                ["Company number", site.company.number],
                ["Registered in", site.company.jurisdiction],
                ["Registered office", site.company.registeredOffice ?? "As shown on the Companies House register"],
                ["Contact", inboxes.general],
              ].map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="font-semibold text-ink-900">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ),
        },
        {
          heading: "Companies House",
          body: (
            <p>
              Our current registered office and filing history are available on{" "}
              <a href={site.company.companiesHouseUrl} rel="noopener noreferrer" target="_blank">
                Companies House
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  )
}
