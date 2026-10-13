import type { Metadata } from "next"
import { CookieSettingsButton } from "@/components/consent/cookie-consent"
import { ProsePage } from "@/components/patterns/prose-page"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies and similar technologies FlexiFib uses, and how to control them.",
  alternates: { canonical: "/legal/cookies" },
}

const rows = [
  ["ff_consent", "FlexiFib", "Essential", "Remembers your cookie choices", "6 months"],
  ["flexifib-basket (local storage)", "FlexiFib", "Essential", "Keeps your signed-in basket on this device", "Until sign out, account switch or cleared"],
  ["sb-*-auth-token and sb-*-auth-token-code-verifier", "Supabase", "Essential", "Keeps you signed in and verifies your Google or Apple sign-in", "Until sign out or cookie expiry"],
  ["Stripe cookies", "Stripe", "Essential", "Secure payment and fraud prevention on checkout pages", "Set by Stripe"],
  ["_ga, _ga_*", "Google Analytics", "Analytics (optional)", "Distinguishes visitors and measures site use and performance", "Up to 2 years"],
]

export default function CookiesPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Cookie policy"
      intro="We use a small number of cookies. Optional ones are only set if you agree."
      updated="12 October 2026"
      sections={[
        {
          heading: "Your choices",
          body: (
            <>
              <p>
                Essential cookies are needed for the site to work and can’t be switched off.
                Analytics cookies are off unless you accept them. You can change your choice at
                any time.
              </p>
              <CookieSettingsButton
                className={buttonVariants({ variant: "outline", className: "no-underline!" })}
              />
            </>
          ),
        },
        {
          heading: "Cookies we use",
          body: (
            <div className="-mx-1 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Name", "Provider", "Type", "Purpose", "Duration"].map((heading) => (
                      <th key={heading} scope="col" className="px-1 py-2 font-semibold text-foreground">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row[0]} className="border-b border-border align-top">
                      {row.map((cell, index) => (
                        <td key={index} className="px-1 py-2.5">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          heading: "Managing cookies in your browser",
          body: (
            <p>
              Most browsers let you block or delete cookies in their settings. Blocking
              essential cookies may stop the basket and checkout from working.
            </p>
          ),
        },
      ]}
    />
  )
}
