"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { primaryNav } from "@/content/site"
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
                "relative inline-flex h-11 items-center px-2.5 text-[0.8125rem] font-semibold text-text-body transition-colors duration-[var(--duration-micro)] hover:text-text-brand xl:px-3",
                "after:absolute after:inset-x-2.5 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-[var(--duration-popover)] after:ease-out-quart xl:after:inset-x-3",
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
