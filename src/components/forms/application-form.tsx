"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useRef, useState, useTransition } from "react"
import { useForm, type FieldError, type Path, type Resolver } from "react-hook-form"
import { submitApplication } from "@/app/actions/careers"
import { contributionAreas } from "@/content/careers"
import { trackLead } from "@/lib/analytics"
import {
  applicationSchema,
  CV_ACCEPT,
  validateCv,
  type ApplicationValues,
} from "@/lib/careers-form"
import {
  CheckboxField,
  FileField,
  FormAlert,
  FormSuccess,
  Honeypot,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "./fields"

type Values = ApplicationValues & { cv?: FileList }

// The CV is a FileList checked by validateCv(); everything else by the shared schema.
const schemaResolver = zodResolver(applicationSchema) as unknown as Resolver<Values>
const resolver: Resolver<Values> = async (values, context, options) => {
  const result = await schemaResolver(values, context, options)
  const cvError = validateCv(values.cv?.[0])
  if (!cvError) return result
  return { values: {}, errors: { ...result.errors, cv: { type: "validate", message: cvError } } }
}

export function ApplicationForm() {
  const form = useForm<Values>({ resolver, mode: "onTouched" })
  const [status, setStatus] = useState<
    { state: "idle" } | { state: "success" | "error"; message: string }
  >({ state: "idle" })
  const [isPending, startTransition] = useTransition()
  const startedAt = useRef(0)
  const honeypot = useRef<HTMLInputElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const submit = (values: Values) => {
    setStatus({ state: "idle" })
    const data = new FormData()
    data.set("name", values.name)
    data.set("email", values.email)
    data.set("location", values.location)
    data.set("link", values.link ?? "")
    data.set("area", values.area)
    data.set("message", values.message)
    data.set("privacy", String(values.privacy === true))
    data.set("website", honeypot.current?.value ?? "")
    data.set("startedAt", String(startedAt.current || Date.now()))
    const file = values.cv?.[0]
    if (file) data.set("cv", file)

    startTransition(async () => {
      const result = await submitApplication(data)
      if (result.ok) {
        trackLead("careers")
        setStatus({ state: "success", message: result.message })
        form.reset()
        return
      }
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        if (messages?.[0]) form.setError(field as Path<Values>, { message: messages[0] }, { shouldFocus: true })
      }
      setStatus({ state: "error", message: result.message })
    })
  }

  // handleSubmit runs in the event handler, never during render.
  const onSubmit = (event?: React.BaseSyntheticEvent) => form.handleSubmit(submit)(event)
  const { register, formState } = form
  const errors = formState.errors

  if (status.state === "success") {
    return (
      <FormSuccess
        message={status.message}
        onReset={() => setStatus({ state: "idle" })}
        resetLabel="Send another application"
      />
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot inputRef={honeypot} />
      <TextField label="Full name" autoComplete="name" registration={register("name")} error={errors.name} />
      <TextField
        label="Email address"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
      />
      <TextField
        label="Current location"
        hint="City and country, and whether you could work on site in Scotland."
        autoComplete="address-level2"
        registration={register("location")}
        error={errors.location}
      />
      <TextField
        label="LinkedIn or portfolio URL"
        optional
        hint="Starting with https://"
        registration={register("link")}
        error={errors.link}
      />
      <SelectField
        label="Area of interest"
        options={contributionAreas}
        registration={register("area")}
        error={errors.area}
        className="sm:col-span-2"
      />
      <TextAreaField
        label="Tell us how you could contribute"
        hint="Relevant experience, what draws you to FlexiFib, and the kind of role you’d like."
        registration={register("message")}
        error={errors.message}
        rows={6}
        className="sm:col-span-2"
      />
      <FileField
        label="Upload CV / résumé"
        optional
        hint="PDF or Word, up to 4 MB."
        accept={CV_ACCEPT}
        registration={register("cv")}
        error={errors.cv as FieldError | undefined}
      />
      <CheckboxField
        className="sm:self-end"
        registration={register("privacy")}
        error={errors.privacy}
        label={
          <>
            I have read the{" "}
            <Link href="/legal/recruitment-privacy" className="font-semibold text-text-brand underline underline-offset-2">
              recruitment privacy notice
            </Link>{" "}
            and understand how FlexiFib will use my application information.
          </>
        }
      />
      <div className="flex flex-col gap-4 sm:col-span-2">
        {status.state === "error" && <FormAlert message={status.message} />}
        <SubmitButton pending={isPending} pendingLabel="Sending application…" className="w-full sm:w-fit">
          Submit interest
        </SubmitButton>
      </div>
    </form>
  )
}
