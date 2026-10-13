import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mocks = vi.hoisted(() => ({
  signInWithOAuth: vi.fn(),
  query: "next=%2Fshop%2Flaunch-toothbrush-soft",
  state: { user: null as { id: string; email: string } | null, loading: false, configured: true },
}))
vi.mock("@/lib/auth/client", () => ({ getAuthClient: () => ({ auth: mocks }) }))
vi.mock("@/components/auth/auth-provider", () => ({ useAuth: () => mocks.state }))
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(mocks.query) }))
import { AuthForm } from "@/components/auth/auth-form"

describe("social account options", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.state = { user: null, loading: false, configured: true }
    mocks.query = "next=%2Fshop%2Flaunch-toothbrush-soft"
    mocks.signInWithOAuth.mockResolvedValue({ data: { url: "https://provider.example/authorize" }, error: null })
  })

  it.each(["login", "signup"] as const)("offers only Google and Apple on %s", (mode) => {
    const { container } = render(<AuthForm mode={mode} />)
    const action = mode === "signup" ? "Sign up with " : "Log in with "
    expect(screen.getByRole("button", { name: action + "Google" })).toBeEnabled()
    expect(screen.getByRole("button", { name: action + "Apple" })).toBeEnabled()
    expect(container.querySelector("input")).toBeNull()
    expect(screen.queryByRole("link", { name: /forgot password/i })).not.toBeInTheDocument()
  })

  it.each(["google", "apple"] as const)("starts %s OAuth and preserves the product return destination", async (provider) => {
    const user = userEvent.setup()
    render(<AuthForm mode="signup" />)
    const name = provider === "google" ? "Google" : "Apple"
    await user.click(screen.getByRole("button", { name: "Sign up with " + name }))
    expect(mocks.signInWithOAuth).toHaveBeenCalledWith({
      provider,
      options: { redirectTo: window.location.origin + "/auth/callback?next=%2Fshop%2Flaunch-toothbrush-soft" },
    })
    expect(screen.getByRole("button", { name: "Connecting to " + name + "…" })).toBeDisabled()
    expect(screen.getAllByRole("button").every((button) => button.hasAttribute("disabled"))).toBe(true)
  })

  it("re-enables the options if the provider returns an error", async () => {
    mocks.signInWithOAuth.mockResolvedValue({ data: { url: null }, error: { message: "Provider disabled" } })
    const user = userEvent.setup()
    render(<AuthForm mode="login" />)
    await user.click(screen.getByRole("button", { name: "Log in with Google" }))
    expect(await screen.findByRole("alert")).toHaveTextContent("couldn’t connect to Google")
    expect(screen.getByRole("button", { name: "Log in with Apple" })).toBeEnabled()
  })

  it("handles a network failure without leaving the buttons stuck", async () => {
    mocks.signInWithOAuth.mockRejectedValue(new Error("Network unavailable"))
    const user = userEvent.setup()
    render(<AuthForm mode="login" />)
    await user.click(screen.getByRole("button", { name: "Log in with Apple" }))
    expect(await screen.findByRole("alert")).toHaveTextContent("couldn’t connect to Apple")
    expect(screen.getByRole("button", { name: "Log in with Apple" })).toBeEnabled()
  })

  it("rejects an external return destination", async () => {
    mocks.query = "next=https%3A%2F%2Fevil.example"
    const user = userEvent.setup()
    render(<AuthForm mode="login" />)
    await user.click(screen.getByRole("button", { name: "Log in with Google" }))
    expect(mocks.signInWithOAuth).toHaveBeenCalledWith(expect.objectContaining({
      options: { redirectTo: window.location.origin + "/auth/callback?next=%2Fshop" },
    }))
  })

  it("shows a retry message when sign-in is cancelled", () => {
    mocks.query = "error=oauth"
    render(<AuthForm mode="login" />)
    expect(screen.getByRole("alert")).toHaveTextContent("Sign-in wasn’t completed")
  })

  it("does not start OAuth without configuration", () => {
    mocks.state.configured = false
    render(<AuthForm mode="signup" />)
    expect(screen.getByRole("button", { name: "Sign up with Google" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Sign up with Apple" })).toBeDisabled()
    expect(screen.getByRole("status")).toHaveTextContent("temporarily unavailable")
  })

  it("lets an already signed-in customer return to their product", () => {
    mocks.state.user = { id: "customer", email: "customer@example.test" }
    render(<AuthForm mode="login" />)
    expect(screen.getByRole("link", { name: "Continue shopping" })).toHaveAttribute("href", "/shop/launch-toothbrush-soft")
    expect(screen.queryByRole("button", { name: "Log in with Google" })).not.toBeInTheDocument()
  })
})
