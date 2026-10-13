"use client"

import { useEffect } from "react"

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/** The sea-glass surface for a pointer target: the button itself, or a card link's inner glass. */
function glassFor(target: EventTarget | null) {
  const host = target instanceof Element ? target.closest("a, button") : null
  if (!host) return null
  const glass = host.classList.contains("sea-glass") ? host : host.querySelector(":scope > .sea-glass")
  return glass instanceof HTMLElement ? glass : null
}

/**
 * Lights the sea-glass buttons (see "Sea-glass buttons" in globals.css) from the pointer:
 * it is the light source their edges and shadows fall away from, and a hovered button
 * tilts towards it with its top-edge reflection following. Mouse and pen only; touch,
 * reduced motion and no JavaScript keep the default top-left light and still glass.
 */
export function SeaGlassLight() {
  useEffect(() => {
    const light = document.documentElement.style
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    function onMove(event: PointerEvent) {
      if (event.pointerType === "touch" || reduceMotion.matches) return

      // Shadows swing left/right across the screen and always keep some downward fall
      // so the glass stays grounded.
      const { clientX, clientY } = event
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          const x = clamp(clientX / window.innerWidth)
          const y = clamp(clientY / window.innerHeight)
          light.setProperty("--sg-sx", ((0.5 - x) * 2).toFixed(3))
          light.setProperty("--sg-sy", (0.65 + (0.5 - y) * 0.7).toFixed(3))
        })
      }

      const glass = glassFor(event.target)
      if (!glass) return
      const rect = glass.getBoundingClientRect()
      const x = clamp((event.clientX - rect.left) / rect.width)
      const y = clamp((event.clientY - rect.top) / rect.height)
      glass.style.setProperty("--sg-x", `${(x * 100).toFixed(1)}%`)
      glass.style.setProperty("--sg-tilt-x", `${((0.5 - y) * 10).toFixed(2)}deg`)
      glass.style.setProperty("--sg-tilt-y", `${((x - 0.5) * 6).toFixed(2)}deg`)
    }

    function onOut(event: PointerEvent) {
      const host = event.target instanceof Element ? event.target.closest("a, button") : null
      if (!host || (event.relatedTarget instanceof Node && host.contains(event.relatedTarget))) return
      const glass = glassFor(host)
      if (!glass) return
      glass.style.removeProperty("--sg-x")
      glass.style.removeProperty("--sg-tilt-x")
      glass.style.removeProperty("--sg-tilt-y")
    }

    document.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerout", onOut, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerout", onOut)
      light.removeProperty("--sg-sx")
      light.removeProperty("--sg-sy")
    }
  }, [])

  return null
}
