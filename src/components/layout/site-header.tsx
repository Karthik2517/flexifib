import Link from "next/link"
import { site } from "@/content/site"
import { CartButton } from "@/components/cart/cart-button"
import { MobileNav, NavLinks } from "./nav-links"

export function AnnouncementBar() {
  return (
    <div className="site-announcement relative z-30 bg-surface-inverse-deep text-text-inverse transition-colors duration-300">
      <p className="container-page flex h-8 items-center overflow-hidden justify-center gap-x-2 py-1.5 text-center text-[0.6875rem] font-semibold tracking-[0.12em] uppercase">
        {site.announcement.map((item, index) => (
          <span key={item} className={index > 0 ? "hidden sm:inline" : undefined}>
            {index > 0 && (
              <span aria-hidden="true" className="mr-2">
                •
              </span>
            )}
            {item}
          </span>
        ))}
      </p>
    </div>
  )
}

export function SiteHeader() {
  return (
    <header
      // Named so page transitions leave it anchored while content crossfades beneath.
      style={{ viewTransitionName: "site-header" }}
      className="site-header sticky top-0 z-30 border-b border-(--header-border) bg-(--surface-header)/92 backdrop-blur-md transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out-quart supports-[not(backdrop-filter:blur(0))]:bg-(--surface-header)"
    >
      <div className="container-page flex h-16 items-center gap-4 lg:h-[4.5rem]">
        <MobileNav />
        <Link
          href="/"
          className="font-heading text-[1.625rem] leading-none font-bold tracking-tight text-text-brand"
        >
          FlexiFib
          <span className="sr-only"> — home</span>
        </Link>
        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <NavLinks />
        </nav>
        <div className="ml-auto flex items-center lg:ml-6">
          <CartButton />
        </div>
      </div>
    </header>
  )
}
