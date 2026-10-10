import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Dark green call-to-action band, e.g. "Interested in EcoBrush?" */
export function CtaBand({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      data-reveal
      className={cn(
        "flex flex-col gap-6 rounded-2xl bg-surface-inverse p-7 text-text-inverse sm:p-10 md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3 text-text-accent-inverse">{eyebrow}</p>}
        <h2 className="text-heading text-text-inverse">{title}</h2>
        {description && (
          <p className="mt-3 text-text-inverse-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/** Soft sage panel for status notes and disclosures. */
export function NotePanel({
  eyebrow,
  title,
  children,
  className,
  as: Tag = "div",
}: {
  eyebrow?: string
  title?: ReactNode
  children?: ReactNode
  className?: string
  as?: "div" | "aside"
}) {
  return (
    <Tag data-reveal className={cn("rounded-xl bg-surface-tint p-6 sm:p-8", className)}>
      {eyebrow && <p className="eyebrow mb-2 text-text-brand">{eyebrow}</p>}
      {title && <h3 className="text-subheading">{title}</h3>}
      {children && (
        <div className={cn("text-sm leading-relaxed text-text-body", title && "mt-3")}>
          {children}
        </div>
      )}
    </Tag>
  )
}
