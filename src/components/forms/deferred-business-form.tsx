"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { DeferredMount, FormSkeleton } from "./deferred-mount"

const BusinessFormFromUrl = dynamic(
  () => import("./business-form-from-url").then((module) => module.BusinessFormFromUrl),
  { loading: () => <FormSkeleton /> }
)

export function DeferredBusinessForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <DeferredMount><BusinessFormFromUrl /></DeferredMount>
    </Suspense>
  )
}
