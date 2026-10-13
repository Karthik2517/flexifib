import { Suspense } from "react"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata = { title: "Create an account" }
export default function SignupPage() {
  return <Suspense fallback={<p className="container-page py-20">Loading your account…</p>}><AuthForm mode="signup" /></Suspense>
}
