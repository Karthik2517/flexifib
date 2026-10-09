"use client"

import { create } from "zustand"

import { CONSENT_COOKIE } from "./consent-constants"

export { CONSENT_COOKIE }
const CONSENT_VERSION = 1
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180 // re-ask after six months

export type ConsentChoices = { analytics: boolean }

type ConsentState = {
  /** null until the visitor has made a choice (or before the cookie has been read) */
  choices: ConsentChoices | null
  ready: boolean
  preferencesOpen: boolean
  load: () => void
  save: (choices: ConsentChoices) => void
  setPreferencesOpen: (open: boolean) => void
}

function readCookie(): ConsentChoices | null {
  try {
    const raw = document.cookie
      .split("; ")
      .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
      ?.split("=")[1]
    if (!raw) return null
    const parsed = JSON.parse(decodeURIComponent(raw)) as {
      v?: number
      analytics?: boolean
    }
    if (parsed.v !== CONSENT_VERSION) return null
    return { analytics: parsed.analytics === true }
  } catch {
    return null
  }
}

function writeCookie(choices: ConsentChoices) {
  const value = encodeURIComponent(JSON.stringify({ v: CONSENT_VERSION, ...choices }))
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
}

export const useConsent = create<ConsentState>()((set) => ({
  choices: null,
  ready: false,
  preferencesOpen: false,
  load: () => set({ choices: readCookie(), ready: true }),
  save: (choices) => {
    writeCookie(choices)
    set({ choices, preferencesOpen: false })
  },
  setPreferencesOpen: (preferencesOpen) => set({ preferencesOpen }),
}))
