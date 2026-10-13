"use client"

import { createBrowserClient } from "@supabase/ssr"
import { getAuthConfig } from "./config"

export function getAuthClient() {
  const config = getAuthConfig()
  return config ? createBrowserClient(config.url, config.key) : null
}
