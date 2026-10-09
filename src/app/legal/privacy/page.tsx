import type { Metadata } from "next"
import Link from "next/link"
import { ProsePage } from "@/components/patterns/prose-page"
import { inboxes, site } from "@/content/site"

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "What personal data FlexiFib collects, why, who we share it with, and your rights.",
  alternates: { canonical: "/legal/privacy" },
}

export default function PrivacyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy notice"
      intro="How FLEXIFIB ECO LTD collects and uses personal data when you use this website or buy from us."
      updated="9 October 2026"
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              {site.company.legalName} (company number {site.company.number}, registered in
              Scotland) is the controller of your personal data. Contact us about privacy at{" "}
              <a href={`mailto:${inboxes.general}`}>{inboxes.general}</a>.
            </p>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <ul>
              <li><strong>Orders:</strong> name, email, delivery address and order details. Card details are collected and processed by Stripe; we never see or store them.</li>
              <li><strong>Enquiries:</strong> the details you enter in our contact, business or interest forms.</li>
              <li><strong>Updates list:</strong> your email address if you join our journey updates.</li>
              <li><strong>Analytics (only with consent):</strong> pages visited, device and browser type, approximate location and site performance measurements.</li>
            </ul>
          ),
        },
        {
          heading: "Why we use it",
          body: (
            <ul>
              <li>To fulfil your order and provide customer support — <em>performance of a contract</em>.</li>
              <li>To reply to your enquiry — <em>legitimate interests</em>.</li>
              <li>To send journey updates you asked for — <em>consent</em>, which you can withdraw at any time.</li>
              <li>To understand and improve the website — <em>consent</em>, via our cookie banner.</li>
              <li>To keep financial records — <em>legal obligation</em>.</li>
            </ul>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <ul>
              <li>Stripe — payment processing.</li>
              <li>Resend — delivering form submissions and update emails.</li>
              <li>Vercel — website hosting.</li>
              <li>Google Analytics — only if you accept analytics cookies.</li>
              <li>Delivery carriers — to deliver your order.</li>
            </ul>
          ),
        },
        {
          heading: "International transfers",
          body: (
            <p>
              Some of these providers process data outside the UK. Where they do, we rely on
              appropriate safeguards such as the UK International Data Transfer Agreement or
              adequacy regulations.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              Order records are kept for six years for accounting purposes. Enquiries are kept
              for up to two years after our last contact. Update-list details are kept until
              you unsubscribe.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You can ask to access, correct, delete or restrict use of your data, object to
              its use, or request a copy to take elsewhere. Email{" "}
              <a href={`mailto:${inboxes.general}`}>{inboxes.general}</a>. If you’re unhappy with
              how we handle your data, you can complain to the Information Commissioner’s Office
              at <a href="https://ico.org.uk" rel="noopener noreferrer">ico.org.uk</a>.
            </p>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              See our <Link href="/legal/cookies">cookie policy</Link> for details of the
              cookies we use and how to control them.
            </p>
          ),
        },
      ]}
    />
  )
}
