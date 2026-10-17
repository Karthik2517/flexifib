import { Suspense } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthFormSkeleton } from "@/components/auth/auth-skeleton"

export const metadata = { title: "Log in" }
export default function LoginPage() {
  return <Suspense fallback={<AuthFormSkeleton />}><AuthForm mode="login" /></Suspense>
}
