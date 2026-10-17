import { defineConfig, devices } from "@playwright/test"

const PORT = 3100
const baseURL = `http://localhost:${PORT}`
const full = process.env.E2E_FULL === "1"

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    // Entrance animations would otherwise race axe's contrast checks and screenshots.
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
      // Touch navigation and responsive auth are the distinct mobile risks.
      testMatch: ["keyboard.spec.ts", "auth.spec.ts", "navigation.spec.ts"],
    },
    ...(full ? [
      { name: "firefox", use: { ...devices["Desktop Firefox"] } },
      { name: "webkit", use: { ...devices["Desktop Safari"] } },
      { name: "mobile-safari", use: { ...devices["iPhone 15"] } },
      { name: "tablet-safari", use: { ...devices["iPad Mini"] } },
    ] : []),
  ],
  webServer: {
    // CI builds once, then this server reuses that exact production artifact.
    command: process.env.E2E_SKIP_BUILD === "1"
      ? `npm run start -- -p ${PORT}`
      : `npm run build && npm run start -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
})
