"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState, useTransition } from "react"
import { useForm, type DefaultValues, type FieldValues, type Path } from "react-hook-form"
import type { z } from "zod/mini"
import { submitForm } from "@/app/actions/forms"
import { trackLead } from "@/lib/analytics"
import type { FormKind } from "@/lib/forms"

type Status =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "error"; message: string }

/**
 * React Hook Form + Zod on the client, the same Zod schema again on the server.
 * Client validation is instant; the server remains the source of truth.
 */
export function useServerForm<TInput extends FieldValues, TOutput extends FieldValues>(
  kind: FormKind,
  schema: z.ZodMiniType<TOutput, TInput>,
  /** Blank values used when the form is reset after a successful send. */
  emptyValues: DefaultValues<TInput>,
  /**
   * Only genuine pre-fills (e.g. a programme from the URL). Text fields are
   * deliberately left out so React Hook Form adopts whatever the visitor typed
   * before hydration finished, instead of overwriting it with "".
   */
  prefill?: DefaultValues<TInput>
) {
  const form = useForm<TInput, unknown, TOutput>({
    resolver: zodResolver(schema),
    defaultValues: prefill,
    mode: "onTouched",
  })
  const [status, setStatus] = useState<Status>({ state: "idle" })
  const [isPending, startTransition] = useTransition()
  const startedAt = useRef(0)
  const honeypot = useRef<HTMLInputElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const submit = (values: TOutput) => {
    setStatus({ state: "idle" })
    startTransition(async () => {
      const result = await submitForm(kind, {
        ...values,
        website: honeypot.current?.value ?? "",
        startedAt: startedAt.current || Date.now(),
      })
      if (result.ok) {
        trackLead(kind)
        setStatus({ state: "success", message: result.message })
        form.reset(emptyValues)
        return
      }
      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          if (messages?.[0]) {
            form.setError(field as Path<TInput>, { message: messages[0] }, { shouldFocus: true })
          }
        }
      }
      setStatus({ state: "error", message: result.message })
    })
  }

  // handleSubmit runs in the event handler, never during render.
  const onSubmit = (event?: React.BaseSyntheticEvent) => form.handleSubmit(submit)(event)

  return {
    form,
    onSubmit,
    status,
    isPending,
    honeypot,
    reset: () => setStatus({ state: "idle" }),
  }
}
