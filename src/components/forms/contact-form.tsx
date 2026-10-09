"use client"

import Link from "next/link"
import { contactSchema, contactTopics, type ContactValues } from "@/lib/forms"
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

const defaults: ContactValues = { name: "", email: "", topic: "", subject: "", message: "" }

export function ContactForm() {
  const { form, onSubmit, status, isPending, honeypot, reset } = useServerForm(
    "contact",
    contactSchema,
    defaults
  )
  const { register, formState } = form
  const errors = formState.errors

  if (status.state === "success") {
    return <FormSuccess message={status.message} onReset={reset} />
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot inputRef={honeypot} />
      <TextField label="Name" autoComplete="name" registration={register("name")} error={errors.name} />
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
      />
      <SelectField
        label="What is your message about?"
        options={contactTopics}
        registration={register("topic")}
        error={errors.topic}
        className="sm:col-span-2"
      />
      <TextField
        label="Subject"
        registration={register("subject")}
        error={errors.subject}
        className="sm:col-span-2"
      />
      <TextAreaField
        label="Message"
        registration={register("message")}
        error={errors.message}
        rows={6}
        className="sm:col-span-2"
      />
      <div className="flex flex-col gap-4 sm:col-span-2">
        {status.state === "error" && <FormAlert message={status.message} />}
        <p className="text-xs text-text-muted">
          We’ll use your details only to reply to this message. See our{" "}
          <Link href="/legal/privacy" className="underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
        <SubmitButton pending={isPending} className="w-full sm:w-fit">
          Send message
        </SubmitButton>
      </div>
    </form>
  )
}
