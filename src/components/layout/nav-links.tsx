"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { inboxes, primaryNav } from "@/content/site"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function NavLinks() {
  const pathname = usePathname()
  return (
    <ul className="flex items-center gap-1 xl:gap-2">
      {primaryNav.map((item) => {
        const active = isActive(pathname, item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex h-11 items-center px-2.5 text-[0.8125rem] font-semibold text-text-body transition-colors duration-(--duration-micro) hover:text-text-brand xl:px-3",
                "after:absolute after:inset-x-2.5 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-(--duration-popover) after:ease-out-quart xl:after:inset-x-3",
                "hover:after:scale-x-100",
                active && "text-text-brand after:scale-x-100"
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="-ml-2.5 lg:hidden" aria-label="Open menu" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="data-[side=left]:w-[min(22rem,88vw)] gap-0 border-r-0 bg-surface-page p-0 duration-(--duration-drawer)"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-heading text-2xl font-bold text-text-brand">
            FlexiFib
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="flex flex-col">
            {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Contact", href: "/contact" }].map(
              (item, index) => {
                const active =
                  item.href === "/" ? pathname === "/" : isActive(pathname, item.href)
                return (
                  <li
                    key={item.href}
                    // Links cascade in as the drawer opens.
                    style={{ animationDelay: `${60 + index * 25}ms` }}
                    className="animate-in duration-300 ease-out-quint fill-mode-backwards fade-in slide-in-from-left-3"
                  >
                    <Link
                      href={item.href}
                      onNavigate={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center rounded-md px-3 font-heading text-lg font-semibold text-foreground transition-colors hover:bg-surface-tint",
                        active && "bg-surface-tint text-text-brand"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              }
            )}
          </ul>
        </nav>
        <div className="border-t border-border px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-sm text-text-muted">
          Questions?{" "}
          <a href={`mailto:${inboxes.support}`} className="font-semibold text-text-brand underline underline-offset-3">
            {inboxes.support}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
