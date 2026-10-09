"use client"

import { Minus, Plus } from "lucide-react"
import { shipping } from "@/content/products"
import { cn } from "@/lib/utils"

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  size = "default",
  className,
}: {
  value: number
  onChange: (value: number) => void
  /** Accessible name, e.g. "Quantity of Launch Toothbrush — Soft" */
  label: string
  min?: number
  size?: "default" | "sm"
  className?: string
}) {
  const max = shipping.maxQuantityPerLine
  const buttonClass = cn(
    "flex items-center justify-center text-text-brand transition-colors duration-(--duration-micro) hover:bg-surface-tint disabled:pointer-events-none disabled:opacity-35",
    size === "sm" ? "size-9" : "size-11"
  )

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-md border border-input bg-surface-raised",
        className
      )}
    >
      <button
        type="button"
        className={cn(buttonClass, "rounded-l-md")}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" />
      </button>
      <output
        aria-live="polite"
        aria-label="Quantity"
        className={cn(
          "min-w-8 text-center font-semibold tabular-nums",
          size === "sm" ? "text-sm" : "text-base"
        )}
      >
        {value}
      </output>
      <button
        type="button"
        className={cn(buttonClass, "rounded-r-md")}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}
