"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { inboxes, primaryNav } from "@/content/site"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function MobileNavDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="data-[side=left]:w-[min(22rem,88vw)] gap-0 border-r-0 bg-surface-page p-0 duration-[var(--duration-drawer)]"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="font-heading text-2xl font-extrabold tracking-[-0.05em] text-text-brand">
            FlexiFib
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="flex flex-col">
            {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Contact", href: "/contact" }].map(
              (item, index) => {
                const active = item.href === "/" ? pathname === "/" : isActive(pathname, item.href)
                return (
                  <li
                    key={item.href}
                    style={{ animationDelay: `${60 + index * 25}ms` }}
                    className="animate-in duration-300 ease-out-quint fill-mode-backwards fade-in slide-in-from-left-3"
                  >
                    <Link
                      href={item.href}
                      onNavigate={() => onOpenChange(false)}
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
