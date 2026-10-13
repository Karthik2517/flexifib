"use client"

import { useId } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import {
  interestSchema,
  newsletterSchema,
  type InterestValues,
} from "@/lib/forms"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { FormAlert, FormSuccess, Honeypot, SubmitButton } from "./fields"
import { useServerForm } from "./use-server-form"

function InlineEmailForm({
  label,
  submitLabel,
  inverse,
  onSubmit,
  registration,
  error,
  pending,
  status,
  honeypot,
}: {
  label: string
  submitLabel: string
  inverse: boolean
  onSubmit: () => void
  registration: UseFormRegisterReturn<"email">
  error?: string
  pending: boolean
  status: { state: string; message?: string }
  honeypot: React.RefObject<HTMLInputElement | null>
}) {
  const id = useId()
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      noValidate
      className="relative flex w-full flex-col gap-2"
    >
      <Honeypot inputRef={honeypot} />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn("sm:flex-1", inverse && "border-transparent")}
          {...registration}
        />
        <SubmitButton
          pending={pending}
          pendingLabel="Joining…"
          className={cn(inverse && "btn-inverse text-forest-900")}
        >
          {submitLabel}
        </SubmitButton>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className={cn("text-sm", inverse ? "text-sand-200" : "text-destructive")}
        >
          {error}
        </p>
      )}
      {status.state === "error" && status.message && <FormAlert message={status.message} />}
    </form>
  )
}

export function NewsletterForm({ inverse = false }: { inverse?: boolean }) {
  const { form, onSubmit, status, isPending, honeypot } = useServerForm(
    "newsletter",
    newsletterSchema,
    { email: "" }
  )
  if (status.state === "success") return <FormSuccess message={status.message} inverse={inverse} />
  return (
    <InlineEmailForm
      label="Email address for FlexiFib journey updates"
      submitLabel="Join updates"
      inverse={inverse}
      onSubmit={onSubmit}
      registration={form.register("email")}
      error={form.formState.errors.email?.message}
      pending={isPending}
      status={status}
      honeypot={honeypot}
    />
  )
}

export function InterestForm({
  programme,
  inverse = false,
}: {
  programme: InterestValues["programme"]
  inverse?: boolean
}) {
  const { form, onSubmit, status, isPending, honeypot } = useServerForm(
    "interest",
    interestSchema,
    { email: "", programme },
    { programme }
  )
  if (status.state === "success") return <FormSuccess message={status.message} inverse={inverse} />
  return (
    <InlineEmailForm
      label={`Email address to register interest in ${programme}`}
      submitLabel="Register interest"
      inverse={inverse}
      onSubmit={onSubmit}
      registration={form.register("email")}
      error={form.formState.errors.email?.message}
      pending={isPending}
      status={status}
      honeypot={honeypot}
    />
  )
}
