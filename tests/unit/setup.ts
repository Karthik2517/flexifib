import { vi } from "vitest"

// `server-only` throws outside a React Server environment; it's a no-op in tests.
vi.mock("server-only", () => ({}))
