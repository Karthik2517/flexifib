"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { clampQuantity, type CartLine } from "./pricing"

type CartState = {
  lines: CartLine[]
  isOpen: boolean
  hydrated: boolean
  add: (slug: string, quantity?: number) => void
  setQuantity: (slug: string, quantity: number) => void
  remove: (slug: string) => void
  clear: () => void
  open: () => void
  close: () => void
  setOpen: (open: boolean) => void
}

/** Safe storage: private mode / blocked storage must never break the basket. */
const safeStorage = createJSONStorage(() => {
  try {
    const probe = "__ff_probe__"
    window.localStorage.setItem(probe, probe)
    window.localStorage.removeItem(probe)
    return window.localStorage
  } catch {
    const memory = new Map<string, string>()
    return {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => void memory.set(key, value),
      removeItem: (key: string) => void memory.delete(key),
    }
  }
})

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      hydrated: false,
      add: (slug, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.slug === slug)
          const lines = existing
            ? state.lines.map((line) =>
                line.slug === slug
                  ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
                  : line
              )
            : [...state.lines, { slug, quantity: clampQuantity(quantity) }]
          return { lines }
        }),
      setQuantity: (slug, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.slug !== slug)
              : state.lines.map((line) =>
                  line.slug === slug ? { ...line, quantity: clampQuantity(quantity) } : line
                ),
        })),
      remove: (slug) =>
        set((state) => ({ lines: state.lines.filter((line) => line.slug !== slug) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "flexifib-basket",
      version: 1,
      storage: safeStorage,
      // Rehydrated manually after mount so server and client HTML match.
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => () => {
        useCart.setState({ hydrated: true })
      },
    }
  )
)

export const selectCount = (state: CartState) =>
  state.lines.reduce((sum, line) => sum + line.quantity, 0)
