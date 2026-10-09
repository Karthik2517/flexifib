"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useConsent } from "@/lib/consent"
import { CONSENT_BANNER_ID } from "@/lib/consent-constants"

// Rarely opened, so its dialog code is only fetched on demand.
const CookiePreferences = dynamic(() => import("./cookie-preferences"), { ssr: false })

export function CookieConsent() {
  const { choices, ready, preferencesOpen, load, save, setPreferencesOpen } = useConsent()

  useEffect(() => {
    load()
  }, [load])

  // Rendered in the static HTML so it paints with the page (it is often the
  // LCP element on a first visit). An inline script in the root layout hides
  // it before first paint when a choice already exists; see CONSENT_BANNER_SCRIPT.
  const showBanner = !preferencesOpen && (!ready || choices === null)

  return (
    <>
      {showBanner && (
        <div
          id={CONSENT_BANNER_ID}
          suppressHydrationWarning
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5"
        >
          <div className="container-page px-0!">
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-raised p-5 shadow-(--shadow-card-hover) md:flex-row md:items-center md:justify-between md:gap-8 sm:p-6">
              <div className="max-w-2xl">
                <h2 className="text-lg">We use cookies</h2>
                <p className="mt-1 text-sm text-text-muted">
                  Essential cookies keep the site working, including your basket. With
                  your permission we’d also like to use analytics cookies to understand
                  how the site is used. See our{" "}
                  <Link href="/legal/cookies" className="underline underline-offset-3">
                    cookie policy
                  </Link>
                  .
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <Button onClick={() => save({ analytics: true })}>Accept all</Button>
                <Button variant="outline" onClick={() => save({ analytics: false })}>
                  Reject optional
                </Button>
                <Button variant="ghost" className="col-span-2" onClick={() => setPreferencesOpen(true)}>
                  Manage
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {preferencesOpen && (
        <CookiePreferences
          initialAnalytics={choices?.analytics ?? false}
          onSave={(analytics) => save({ analytics })}
          onOpenChange={setPreferencesOpen}
        />
      )}
    </>
  )
}

/** Footer link that reopens the preferences dialog. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const setPreferencesOpen = useConsent((state) => state.setPreferencesOpen)
  return (
    <button type="button" className={className} onClick={() => setPreferencesOpen(true)}>
      Cookie settings
    </button>
  )
}
