import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import { Analytics } from "@/components/consent/analytics"
import { CookieConsent } from "@/components/consent/cookie-consent"
import { CartRoot } from "@/components/cart/cart-root"
import { AuthProvider } from "@/components/auth/auth-provider"
import { MotionProvider } from "@/components/cart/motion-provider"
import { ScrollState } from "@/components/layout/scroll-state"
import { SeaGlassLight } from "@/components/motion/sea-glass-light"
import { SiteFooter } from "@/components/layout/site-footer"
import { AnnouncementBar, SiteHeader } from "@/components/layout/site-header"
import { site } from "@/content/site"
import { CONSENT_BANNER_SCRIPT } from "@/lib/consent-constants"
import { THEME_COLORS, THEME_INIT_SCRIPT } from "@/lib/theme"
import "./globals.css"

// Two variable fonts, self-hosted at build time — no layout shift, no third-party request.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Headings and the wordmark (shared with the JARVIS product family).
const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
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
  themeColor: THEME_COLORS.light,
  // Opts out of browser-forced darkening; the pre-paint script enables the
  // site's intentional dark scheme when that theme is active.
  colorScheme: "only light",
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
    <html
      lang="en-GB"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <AuthProvider><MotionProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" className="ambient cards-blend flex-1" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <CartRoot />
          <CookieConsent />
          <script dangerouslySetInnerHTML={{ __html: CONSENT_BANNER_SCRIPT }} />
        </MotionProvider></AuthProvider>
        <Analytics />
        <ScrollState />
        <SeaGlassLight />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  )
}
