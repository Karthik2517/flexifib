import { ViewTransition } from "react"

/**
 * Templates remount per route, so every navigation crossfades the outgoing page
 * into the incoming one via the View Transitions API (see `.page-*` in
 * globals.css). The header is named separately and stays anchored. Browsers
 * without support simply swap instantly.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  )
}
