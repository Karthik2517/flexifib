"use client"

import { useSearchParams } from "next/navigation"
import { businessInterests, type BusinessValues } from "@/lib/forms"
import { BusinessForm } from "./business-form"

/** Pre-selects the programme when arriving from e.g. /business?interest=flexipack */
export function BusinessFormFromUrl() {
  const interest = useSearchParams().get("interest")
  const valid = businessInterests.some((option) => option.value === interest)
  return (
    <BusinessForm
      key={interest ?? "none"}
      defaultInterest={valid ? (interest as BusinessValues["interest"]) : ""}
    />
  )
}
