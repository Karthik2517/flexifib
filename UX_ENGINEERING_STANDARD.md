# FlexiFib UX Engineering Standard

UX is an engineering system with measurable standards, not a visual-design exercise. Everyone who designs, builds or reviews the FlexiFib storefront follows this document. Where it says **must**, CI enforces it or review blocks it.

---

## 1. Stack

| Layer | Choice | Rule |
|---|---|---|
| Framework | Next.js 16 App Router, `cacheComponents` + `partialPrefetching` | Server Components by default |
| UI runtime | React 19.3 | — |
| Language | TypeScript, `strict` | No `any` in app code |
| Styling | Tailwind CSS 4.3 + design tokens in `src/app/globals.css` | No raw hex/px values in components |
| Components | shadcn/ui (owned source in `src/components/ui`) on Base UI 1.9 | Behaviour from Base UI, look from tokens |
| Motion | Motion (`LazyMotion`, features loaded async) | See §6 |
| Icons | Lucide React | One icon set only |
| Forms | React Hook Form + Zod (`zod/mini`) | One schema, shared by client and server |
| Client state | Zustand — basket and consent only | Shareable state belongs in the URL |
| Tests | Vitest + Testing Library, Playwright + axe, Storybook | See §9 |

**Not permitted without a written case and a measured bundle impact:** Redux, MUI, Chakra, Ant, Bootstrap, jQuery, GSAP, three.js, carousel libraries, a second icon/toast/modal/state library.

### Every `"use client"` must answer: *why does this need browser JavaScript?*

Current client islands and their reason:

| Component | Why it is client-side |
|---|---|
| `NavLinks`, `MobileNav` | Active-route state; menu drawer |
| `CartButton`, `CartRoot` (+ lazy `CartDrawer`) | Persisted basket |
| `AddToBasket`, `QuantityStepper` | Interaction |
| `SortSelect`, `SortedGrid`, `CheckoutCancelledNotice` | URL search params |
| Forms (`ContactForm`, `BusinessForm`, `NewsletterForm`, `InterestForm`) | Validation and submission |
| `CookieConsent` (+ lazy `CookiePreferences`), `Analytics` | Consent state, GA4 loader, RUM |
| `OrderComplete` | Clears basket once per paid session |

Expensive, rarely used UI is loaded with `next/dynamic` (basket drawer, cookie preferences).

---

## 2. Performance budgets

Field targets (75th percentile, real mobile users):

| Metric | Google "good" | **FlexiFib target** |
|---|---:|---:|
| LCP | ≤ 2.5 s | **< 1.8 s** |
| INP | ≤ 200 ms | **< 150 ms** |
| CLS | ≤ 0.10 | **< 0.05** |
| TTFB (cached) | — | **< 500 ms** |

The Lighthouse budget check (`npm run test:perf`, mobile, applied throttling — `lighthouserc.json`) is run before release rather than in CI, because shared CI runners measure too noisily to gate merges. It fails when:

- LCP > 2.5 s, CLS > 0.05 or TBT > 200 ms (median of 3 runs)
- script transfer > 340 KB on any audited page
- any third-party request appears on page load
- accessibility, SEO or best-practices score < 95

Baseline at launch of this standard (Lighthouse, slow 4G + 4× CPU): LCP 1.7–2.2 s, CLS 0, TBT ≤ 60 ms.

### Images

- Use `next/image` with static imports (dimensions + blur placeholder come free).
- Always set `sizes`. AVIF/WebP are served automatically.
- The hero/LCP image uses `preload`; **never** lazy-load above-the-fold images. Everything else lazy-loads by default.
- Source images ≤ 2400 px on the long edge, compressed before commit.

### Fonts

- Two variable families via `next/font` (Inter, Source Serif 4), self-hosted, `display: swap`, size-adjusted fallbacks. No other font requests.

### Third-party scripts

No third-party script enters production without (a) a consent category, (b) a measured INP/LCP impact on a preview deploy, and (c) a line in the cookie policy. GA4 loads **only** after analytics consent.

---

## 3. Navigation & loading

- Navigations must feel instant: the shell stays, content streams in. Verified with `@next/playwright`'s `instant()` in `tests/e2e/navigation.spec.ts`.
- Routes that read `params`/`searchParams` must either sit behind a `<Suspense>` boundary with a same-size fallback or be linked with `prefetch` (product cards do this).
- No full-page spinners. Skeletons match the final layout's dimensions; content arriving late must not move buttons, prices or text (CLS).
- The Back button always works. Shareable state (sort, programme pre-selection) lives in the URL.
- Next.js keeps up to three visited routes alive (`<Activity>`). Never use hard-coded DOM `id`s in reusable components — use `useId()` — and make effects idempotent (see `OrderComplete`).

---

## 4. Design system

### Tokens (three layers, `src/app/globals.css`)

1. **Primitive** — `--color-forest-900`, `--color-sand-100`… never used directly in components.
2. **Semantic** — `--surface-*`, `--text-*`, `--border-*`, `--action-*`, `--focus-ring`, durations, spacing.
3. **Component** — shadcn variables (`--primary`, `--card`…) mapped onto the semantic layer.

Rebranding means editing layers 1–2 only.

### Scale

- Spacing: Tailwind's 4 px scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128).
- Layout primitives: `Container`, `Section` (tones: page, warm, tint, raised, inverse), `SectionHeader`, `CardGrid`, `--gutter`, `--section-y`. Don't hand-roll margins between sections.
- Type: fluid `clamp()` scale — `text-display`, `text-title`, `text-heading`, `text-subheading`, `text-lead`. Serif for headings, Inter for UI and body.
- Radii: `--radius` derived (`rounded-md` controls, `rounded-xl` cards, `rounded-2xl` bands).
- Elevation: `--shadow-card`, `--shadow-card-hover`, `--shadow-drawer` only.

### Visual direction: quiet premium

Strong typography, large photography, generous space, fine borders, subtle elevation, consistent radii. No glassmorphism stacks, neon gradients, cursor effects, scroll hijacking or 3D.

### Content honesty is part of the design

- Every product and programme carries a status label: *Available now, In development, Future programme, B2B development, Concept*. **A future product must never look purchasable.**
- Green claims listed in `src/content/sustainability.ts` (`guardedClaims`) are not published for a product without evidence for that exact product.
- Unverified product attributes render as "Awaiting supplier confirmation" — never invented values.
- Reviews: genuine verified reviews only; no `AggregateRating` schema until they exist.

---

## 5. Interaction states

### Customer account pages

#### Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Account entry | `components/auth/auth-form.tsx` | README customer accounts; this section | login / signup | auth unit tests and browser navigation |
| Provider control | shared `Button` plus `ff-auth-provider-button` | DESIGN.md; `components/auth/auth.css` | Google / Apple | light/dark contrast including disabled states |
| Account feedback | shared `FormAlert`; inline status | this section | pending / error / unavailable | auth component tests and browser accessibility |

The shared `components/auth/auth-form.tsx` owns both login and signup presentation and uses the existing Base UI-backed Button and FormAlert primitives. English (UK), the existing Inter/Manrope font roles, and `globals.css` semantic theme tokens remain canonical. The account page pairs material photography with a focused sign-in panel on desktop; on phones, the sign-in panel takes priority and photography is hidden. It uses document scrolling, never a fixed-height application shell.

`components/auth/auth.css` contains namespaced `ff-auth-*` presentation rules shared by both routes. This project’s custom Turbopack CSS loader treats CSS as global; do not rely on CSS-module exports without validating the loader configuration. Layout/body colours consume `--surface-*`, `--text-*`, `--border-subtle` and `--shadow-card` directly. Provider buttons use named Google/Apple variants: opaque white/dark text for Google, opaque black/white text for Apple, in both themes. They must bypass the site’s glass outline background. Disabled labels retain full contrast, with the unavailable reason associated through `aria-describedby`; disabled controls do not act.

Provider button geometry stays fixed while busy. The selected provider shows “Connecting…” and both buttons disable to prevent duplicate sign-ins. Failure uses the existing inline alert; success returns to the validated local destination. The implementation must not invent a working provider when credentials are absent. Contrast checks must explicitly include disabled buttons (axe excludes them). Browser verification covers light/dark themes, narrow phones, navigation, and screenshot inspection.

Every interactive component defines: default, hover, `:focus-visible`, pressed (`active:scale-[0.98]`), selected/current (`aria-current`), disabled, loading (`data-loading`, spinner + label), success, error, empty. Storybook stories exist for each state.

---

## 6. Motion

| Use | Duration token |
|---|---|
| Micro (press, hover) | `--duration-micro` 140 ms |
| Popover / menu | `--duration-popover` 180 ms |
| Drawer / modal | `--duration-drawer` 280 ms |
| Large transitions | `--duration-large` 380 ms |

| Hero entrance / scroll reveal | 500–550 ms, 45–55 ms stagger |
| Page transition | 110 ms out, 180–280 ms in |

Easing: `ease-out-quint` for entrances, `ease-out-quart` for UI feedback. Motion should feel quick and light: short travel (≤ 14 px), no bouncing, no scroll hijacking (native scrolling only).

- **Page transitions** — React `<ViewTransition>` in `app/template.tsx`; header stays anchored.
- **Hero** — CSS entrance staggered by `--hero-i`. The `<h1>` is often the LCP element, so it only moves (`hero-title`) and never starts transparent.
- **Scroll reveal** — add `data-reveal` (or `data-reveal="stagger"`, `data-reveal="image"`) to an element; `components/motion/reveal-observer.tsx` hides only what is still below the fold, so content is never hidden without JavaScript.
- **Scroll-driven extras** — hero parallax, header elevation and the reading-progress bar use CSS scroll timelines and are skipped where unsupported.
- **Feedback** — Motion (`LazyMotion`) for the basket and add-to-basket confirmation; CSS for hover and press.

Everything animates only opacity, transform or clip-path. `prefers-reduced-motion` is honoured globally in CSS, by the reveal observer and by `MotionConfig reducedMotion="user"`.

---

## 7. Accessibility — WCAG 2.2 AA minimum

- Semantic landmarks, one `h1` per page, logical heading order, skip link.
- Fully keyboard operable; Base UI provides focus management for dialogs, drawers, tabs, accordions.
- `:focus-visible` outline is global and must never be removed without a replacement.
- Labels on every input; errors linked with `aria-describedby`, `aria-invalid`; first invalid field receives focus; status/alert regions announce outcomes.
- Contrast ≥ 4.5:1 for text (axe enforces in CI on every route).
- Touch targets ≥ 44 × 44 px for primary controls (`h-11` buttons/inputs, `size-11` icon buttons).
- 200% zoom and 320 px width without horizontal scrolling (enforced by the overflow check in `smoke.spec.ts`).

---

## 8. Responsive & touch

- Design from 320 px up, fluidly. Use `clamp()`, intrinsic grids (`minmax(0,1fr)` — never let content force a grid wider than the viewport), and container-relative components.
- Inputs are ≥ 16 px on mobile (prevents iOS zoom). Native `<select>` for form choices (system pickers).
- Respect safe-area insets on fixed UI (cookie banner, drawers).
- Text typed before hydration must survive it — forms don't overwrite DOM values with empty defaults (`useServerForm` `prefill` contract).

---

## 9. Quality gates

| Gate | Tool | Where |
|---|---|---|
| Lint, strict types | ESLint, `tsc` | CI `quality` |
| Unit/component | Vitest + Testing Library (`tests/unit`) | CI `quality` |
| Component lab | Storybook (`npm run storybook`) — a11y addon set to error | CI builds it |
| Journeys, keyboard, consent, forms, instant nav | Playwright on Chromium, Firefox, WebKit, Pixel 7, iPhone 15, iPad Mini | CI `e2e` |
| Accessibility | axe on every public route | CI `e2e` |
| Visual regression | Playwright screenshots (desktop + mobile) | CI `visual` |
| Performance budgets | Lighthouse CI (`npm run test:perf`) | Before release |
| Real users | Web Vitals RUM → GA4 `web_vital` events (with consent) | Production |

### Final acceptance rule

Do not launch because it "looks finished". Launch only when content accuracy, product status, ecommerce, compliance, mobile UX, SEO, accessibility, analytics, security and forms have all been tested — and every gate above is green.
