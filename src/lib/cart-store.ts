"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { clampQuantity, type CartLine } from "./pricing"

type CartState = {
  ownerId: string | null
  setOwner: (ownerId: string | null) => void
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
      ownerId: null,
      setOwner: (ownerId) => set((state) => state.ownerId === ownerId
        ? {}
        : { ownerId, lines: [], isOpen: false }),
      lines: [],
      isOpen: false,
      hydrated: false,
      add: (slug, quantity = 1) =>
        set((state) => {
          if (!state.ownerId) return {}
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
      open: () => set((state) => ({ isOpen: !!state.ownerId })),
      close: () => set({ isOpen: false }),
      setOpen: (isOpen) => set((state) => ({ isOpen: isOpen && !!state.ownerId })),
    }),
    {
      name: "flexifib-basket",
      version: 2,
      // Anonymous baskets from before account access are intentionally discarded.
      migrate: () => ({ ownerId: null, lines: [] }),
      storage: safeStorage,
      // Rehydrated manually after mount so server and client HTML match.
      skipHydration: true,
      partialize: (state) => ({ ownerId: state.ownerId, lines: state.lines }),
      onRehydrateStorage: () => () => {
        useCart.setState({ hydrated: true })
      },
    }
  )
)

export const selectCount = (state: CartState) =>
  state.lines.reduce((sum, line) => sum + line.quantity, 0)
