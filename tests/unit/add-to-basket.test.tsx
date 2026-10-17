// @vitest-environment jsdom
import "./dom-setup"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LazyMotion, domAnimation } from "motion/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { AddToBasket } from "@/components/cart/add-to-basket"
import { products } from "@/content/products"
import { useCart } from "@/lib/cart-store"

const auth = vi.hoisted(() => ({ user: { id: "customer-a" } as { id: string } | null, loading: false }))
vi.mock("@/components/auth/auth-provider", () => ({ useAuth: () => auth }))
vi.mock("next/navigation", () => ({ usePathname: () => "/shop/launch-toothbrush-soft" }))

describe("<AddToBasket />", () => {
  beforeEach(() => {
    auth.user = { id: "customer-a" }
    auth.loading = false
    useCart.setState({ lines: [], isOpen: false, ownerId: "customer-a" })
  })

  it("asks guests to log in and preserves their product destination", () => {
    auth.user = null
    render(<AddToBasket product={products[0]} />)
    expect(screen.getByRole("link", { name: "Log in to add to basket" })).toHaveAttribute("href", "/login?next=%2Fshop%2Flaunch-toothbrush-soft")
    expect(screen.queryByRole("button", { name: /add to basket/i })).not.toBeInTheDocument()
    expect(useCart.getState().lines).toEqual([])
  })

  it("does not expose the basket while the session is loading", () => {
    auth.loading = true
    render(<AddToBasket product={products[0]} />)
    expect(screen.getByRole("button", { name: "Checking account…" })).toBeDisabled()
  })

  it("adds the chosen quantity and announces it", async () => {
    const user = userEvent.setup()
    render(
      <LazyMotion features={domAnimation}>
        <AddToBasket product={products[0]} />
      </LazyMotion>
    )
    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeDisabled()
    await user.click(screen.getByRole("button", { name: "Increase quantity" }))
    await user.click(screen.getByRole("button", { name: /add to basket/i }))
    expect(useCart.getState().lines).toEqual([{ slug: products[0].slug, quantity: 2 }])
    expect(screen.getByText(/added to basket/i)).toBeInTheDocument()
  })

})
