import type { Metadata } from "next"
import Link from "next/link"
import { ProsePage } from "@/components/patterns/prose-page"
import { inboxes, site } from "@/content/site"

export const metadata: Metadata = {
  title: "Recruitment Privacy Notice",
  description: "How FlexiFib uses personal data from job applications and expressions of interest.",
  alternates: { canonical: "/legal/recruitment-privacy" },
}

export default function RecruitmentPrivacyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Recruitment privacy notice"
      intro="How we use the information you send us when you apply for a role or register interest in working with FlexiFib."
      updated="9 October 2026"
      sections={[
        {
          heading: "Who is responsible",
          body: (
            <p>
              {site.company.legalName} (company number {site.company.number}) is the controller of
              your application data. Contact us at{" "}
              <a href={`mailto:${inboxes.careers}`}>{inboxes.careers}</a>.
            </p>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <ul>
              <li>Your name, email address and location.</li>
              <li>Any LinkedIn or portfolio link you provide.</li>
              <li>Your area of interest and what you tell us about your experience.</li>
              <li>Your CV, if you choose to upload one.</li>
            </ul>
          ),
        },
        {
          heading: "Why we use it",
          body: (
            <p>
              To assess your application against current or future roles and to contact you about
              suitable opportunities. Our lawful basis is taking steps at your request before
              entering into a contract and our legitimate interest in recruiting the right people.
            </p>
          ),
        },
        {
          heading: "How it is handled",
          body: (
            <p>
              The website does not store applications. Your details and CV are sent by email
              (using our email provider, Resend) to our careers inbox, where access is limited to
              the people involved in recruitment.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              If you apply for a specific role and are unsuccessful, we delete your information six
              months after the role is filled. Open applications are kept for twelve months so we
              can contact you if a suitable role arises, unless you ask us to delete them sooner.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You can ask to access, correct or delete your data, or withdraw your application, at
              any time by emailing <a href={`mailto:${inboxes.careers}`}>{inboxes.careers}</a>. You
              can also complain to the Information Commissioner’s Office at{" "}
              <a href="https://ico.org.uk" rel="noopener noreferrer">ico.org.uk</a>. See our main{" "}
              <Link href="/legal/privacy">privacy notice</Link> for more detail.
            </p>
          ),
        },
      ]}
    />
  )
}
