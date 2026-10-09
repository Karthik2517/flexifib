"use client"

import Link from "next/link"
import {
  businessInterests,
  businessSchema,
  businessTypes,
  type BusinessValues,
} from "@/lib/forms"
import {
  FormAlert,
  FormSuccess,
  Honeypot,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "./fields"
import { useServerForm } from "./use-server-form"

export function BusinessForm({
  defaultInterest = "",
}: {
  defaultInterest?: BusinessValues["interest"] | ""
}) {
  const { form, onSubmit, status, isPending, honeypot, reset } = useServerForm(
    "business",
    businessSchema,
    {
      name: "",
      company: "",
      email: "",
      country: "",
      type: "",
      interest: "",
      scale: "",
      message: "",
    },
    defaultInterest ? { interest: defaultInterest } : undefined
  )
  const { register, formState } = form
  const errors = formState.errors

  if (status.state === "success") {
    return <FormSuccess message={status.message} onReset={reset} resetLabel="Send another enquiry" />
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot inputRef={honeypot} />
      <TextField label="Full name" autoComplete="name" registration={register("name")} error={errors.name} />
      <TextField
        label="Company / organisation"
        autoComplete="organization"
        registration={register("company")}
        error={errors.company}
      />
      <TextField
        label="Work email"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
      />
      <TextField
        label="Country"
        autoComplete="country-name"
        registration={register("country")}
        error={errors.country}
      />
      <SelectField
        label="Enquiry type"
        options={businessTypes}
        registration={register("type")}
        error={errors.type}
      />
      <TextField
        label="Estimated quantity / scale"
        optional
        registration={register("scale")}
        error={errors.scale}
      />
      <SelectField
        label="Product or programme of interest"
        options={businessInterests}
        registration={register("interest")}
        error={errors.interest}
        className="sm:col-span-2"
      />
      <TextAreaField
        label="Tell us about your requirement"
        hint="Application, volumes, performance requirements and target timeline all help us route your enquiry."
        registration={register("message")}
        error={errors.message}
        rows={6}
        className="sm:col-span-2"
      />
      <div className="flex flex-col gap-4 sm:col-span-2">
        {status.state === "error" && <FormAlert message={status.message} />}
        <p className="text-xs text-text-muted">
          We’ll use these details only to respond to your enquiry. See our{" "}
          <Link href="/legal/privacy" className="underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
        <SubmitButton pending={isPending} className="w-full sm:w-fit">
          Send enquiry
        </SubmitButton>
      </div>
    </form>
  )
}
