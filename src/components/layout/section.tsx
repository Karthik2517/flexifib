import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

const tones = {
  page: "bg-surface-page",
  warm: "bg-surface-warm",
  tint: "bg-surface-tint",
  raised: "bg-surface-raised",
  inverse: "bg-surface-inverse text-text-inverse [&_h2]:text-text-inverse [&_h3]:text-text-inverse",
} as const

export type SectionTone = keyof typeof tones

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...props} />
}

export function Section({
  tone = "page",
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & {
  tone?: SectionTone
  containerClassName?: string
}) {
  return (
    <section className={cn("section-y", tones[tone], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  inverse = false,
  className,
  action,
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  as?: "h1" | "h2"
  inverse?: boolean
  className?: string
  action?: ReactNode
}) {
  return (
    <div
      data-reveal
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <p
            className={cn(
              "eyebrow mb-3",
              inverse ? "text-text-accent-inverse" : "text-text-brand"
            )}
          >
            {eyebrow}
          </p>
        )}
        <Heading id={id} className={cn("text-heading", inverse && "text-text-inverse")}>
          {title}
        </Heading>
        {description && (
          <p
            className={cn(
              "mt-3 max-w-2xl",
              inverse ? "text-text-inverse-muted" : "text-text-muted"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
