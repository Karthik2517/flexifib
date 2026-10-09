# FlexiFib storefront

The website for **FLEXIFIB ECO LTD** — the Launch Collection shop plus the EcoBrush, HempSoft and FlexiPack programme pages.

Built to the [UX Engineering Standard](./UX_ENGINEERING_STANDARD.md): Next.js 16 (App Router, Cache Components), React 19.3, TypeScript, Tailwind CSS 4, shadcn/ui on Base UI, Motion, Stripe Checkout and Resend.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in keys (all optional for local dev)
npm run dev                  # http://localhost:3000
```

Without keys the site still runs: checkout shows a friendly "temporarily unavailable" message and form submissions are logged to the terminal.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` · `npm run typecheck` | ESLint · strict TypeScript |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:e2e` | Playwright journeys + axe accessibility on all browsers |
| `npm run test:visual` | Visual regression screenshots |
| `npm run storybook` | Component lab on http://localhost:6006 |

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
