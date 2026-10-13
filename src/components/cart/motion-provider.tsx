"use client"

import { LazyMotion, MotionConfig } from "motion/react"

// Animation features are fetched after first paint; until then `m.*`
// components render statically, which is exactly what we want on load.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default)

/** Honours the visitor's reduced-motion preference for every Motion component. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
