"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

const MobileNavDrawer = dynamic(() => import("./mobile-nav-drawer"), { ssr: false })

export function MobileNav() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  function showMenu() {
    setMounted(true)
    setOpen(true)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="-ml-2.5 lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={() => setMounted(true)}
        onFocus={() => setMounted(true)}
        onClick={showMenu}
      >
        <Menu className="size-5" />
      </Button>
      {mounted && <MobileNavDrawer open={open} onOpenChange={setOpen} />}
    </>
  )
}
