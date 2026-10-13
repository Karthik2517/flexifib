"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  THEME_COLORS,
  THEME_COLOR_SCHEMES,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme"

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = THEME_COLOR_SCHEMES[theme]

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme])

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // The current page can still switch themes when storage is unavailable.
  }
}

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"
    applyTheme(nextTheme)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="theme-toggle"
      onClick={toggleTheme}
    >
      <Moon aria-hidden="true" className="theme-toggle-moon size-5" />
      <Sun aria-hidden="true" className="theme-toggle-sun size-5" />
      <span className="theme-toggle-label-dark sr-only">Switch to dark theme</span>
      <span className="theme-toggle-label-light sr-only">Switch to light theme</span>
    </Button>
  )
}
