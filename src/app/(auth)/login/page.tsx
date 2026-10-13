import { Suspense } from "react"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata = { title: "Log in" }
export default function LoginPage() {
  return <Suspense fallback={<p className="container-page py-20">Loading your account…</p>}><AuthForm mode="login" /></Suspense>
}
