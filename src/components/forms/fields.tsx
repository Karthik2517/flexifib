"use client"

import { useEffect, useId, useRef } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type BaseProps = {
  label: string
  registration: UseFormRegisterReturn
  error?: FieldError
  hint?: string
  optional?: boolean
  className?: string
}

function FieldShell({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
}: Omit<BaseProps, "registration"> & { id: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {optional && <span className="ml-1 font-normal text-text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      {children}
      {error?.message && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  )
}

function describedBy(id: string, error?: FieldError, hint?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined
}

export function TextField({
  type = "text",
  autoComplete,
  ...props
}: BaseProps & { type?: "text" | "email" | "tel"; autoComplete?: string }) {
  const id = useId()
  return (
    <FieldShell id={id} {...props}>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(id, props.error, props.hint)}
        {...props.registration}
      />
    </FieldShell>
  )
}

export function TextAreaField(props: BaseProps & { rows?: number }) {
  const id = useId()
  return (
    <FieldShell id={id} {...props}>
      <Textarea
        id={id}
        rows={props.rows ?? 5}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(id, props.error, props.hint)}
        {...props.registration}
      />
    </FieldShell>
  )
}

/**
 * Native <select>: the most robust option on mobile (system pickers, no
 * virtual-keyboard conflicts) and fully accessible without extra JavaScript.
 */
export function SelectField({
  options,
  placeholder = "Please choose",
  ...props
}: BaseProps & {
  options: readonly { value: string; label: string }[]
  placeholder?: string
}) {
  const id = useId()
  return (
    <FieldShell id={id} {...props}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={props.error ? true : undefined}
          aria-describedby={describedBy(id, props.error, props.hint)}
          defaultValue=""
          className="h-11 w-full appearance-none rounded-md border border-input bg-surface-raised pr-10 pl-3.5 text-base text-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 focus-visible:outline-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm"
          {...props.registration}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-text-muted"
        />
      </div>
    </FieldShell>
  )
}

/** Native checkbox: fully accessible, large hit area via the wrapping label. */
export function CheckboxField({
  label,
  registration,
  error,
  className,
}: Omit<BaseProps, "label" | "hint" | "optional"> & { label: React.ReactNode }) {
  const id = useId()
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-sm text-text-body">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-input accent-primary"
          {...registration}
        />
        <span>{label}</span>
      </label>
      {error?.message && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  )
}

export function FileField({
  accept,
  ...props
}: BaseProps & { accept: string }) {
  const id = useId()
  return (
    <FieldShell id={id} {...props}>
      <input
        id={id}
        type="file"
        accept={accept}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(id, props.error, props.hint)}
        className="w-full cursor-pointer rounded-md border border-input bg-surface-raised text-sm text-text-body file:mr-3 file:h-11 file:cursor-pointer file:border-0 file:border-r file:border-input file:bg-surface-tint file:px-4 file:font-semibold file:text-text-brand hover:file:bg-surface-tint-strong focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 focus-visible:outline-none aria-invalid:border-destructive"
        {...props.registration}
      />
    </FieldShell>
  )
}

/** Visually hidden field that only bots fill in. */
export function Honeypot({ inputRef }: { inputRef: React.RefObject<HTMLInputElement | null> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input ref={inputRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

export function SubmitButton({
  pending,
  children,
  pendingLabel = "Sending…",
  className,
}: {
  pending: boolean
  children: React.ReactNode
  pendingLabel?: string
  className?: string
}) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      data-loading={pending ? "" : undefined}
      className={className}
    >
      {pending ? (
        <>
          <Loader2 aria-hidden="true" className="animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

export function FormAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex gap-2 rounded-md bg-destructive/10 p-3.5 text-sm text-destructive"
    >
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}

/** Replaces the form after success; takes focus so screen readers announce it. */
export function FormSuccess({
  message,
  onReset,
  resetLabel = "Send another message",
  inverse = false,
}: {
  message: string
  onReset?: () => void
  resetLabel?: string
  inverse?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl p-6 outline-none animate-in fade-in-0 duration-[var(--duration-popover)]",
        inverse ? "bg-white/10 text-text-inverse" : "bg-surface-tint text-foreground"
      )}
    >
      <CheckCircle2
        aria-hidden="true"
        className={cn("size-6", inverse ? "text-text-accent-inverse" : "text-text-brand")}
      />
      <p className="font-semibold">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold underline underline-offset-3"
        >
          {resetLabel}
        </button>
      )}
    </div>
  )
}
