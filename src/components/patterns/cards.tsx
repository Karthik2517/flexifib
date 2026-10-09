import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
  6: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
} as const

export function CardGrid({
  columns = 3,
  className,
  children,
  as: Tag = "ul",
}: {
  columns?: keyof typeof columnClasses
  className?: string
  children: ReactNode
  as?: "ul" | "div"
}) {
  return (
    <Tag
      role={Tag === "ul" ? "list" : undefined}
      className={cn("grid gap-4 sm:gap-5", columnClasses[columns], className)}
    >
      {children}
    </Tag>
  )
}

export function Card({
  className,
  children,
  as: Tag = "div",
  interactive = false,
}: {
  className?: string
  children: ReactNode
  as?: "div" | "li" | "article"
  interactive?: boolean
}) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-border bg-surface-raised shadow-(--shadow-card)",
        interactive &&
          "transition-[box-shadow,transform] duration-(--duration-popover) ease-out-quart hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)",
        className
      )}
    >
      {children}
    </Tag>
  )
}

/** Title + short description card used across most pages. */
export function InfoCard({
  title,
  children,
  eyebrow,
  size = "default",
  className,
}: {
  title: ReactNode
  children?: ReactNode
  eyebrow?: ReactNode
  size?: "default" | "large"
  className?: string
}) {
  return (
    <Card as="li" className={cn("p-5 sm:p-6", className)}>
      {eyebrow && <div className="mb-3">{eyebrow}</div>}
      <h3
        className={cn(
          size === "large"
            ? "text-subheading"
            : "font-sans text-[0.9375rem] font-bold tracking-normal"
        )}
      >
        {title}
      </h3>
      {children && (
        <div className="mt-2 text-sm leading-relaxed text-text-muted">{children}</div>
      )}
    </Card>
  )
}

/** Two-column label/description rows (e.g. "What must be researched before launch"). */
export function RowList({
  rows,
  numbered = false,
}: {
  rows: { title: string; description: ReactNode }[]
  numbered?: boolean
}) {
  const Tag = numbered ? "ol" : "ul"
  return (
    <Tag role="list" className="flex flex-col gap-3">
      {rows.map((row, index) => (
        <Card
          as="li"
          key={row.title}
          className="grid gap-1 p-5 sm:grid-cols-[minmax(10rem,14rem)_1fr] sm:gap-6 sm:p-6"
        >
          <div className="flex items-baseline gap-4">
            {numbered && (
              <span
                aria-hidden="true"
                className="font-heading text-lg font-semibold text-text-accent tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <h3 className="font-sans text-[0.9375rem] font-bold tracking-normal">
              {row.title}
            </h3>
          </div>
          <div className="text-sm leading-relaxed text-text-muted">{row.description}</div>
        </Card>
      ))}
    </Tag>
  )
}
