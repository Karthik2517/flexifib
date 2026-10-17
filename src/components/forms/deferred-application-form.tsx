"use client"

import dynamic from "next/dynamic"
import { DeferredMount, FormSkeleton } from "./deferred-mount"

const ApplicationForm = dynamic(
  () => import("./application-form").then((module) => module.ApplicationForm),
  { loading: () => <FormSkeleton /> }
)

export function DeferredApplicationForm() {
  return <DeferredMount><ApplicationForm /></DeferredMount>
}
