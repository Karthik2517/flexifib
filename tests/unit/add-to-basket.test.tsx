import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LazyMotion, domAnimation } from "motion/react"
import { beforeEach, describe, expect, it } from "vitest"
import { AddToBasket } from "@/components/cart/add-to-basket"
import { products } from "@/content/products"
import { useCart } from "@/lib/cart-store"

describe("<AddToBasket />", () => {
  beforeEach(() => useCart.setState({ lines: [], isOpen: false }))

  it("adds the chosen quantity and announces it", async () => {
    const user = userEvent.setup()
    render(
      <LazyMotion features={domAnimation}>
        <AddToBasket product={products[0]} />
      </LazyMotion>
    )
    await user.click(screen.getByRole("button", { name: "Increase quantity" }))
    await user.click(screen.getByRole("button", { name: /add to basket/i }))
    expect(useCart.getState().lines).toEqual([{ slug: products[0].slug, quantity: 2 }])
    expect(screen.getByText(/added to basket/i)).toBeInTheDocument()
  })

  it("disables decrease at the minimum", () => {
    render(
      <LazyMotion features={domAnimation}>
        <AddToBasket product={products[0]} />
      </LazyMotion>
    )
    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeDisabled()
  })
})
