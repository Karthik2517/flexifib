"use client"

import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function FormSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid gap-4", compact ? "sm:grid-cols-[1fr_9rem]" : "sm:grid-cols-2")}
    >
      {Array.from({ length: compact ? 2 : 6 }, (_, index) => (
        <Skeleton
          key={index}
          className={cn("h-11 rounded-md", !compact && index >= 4 && "sm:col-span-2")}
        />
      ))}
    </div>
  )
}

export function DeferredMount({
  children,
  compact = false,
  fallback,
}: {
  children: React.ReactNode
  compact?: boolean
  fallback?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || !("IntersectionObserver" in window)) {
      setReady(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setReady(true)
        observer.disconnect()
      },
      { rootMargin: "500px 0px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{ready ? children : (fallback ?? <FormSkeleton compact={compact} />)}</div>
}
