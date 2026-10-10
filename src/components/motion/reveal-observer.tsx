"use client"

import { useEffect } from "react"

const SELECTOR = "[data-reveal]"
/** Stagger delay is capped so long grids never leave late items waiting. */
const MAX_STAGGER_INDEX = 5

/**
 * Scroll-reveal for any element marked `data-reveal` (or `data-reveal="stagger"`
 * to cascade its children). Content is visible by default — only elements still
 * below the fold when this runs are hidden, so server HTML, no-JS visitors and
 * reduced-motion users always see everything and nothing above the fold flashes.
 * A MutationObserver picks up content added by client-side navigation; its
 * callback runs before paint, so new below-the-fold content never flickers.
 */
/**
 * Sets `--i` on each child of a stagger container to its column position within
 * its visual row (0 for the first card in a row), so scroll-driven card motion
 * can bring side-by-side cards in one after another. Single-column layouts get
 * 0 throughout, so stacked cards on phones aren't delayed.
 */
function setColumns(container: Element) {
  let rowTop: number | null = null
  let column = 0
  for (const child of Array.from(container.children) as HTMLElement[]) {
    if (child.offsetTop !== rowTop) {
      rowTop = child.offsetTop
      column = 0
    }
    child.style.setProperty("--i", String(column++))
  }
}

export function RevealObserver() {
  useEffect(() => {
    // Column positions for scroll-driven card motion; kept current on resize.
    const columns = new ResizeObserver((entries) => {
      for (const entry of entries) setColumns(entry.target)
    })
    const STAGGER = '[data-reveal="stagger"]'
    const trackColumns = (root: ParentNode) => {
      if (root instanceof Element && root.matches(STAGGER)) columns.observe(root)
      root.querySelectorAll(STAGGER).forEach((el) => columns.observe(el))
    }
    trackColumns(document)
    const columnMutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) trackColumns(node)
        })
      }
    })
    columnMutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      columns.disconnect()
      columnMutations.disconnect()
    }
  }, [])

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

    const scan = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach(prepare)
    scan(document)

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches(SELECTOR)) prepare(node)
          scan(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])

  return null
}
