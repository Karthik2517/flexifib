---
version: alpha
name: FlexiFib
description: Material-led Scottish storefront with calm, legible customer account flows.
colors:
  forest: "#17382c"
  cream: "#fbf9f4"
  sage: "#e6eee7"
  brass: "#8f6a32"
  ink: "#1b211e"
typography:
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
omitted:
  - section: spacing
    reason: "Canonical values remain in globals.css and UX_ENGINEERING_STANDARD.md."
  - section: rounded
    reason: "Canonical radii remain in globals.css and the shared component recipes."
  - section: components
    reason: "Canonical components and account variants are documented below."
---

# FlexiFib design context

## Overview

The visual reference is the material world of plant fibres, fields and everyday essentials. Use real material photography and restrained forest tones; keep shopping and account controls familiar. The audience is UK customers browsing the Launch Collection, on phones and desktop. Business evidence lives in README.md and src/content/site.ts; the maintained interaction and accessibility contract is UX_ENGINEERING_STANDARD.md.

This is a hybrid brand/product site: editorial product and programme pages express the material story, while login and signup prioritise a clear choice between Google and Apple. English (UK) is the active locale. Do not introduce a new visual identity for an account screen.

## Colors

Runtime tokens remain canonical (ownership model B): `src/app/globals.css` primitive palette → semantic `--surface-*`, `--text-*`, `--border-*` → Tailwind aliases and shared components. The values above mirror the existing light palette; dark mode remaps semantic roles through the existing media query. No tokens are generated from this document.

Provider colours are deliberate component exceptions, owned by `.ff-auth-google` and `.ff-auth-apple` in `src/components/auth/auth.css`. Their opaque white/black surfaces and contrasting labels do not inherit glass button backgrounds or dim when disabled. The unavailable explanation communicates why they cannot act. Test disabled contrast explicitly in both themes.

## Typography

Inter handles body and controls; Manrope handles the wordmark and headings, as implemented in the root layout. Use the established fluid scale and tight display tracking. Keep small labels legible and supporting copy short. The older font-family sentence in the engineering guide is superseded by this documented runtime mapping.

## Layout

Maintain the established four-pixel spacing rhythm, document scrolling, and shared header/footer. Account pages use a two-column material-photo/sign-in composition up to 68rem wide. Below 768px the decorative panel is hidden, leaving a focused account card. Controls remain reachable at 320px and at increased text sizes; never pin the form into a fixed viewport.

## Elevation & Depth

Use semantic surfaces, fine borders and the existing `--shadow-card` token. Keep account controls opaque and immediately recognisable. Avoid adding glass layers or decorative motion to authentication.

## Shapes

Follow existing rounded card and control geometry. Account provider controls are equal-sized, with reserved icon and label areas so a spinner does not move adjacent content.

## Components

The shared AuthForm owns login/signup; Button remains the Base UI-backed semantic control and FormAlert owns inline error feedback. Provider names and icons are always visible. Login uses “Log in with …”; signup uses “Sign up with …”. Busy states disable both controls; errors allow retry. The existing Supabase callback and verified server checkout checks own authentication behaviour.

Lucide remains the interface icon family; provider brand marks identify Google/Apple. Existing duration and reduced-motion rules apply. The namespaced account stylesheet accommodates the project's global CSS loader; do not assume CSS-module exports without validating the loader.

## Do's and Don'ts

- Use existing photography, theme tokens and shared behaviour.
- Verify the actual browser result, including disabled controls and dark mode.
- Do not obscure provider labels with shared button gradients or opacity.
- Do not imply that OAuth works before provider credentials are configured.
