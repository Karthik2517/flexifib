import { Suspense } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthFormSkeleton } from "@/components/auth/auth-skeleton"

export const metadata = { title: "Create an account" }
export default function SignupPage() {
  return <Suspense fallback={<AuthFormSkeleton />}><AuthForm mode="signup" /></Suspense>
}
