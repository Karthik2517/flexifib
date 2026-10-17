"use client"

import dynamic from "next/dynamic"
import { DeferredMount, FormSkeleton } from "./deferred-mount"

const ContactForm = dynamic(
  () => import("./contact-form").then((module) => module.ContactForm),
  { loading: () => <FormSkeleton /> }
)

export function DeferredContactForm() {
  return <DeferredMount><ContactForm /></DeferredMount>
}
