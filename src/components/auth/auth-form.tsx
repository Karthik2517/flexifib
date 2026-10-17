"use client"

import Link from "next/link"
import Image from "next/image"
import hempField from "@/assets/images/hemp-field.webp"
import { useSearchParams } from "next/navigation"
import { useId, useState } from "react"
import { ArrowLeft, ArrowUpRight, Info, Leaf, Loader2, LockKeyhole } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { FormAlert } from "@/components/forms/fields"
import { getAuthClient } from "@/lib/auth/client"
import { loginHref, safeNext } from "@/lib/auth/config"
import { useAuth } from "./auth-provider"
import "./auth.css"

export type AuthMode = "login" | "signup"
type SocialProvider = "google" | "apple"

function ProviderIcon({ provider }: { provider: SocialProvider }) {
  return provider === "google" ? (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" className="size-5">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.4 38.04 46.98 31.88 46.98 24.55Z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.41 14.41 0 0 1 9.75 24c0-1.59.27-3.13.78-4.59l-7.98-6.19A23.87 23.87 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
    </svg>
  ) : (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M17.05 12.04c.03 3.26 2.86 4.35 2.89 4.36-.02.08-.45 1.55-1.49 3.07-.9 1.31-1.83 2.62-3.3 2.65-1.44.03-1.9-.85-3.54-.85-1.64 0-2.16.82-3.51.88-1.42.05-2.5-1.42-3.4-2.72-1.85-2.68-3.26-7.58-1.36-10.89a5.27 5.27 0 0 1 4.45-2.7c1.39-.03 2.7.93 3.55.93.85 0 2.45-1.15 4.13-.98.7.03 2.67.28 3.93 2.13-.1.06-2.35 1.37-2.32 4.12ZM14.35 4.13c.75-.91 1.25-2.18 1.11-3.44-1.08.04-2.39.72-3.17 1.63-.7.8-1.31 2.09-1.14 3.33 1.21.09 2.45-.61 3.2-1.52Z" />
    </svg>
  )
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const params = useSearchParams()
  const next = safeNext(params.get("next"))
  const { configured, user, loading } = useAuth()
  const [pending, setPending] = useState<SocialProvider | null>(null)
  const [error, setError] = useState<string | null>(null)
  const title = mode === "signup" ? "Join FlexiFib" : "Welcome back"
  const titleId = useId()
  const noticeId = useId()

  async function continueWith(provider: SocialProvider) {
    if (pending || !configured || loading) return
    setError(null)
    setPending(provider)
    try {
      const client = getAuthClient()
      if (!client) throw new Error("Auth unavailable")
      const callback = new URL("/auth/callback", window.location.origin)
      callback.searchParams.set("next", next)
      // Supabase handles OAuth state/PKCE and redirects to the provider.
      const { data, error } = await client.auth.signInWithOAuth({
        provider,
        options: { redirectTo: callback.toString() },
      })
      if (error || !data.url) throw new Error("Could not start OAuth")
      // Keep both buttons disabled while the browser leaves for the provider.
    } catch {
      const name = provider === "google" ? "Google" : "Apple"
      setError("We couldn’t connect to " + name + ". Please try again or use the other sign-in option.")
      setPending(null)
    }
  }

  return (
    <section className="container-page ff-auth-page" aria-labelledby={titleId}>
      <div className="ff-auth-frame">
        <Link href="/shop" className="ff-auth-back">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to the shop
        </Link>
        <div className="ff-auth-card">
          <aside className="ff-auth-story" aria-label="The FlexiFib story">
            <Image src={hempField} alt="" fill sizes="(max-width: 767px) 1px, (max-width: 1100px) 50vw, 544px" className="ff-auth-photo" />
            <div className="font-heading ff-auth-wordmark"><Leaf aria-hidden="true" className="size-6" /> FlexiFib</div>
            <div>
              <h2 className="font-heading ff-auth-story-title">Better materials.<br />Everyday living.</h2>
              <p className="ff-auth-story-copy">Discover everyday essentials and follow our journey towards better materials.</p>
              <div className="ff-auth-story-footer"><Leaf aria-hidden="true" className="size-4" /> Rooted in Scotland. Looking ahead.</div>
            </div>
          </aside>

          <div className="ff-auth-panel">
            <p className="ff-auth-eyebrow">A little more considered</p>
            <h1 id={titleId} className="font-heading ff-auth-title">{title}</h1>
            <p className="ff-auth-description">
              {mode === "signup"
                ? "Good to have you here. Create your account with Google or Apple and make yourself at home."
                : "Your next everyday essential is waiting. Sign in to pick up where you left off."}
            </p>
            {params.has("error") && (
              <div className="mt-5"><FormAlert message="Sign-in wasn’t completed. Please choose Google or Apple to try again." /></div>
            )}
            {user && !loading ? (
              <div className="mt-7 space-y-4">
                <p className="break-all text-sm text-text-body">You’re signed in as {user.email}.</p>
                <Link href={next} className={buttonVariants({ size: "lg", className: "w-full" })}>Continue shopping</Link>
                <Link href="/account" className="block text-center text-sm font-semibold text-text-brand underline">Manage account</Link>
              </div>
            ) : (
              <>
                <div className="ff-auth-providers" aria-busy={!!pending}>
                  {error && <FormAlert message={error} />}
                  {(["google", "apple"] as const).map((provider) => {
                    const name = provider === "google" ? "Google" : "Apple"
                    const label = (mode === "signup" ? "Sign up with " : "Log in with ") + name
                    return (
                      <Button
                        key={provider}
                        type="button"
                        variant="ghost"
                        size="lg"
                        className={"ff-auth-provider-button ff-auth-" + provider}
                        disabled={!!pending || !configured || loading}
                        aria-describedby={!configured ? noticeId : undefined}
                        onClick={() => void continueWith(provider)}
                      >
                        {pending === provider ? <Loader2 aria-hidden="true" className="size-5 animate-spin" /> : <ProviderIcon provider={provider} />}
                        <span>{pending === provider ? "Connecting to " + name + "…" : label}</span>
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </Button>
                    )
                  })}
                </div>
                <p className="ff-auth-reassurance"><LockKeyhole aria-hidden="true" className="size-3.5" /> One less password to remember.</p>
                {!configured && (
                  <div id={noticeId} role="status" className="ff-auth-notice">
                    <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <p>Account access is temporarily unavailable. You can still <Link href="/shop" className="font-semibold underline underline-offset-2">explore the collection</Link>.</p>
                  </div>
                )}
              </>
            )}
            <div className="ff-auth-switch">
              {mode === "login"
                ? <>New to FlexiFib? <Link href={"/signup?next=" + encodeURIComponent(next)} className="font-semibold text-text-brand underline underline-offset-3">Create an account</Link></>
                : <>Already part of the journey? <Link href={loginHref(next)} className="font-semibold text-text-brand underline underline-offset-3">Log in</Link></>}
            </div>
            <p className="ff-auth-legal">
              By continuing, you agree to our <Link href="/legal/terms" className="underline underline-offset-2">terms</Link> and acknowledge our <Link href="/legal/privacy" className="underline underline-offset-2">privacy notice</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
