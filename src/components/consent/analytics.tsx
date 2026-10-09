"use client"

import Script from "next/script"
import { useReportWebVitals } from "next/web-vitals"
import { useConsent } from "@/lib/consent"
import { track } from "@/lib/analytics"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

type Metric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0]

// Stable reference so metrics are not reported twice (see Next.js docs).
function reportWebVital(metric: Metric) {
  track("web_vital", {
    metric_name: metric.name,
    metric_id: metric.id,
    metric_rating: metric.rating,
    // CLS is unitless; scale it so it survives GA's integer rounding.
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
    navigation_type: metric.navigationType,
    non_interaction: true,
  })
}

/**
 * Loads GA4 only after the visitor opts in to analytics cookies, and reports
 * real-user Core Web Vitals (RUM) through it. Nothing third-party loads otherwise.
 */
export function Analytics() {
  const analyticsAllowed = useConsent((state) => state.choices?.analytics === true)
  useReportWebVitals(reportWebVital)

  if (!GA_ID || !analyticsAllowed) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  )
}
