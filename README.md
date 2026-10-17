# FlexiFib storefront

The website for **FLEXIFIB ECO LTD** — the Launch Collection shop plus the EcoBrush, HempSoft and FlexiPack programme pages.

Built to the [UX Engineering Standard](./UX_ENGINEERING_STANDARD.md): Next.js 16 (App Router, Cache Components), React 19.3, TypeScript, Tailwind CSS 4, shadcn/ui on Base UI, Motion, Stripe Checkout and Resend.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in keys (all optional for local dev)
npm run dev                  # http://localhost:3000
```

Without keys the public site still runs, but account access and shopping are unavailable. Form submissions are logged to the terminal.

## Customer accounts

Customers sign up and log in with **Google or Apple only**, through Supabase Auth. The first successful sign-in creates an account automatically. Visitors can browse products, but basket and checkout require a verified account. Signup is public; there is no manual approval step.

1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` and Vercel using your Supabase project. Use the publishable key, never a secret/service-role key. Restart development or rebuild after changing these variables.
2. In Supabase Authentication, enable **Google** and **Apple**, allow new user signups, and **disable the Email provider** to prevent email/password or email-link sign-ins. Provider credentials belong in the Supabase dashboard, not the frontend environment.
3. Set the Supabase Auth Site URL to your production origin. Allow `http://localhost:3000/auth/callback**` for development and `https://www.flexifib.com/auth/callback**` for production (adjust the domain if needed). The callback query preserves the original product destination. Add equivalent preview/test origins only when needed.
4. **Google:** create a Web application OAuth client in Google Cloud; configure the consent screen and basic profile/email scopes, then copy the client ID and secret into Supabase’s Google provider settings. Register the Supabase provider callback URL, usually `https://<project-ref>.supabase.co/auth/v1/callback`, as Google’s authorized redirect URI. This is different from the app’s `/auth/callback`. Configure production audience/test users as appropriate. [Google setup guide](https://supabase.com/docs/guides/auth/social-login/auth-google).
5. **Apple:** use an Apple Developer account, an App ID enabled for Sign in with Apple, and an associated Services ID for the website. Register the Supabase domain and its `/auth/v1/callback` URL with Apple. Configure the Services ID and generated client secret in Supabase’s Apple provider settings. Keep the signing key private and rotate the web OAuth client secret before its six-month expiry. [Apple setup guide](https://supabase.com/docs/guides/auth/social-login/auth-apple).

Routes: `/login`, `/signup`, `/account`, and `/auth/callback`. Old `/forgot-password` and `/reset-password` links redirect to login; passwords are managed with Google/Apple. No application database tables or email-delivery setup are needed for social authentication.

The SDK manages OAuth state and PKCE. The callback exchanges the authorization code for a session, handles cancellation/failure without trusting provider error text, and permits only local return destinations. Session cookies refresh through `src/proxy.ts`. Checkout independently validates the current user with Supabase before contacting Stripe, and records their account ID on the checkout session. Order confirmation is restricted to that customer. Apple Hide My Email relay addresses are accepted.

The basket stays local to the browser and is scoped to the signed-in account. Signing out or switching accounts clears it; it does not sync across devices. Legacy anonymous baskets are discarded. Login returns visitors to their product page so they can choose quantity and add an item.

After configuring both providers, verify each with a test account: sign in → return to product → add item → reload → sign out → sign in again. Also test cancelling consent. Provider consent and real sessions require configured credentials; unit tests mock the OAuth SDK and callback exchange.

Authenticated Playwright basket tests use `E2E_AUTH_STORAGE_STATE`, a path to a Playwright storage-state JSON saved after signing into a dedicated Google/Apple test account on the same local hostname. Save it under the ignored `playwright/.auth/` directory and never commit it: it contains session credentials. Without a saved session, authenticated tests skip; public auth navigation/accessibility tests still run.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` · `npm run typecheck` | ESLint · strict TypeScript |
| `npm test` | Fast business-logic, security and component tests |
| `npm run test:related -- src/lib/pricing.ts` | Run only unit tests affected by the named source files |
| `npm run test:e2e` | Critical Chromium journeys, representative accessibility checks and targeted mobile coverage |
| `npm run test:e2e:full` | Optional browser compatibility sweep, including Firefox and Safari |
| `npm run storybook` | Component lab on http://localhost:6006 |

### Testing policy

Keep a test when its failure identifies a meaningful regression: incorrect money,
lost basket state, unsafe auth/redirects, failed delivery reported as success,
invalid submissions, broken navigation, inaccessible controls or consent failure.
Avoid pixel snapshots, exact CSS values, marketing-copy assertions and tests that
pass on either success or failure. Exercise shared UI behaviour once per distinct
template instead of once per content URL/device combination.

During feature work, use `test:related` with the source files you touched. On PRs,
CI compares against the PR merge base; on pushes, it compares the entire push
against its previous commit (including every commit in a multi-commit push).
It lints changed files and uses Vitest's dependency graph to run affected unit tests.
Browser checks follow transitive imports to affected pages and select their tagged
journeys, HTTP checks and accessibility checks. For example, a contact-page edit
runs contact checks, not business or newsletter checks. Changes to shared layouts,
the header, global styles, dependencies or CI configuration widen coverage. An
unavailable diff base safely falls back to all default checks.

Documentation-only changes skip code checks/builds. Unit-only changes skip browser
installation and production builds. TypeScript remains a project-wide check when
typed code changes because type errors can cross file boundaries. A production
build is run once only when runtime code or browser checks require it. Shared root
changes use representative templates rather than opening every content page in a
browser. Storybook and performance measurements remain on-demand. Select
`full_browser_suite` when running CI manually to force all tests with the extra
browsers, or run `npm run test:e2e:full` locally. Visual screenshot assertions were removed.

The selector lives in `scripts/ci-plan.mjs`; browser feature tags are in `tests/e2e`.
New static page routes automatically receive a route smoke check; new browser journeys
should carry their feature tag. Run `npm run test:ci` after changing CI selection.
To inspect a page-specific plan locally, use
`node scripts/ci-plan.mjs --files src/app/contact/page.tsx`.

Playwright builds production automatically. To reuse a production build you just
made, use `E2E_SKIP_BUILD=1 npm run test:e2e`. Do not point it at a stale development
server. Default tests never submit real email or depend on live OAuth/payment
providers: server-action delivery tests stub the provider and assert explicit
success/failure. Authenticated basket journeys need the optional saved test session
described above; without it those journeys skip, while cart/security units still run.

## Where things live

```
src/
  app/                 Routes (one folder per page), server actions, sitemap, robots
  components/
    ui/                shadcn/ui primitives on Base UI (owned source)
    layout/            Header, footer, Container/Section
    patterns/          Branded building blocks (hero, cards, pathway, prose pages…)
    cart/              Basket button, lazy drawer, add-to-basket, order completion
    forms/             Shared form hook and fields; contact, business, email forms
    consent/           Cookie banner, preferences, consent-aware GA4 + Web Vitals
  content/             ← Edit copy, products, prices and company details here
  lib/                 Pricing, checkout, cart store, schemas, email, Stripe
tests/unit · tests/e2e
```

### Common edits

- **Products and prices:** `src/content/products.ts`. Prices are in pence and are the *only* prices checkout uses.
  > ⚠️ Launch Collection prices are currently **£5 placeholders** and product attributes are `null` (“Awaiting supplier confirmation”) until supplier data is verified.
- **Shipping rules:** `shipping` in the same file (UK only, £2.99, free from £20).
- **Company details / inboxes / navigation:** `src/content/site.ts` (set `registeredOffice` before launch).
- **Programme pages:** `src/content/programmes.ts` and `src/app/products/*`.
- **Green-claims guardrail:** `src/content/sustainability.ts`.

## Environment variables

See [`.env.example`](./.env.example). Set them in Vercel → Project → Settings → Environment Variables.

## Deployment

Vercel, from `main`. Preview deployments are automatically `noindex` (see `src/app/robots.ts`).

## Checkout flow

1. The basket (browser storage) sends only `{ slug, quantity }` to the `startCheckout` server action.
2. The server prices every line from `src/content/products.ts`, adds the shipping rule and creates a Stripe Checkout session.
3. Stripe redirects to `/checkout/success`, which **retrieves the session from Stripe** and only clears the basket if `payment_status === "paid"`.
