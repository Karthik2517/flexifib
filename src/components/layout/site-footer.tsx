import Link from "next/link"
import { CookieSettingsButton } from "@/components/consent/cookie-consent"
import { footerNav, site } from "@/content/site"

const linkClass =
  "inline-flex min-h-8 items-center text-sm text-text-inverse-muted transition-colors hover:text-text-inverse hover:underline underline-offset-3"

export function SiteFooter() {
  return (
    <footer className="bg-surface-inverse-deep text-text-inverse">
      <div className="container-page grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
        <div>
          <Link href="/" className="font-heading text-3xl font-bold text-text-inverse">
            FlexiFib
          </Link>
          <p className="mt-2 text-sm text-text-inverse-muted">{site.tagline}</p>
          <div className="mt-8 text-xs leading-relaxed text-text-inverse-muted">
            <p className="font-bold tracking-wide text-text-inverse">{site.company.legalName}</p>
            <p>
              Registered in Scotland · Company No.{" "}
              <a
                href={site.company.companiesHouseUrl}
                className="underline underline-offset-2 hover:text-text-inverse"
                rel="noopener noreferrer"
                target="_blank"
              >
                {site.company.number}
              </a>
            </p>
            <p>
              {site.company.registeredOffice
                ? `Registered office: ${site.company.registeredOffice}`
                : "Registered office address available on Companies House."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2 className="font-sans text-sm font-bold tracking-normal text-text-inverse">
                {group.title}
              </h2>
              <ul className="mt-3 flex flex-col gap-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                {group.title === "Legal" && (
                  <li>
                    <CookieSettingsButton className={linkClass} />
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-5 text-xs text-text-inverse-muted">
          © {site.company.legalName}. All product claims and statuses are reviewed against
          current evidence.
        </p>
      </div>
    </footer>
  )
}
