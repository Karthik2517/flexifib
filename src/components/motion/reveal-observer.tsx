"use client"

import { useEffect, type ReactNode } from "react"

const SELECTOR = "[data-reveal]"
/** Stagger delay is capped so long grids never leave late items waiting. */
const MAX_STAGGER_INDEX = 5

/**
 * Scroll-reveal for any element marked `data-reveal` (or `data-reveal="stagger"`
 * to cascade its children). Content is visible by default — only elements still
 * below the fold when this runs are hidden, so server HTML, no-JS visitors and
 * reduced-motion users always see everything and nothing above the fold flashes.
 * The route template remounts this observer on navigation. DOM writes are
 * delayed until the route has committed, preventing changes to server markup
 * while React is still hydrating it.
 */
export function RevealObserver({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-reveal-state", "in")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.01 }
    )

    const prepare = (element: Element) => {
      if (element.hasAttribute("data-reveal-state")) return
      if (element.getAttribute("data-reveal") === "stagger") {
        Array.from(element.children).forEach((child, index) => {
          ;(child as HTMLElement).style.setProperty(
            "--reveal-i",
            String(Math.min(index, MAX_STAGGER_INDEX))
          )
        })
      }
      const { top, height } = element.getBoundingClientRect()
      // Already on screen, above it, or not rendered (hidden route): leave visible.
      if (height === 0 || top < window.innerHeight * 0.9) {
        element.setAttribute("data-reveal-state", "static")
        return
      }
      element.setAttribute("data-reveal-state", "pending")
      io.observe(element)
    }

    // This component wraps the route, so its effect runs after the route commit.
    // Two animation frames also keep the DOM untouched through selective
    // hydration before preparing below-the-fold elements for reveal.
    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        document.querySelectorAll(SELECTOR).forEach(prepare)
      })
    })

    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
      io.disconnect()
    }
  }, [])

  return children
}
