import type { Metadata, Viewport } from "next"
import { Inter, Source_Serif_4 } from "next/font/google"
import { Analytics } from "@/components/consent/analytics"
import { CookieConsent } from "@/components/consent/cookie-consent"
import { CartRoot } from "@/components/cart/cart-root"
import { MotionProvider } from "@/components/cart/motion-provider"
import { RevealObserver } from "@/components/motion/reveal-observer"
import { SiteFooter } from "@/components/layout/site-footer"
import { AnnouncementBar, SiteHeader } from "@/components/layout/site-header"
import { site } from "@/content/site"
import { CONSENT_BANNER_SCRIPT } from "@/lib/consent-constants"
import "./globals.css"

// Two variable fonts, self-hosted at build time — no layout shift, no third-party request.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "FlexiFib — Better materials for everyday life",
    template: "%s · FlexiFib",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#17382c" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1e17" },
  ],
  // Tells browsers the site ships its own dark theme, so they don't auto-darken it.
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.company.legalName,
  url: site.url,
  logo: `${site.url}/logo.png`,
  email: "hello@flexifib.com",
  identifier: site.company.number,
  address: { "@type": "PostalAddress", addressCountry: "GB", addressRegion: "Scotland" },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <CartRoot />
          <CookieConsent />
          <script dangerouslySetInnerHTML={{ __html: CONSENT_BANNER_SCRIPT }} />
        </MotionProvider>
        <Analytics />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  )
}
