"use client"

import dynamic from "next/dynamic"
import type { InterestValues } from "@/lib/forms"
import { DeferredMount, FormSkeleton } from "./deferred-mount"

const InterestForm = dynamic(
  () => import("./email-capture").then((module) => module.InterestForm),
  { loading: () => <FormSkeleton compact /> }
)

export function DeferredInterestForm({
  programme,
  inverse = false,
}: {
  programme: InterestValues["programme"]
  inverse?: boolean
}) {
  return <DeferredMount compact><InterestForm programme={programme} inverse={inverse} /></DeferredMount>
}
