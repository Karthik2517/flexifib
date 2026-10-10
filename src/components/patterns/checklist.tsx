import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

/** Checked = verified/done; open = working towards / still to prove. */
export function Checklist({
  items,
  variant = "check",
  inverse = false,
  className,
}: {
  items: React.ReactNode[]
  variant?: "check" | "open"
  inverse?: boolean
  className?: string
}) {
  const Icon = variant === "check" ? Check : Circle
  return (
    <ul data-reveal="stagger" className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm leading-relaxed">
          <Icon
            aria-hidden="true"
            className={cn(
              "mt-0.5 shrink-0",
              variant === "check" ? "size-4" : "size-3.5 translate-y-0.5",
              inverse ? "text-text-accent-inverse" : "text-text-brand"
            )}
            strokeWidth={variant === "check" ? 2.5 : 2}
          />
          <span className={inverse ? "text-text-inverse-muted" : "text-text-muted"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
