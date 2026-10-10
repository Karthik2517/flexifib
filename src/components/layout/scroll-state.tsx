"use client"

import { useEffect } from "react"

/**
 * Marks <html data-scrolled> once the page leaves the top, so the site header
 * can sit transparently over the hero and turn solid as soon as content scrolls
 * beneath it. Without JavaScript the header simply stays solid.
 */
export function ScrollState() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const update = () => {
      frame = 0
      root.toggleAttribute("data-scrolled", window.scrollY > 8)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
      root.removeAttribute("data-scrolled")
    }
  }, [])

  return null
}
