import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

afterEach(() => cleanup())

// `server-only` throws outside a React Server environment; it's a no-op in tests.
vi.mock("server-only", () => ({}))
