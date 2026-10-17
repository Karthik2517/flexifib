"use client"

import dynamic from "next/dynamic"
import { DeferredMount, FormSkeleton } from "./deferred-mount"

const NewsletterForm = dynamic(
  () => import("./email-capture").then((module) => module.NewsletterForm),
  { loading: () => <FormSkeleton compact /> }
)

export function DeferredNewsletterForm({ inverse = false }: { inverse?: boolean }) {
  return <DeferredMount compact><NewsletterForm inverse={inverse} /></DeferredMount>
}
