import Link from "next/link"
import { site } from "@/content/site"
import { CartButton } from "@/components/cart/cart-button"
import { AccountLink } from "@/components/auth/account-link"
import { ThemeToggle } from "./theme-toggle"
import { MobileNav, NavLinks } from "./nav-links"

function AnnouncementItems({ hidden = false }: { hidden?: boolean }) {
  return (
    <span aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-x-2">
      {site.announcement.map((item, index) => (
        <span key={item} className="flex items-center gap-x-2">
          {index > 0 && <span aria-hidden="true">•</span>}
          {item}
        </span>
      ))}
    </span>
  )
}

export function AnnouncementBar() {
  return (
    <div className="site-announcement relative z-30 bg-surface-inverse-deep text-text-inverse transition-colors duration-300">
      <div className="container-page flex h-8 items-center justify-center overflow-hidden text-[0.6875rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase max-sm:px-0">
        {/* Phones: a seamless right-to-left ticker (second copy is decorative).
            From 640px up the line fits and sits still. */}
        <p className="announcement-track flex items-center gap-x-2 max-sm:gap-x-8 max-sm:pr-8">
          <AnnouncementItems />
          <span className="flex sm:hidden">
            <AnnouncementItems hidden />
          </span>
        </p>
      </div>
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
      <div className="container-page flex h-16 items-center gap-2 sm:gap-4 lg:h-[4.5rem]">
        <MobileNav />
        <Link
          href="/"
          className="font-heading text-[1.625rem] leading-none font-extrabold tracking-[-0.05em] text-text-brand"
        >
          FlexiFib
          <span className="sr-only"> — home</span>
        </Link>
        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <NavLinks />
        </nav>
        <div className="ml-auto flex items-center lg:ml-4">
          <ThemeToggle />
          <AccountLink />
          <CartButton />
        </div>
      </div>
    </header>
  )
}
