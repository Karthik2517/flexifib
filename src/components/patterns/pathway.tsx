import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Numbered development pathway. Rendered as an ordered list so the sequence is
 * announced by screen readers; arrows are decorative.
 */
export function Pathway({
  steps,
  variant = "circle",
  className,
}: {
  steps: { title: string; description?: string }[]
  variant?: "circle" | "numeral"
  className?: string
}) {
  const count = steps.length
  const compact = steps.every((step) => !step.description)
  return (
    <ol
      data-reveal="stagger"
      className={cn(
        "grid gap-3 sm:grid-cols-2",
        compact
          ? "grid-cols-2 max-lg:[&>*:last-child:nth-child(odd)]:col-span-2"
          : "sm:max-lg:[&>*:last-child:nth-child(odd)]:col-span-2",
        count === 5 && "lg:grid-cols-5",
        // Six steps are too narrow side by side on a small laptop.
        count === 6 && "lg:grid-cols-3 xl:grid-cols-6",
        count === 4 && "lg:grid-cols-4",
        className
      )}
    >
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex">
          <div
            data-card=""
            className={cn(
              "flex w-full flex-col gap-3 rounded-xl border border-border bg-surface-raised p-5 shadow-(--shadow-card)",
              // Phones: number beside the text keeps each step compact.
              !compact && "max-sm:flex-row max-sm:gap-4 max-sm:p-4"
            )}
          >
            {variant === "circle" ? (
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground tabular-nums"
              >
                {index + 1}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className="font-heading text-lg font-semibold text-text-accent tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <div>
              <h3 className="eyebrow text-[0.75rem] tracking-[0.06em] break-words hyphens-auto text-text-brand">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              {step.description && (
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              )}
            </div>
          </div>
          {index < count - 1 && (
            <ArrowRight
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 -right-3 z-10 hidden size-4 -translate-y-1/2 text-text-accent",
                count === 6 ? "xl:block" : "lg:block"
              )}
            />
          )}
        </li>
      ))}
    </ol>
  )
}
