import { cn } from "@/lib/utils"

export function StatusBadge({
  children,
  tone = "tint",
  className,
}: {
  children: React.ReactNode
  tone?: "tint" | "warm" | "inverse"
  className?: string
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[0.6875rem] tracking-[0.08em]",
        tone === "tint" && "bg-surface-tint text-text-brand",
        tone === "warm" && "bg-sand-200 text-text-brand",
        tone === "inverse" && "bg-white/10 text-text-accent-inverse",
        className
      )}
    >
      {children}
    </span>
  )
}
