# duseb Ministry Site — Port of `Portfolio v3 — Editorial`

**Status:** Approved 2026-05-11
**Source design:** `Portfolio v3 - Editorial.html` (Claude Design handoff bundle, hash `Czqpkcxj1KzJI0ofChAcAQ`)
**Target repo:** `blaiseAI/duseb` (Ministry Site)

## Goal

Recreate the Editorial design as a production-quality static site for the duseb repo. Visual output matches the prototype; under the hood it's a real Next.js build, not Babel-in-browser.

## Decisions (locked)

| Question | Choice |
|---|---|
| Stack | Next.js 15 (App Router) + TypeScript, `output: 'export'` (static) |
| Styling | Tailwind v4 with `@theme` palette + a small `globals.css` for the `.reveal`, `.mono`, `.serif`, `.italic`, `.rule` helpers |
| Fonts | `next/font/google` — Cormorant Garamond (400/500/600/700, italic 400/500/600), Inter Tight (300/400/500/600), JetBrains Mono (400/500) |
| Contact form | Kept simulated — 800ms timeout → "Received." success state. No backend. |
| Copy | Verbatim from the design (metrics, email, "Open this season", all literary copy) |
| Out of scope | Portfolio v1/v4, tweaks panel, multi-route content, analytics, sitemap, OG image |

## Architecture

Single route `/`. Layout owns `<html>`, `<body>`, fonts, and globals. Page composes six section components in order.

```
app/
  layout.tsx         html/body, font variables, globals.css import
  page.tsx           <Nav/><Hero/><Work/><About/><Contact/><Footer/>
  globals.css        tailwind v4 + palette tokens + .reveal/.mono/.serif/.italic/.rule
components/
  Nav.tsx            fixed top, blurred bg, three section links with roman-numeral prefix
  Hero.tsx           masthead + 3-column "Prologue / The practice / Marginalia"
  SectionMast.tsx    §-numbered section header used by Work / About / Contact
  Work.tsx           Folio 1 (Hymnal flagship + double phone mockup) + Folio 2 (GLW) + "next page" tease
  Phone.tsx          single hymnal phone mockup, accepts tilt/z props
  About.tsx          BS monogram + 2-column body + practice list + I Peter quote
  Contact.tsx        'use client' — form state, validation, simulated submit
  Footer.tsx         © MMXXVI · Soli Deo Gloria · type credit
  Reveal.tsx         'use client' — IntersectionObserver wrapper. Children render server-side; observer attaches client-side, toggles `.in` class.
next.config.ts       { output: 'export', images: { unoptimized: true } }
package.json         next, react, react-dom, tailwindcss v4, @tailwindcss/postcss, typescript, @types/*
tsconfig.json        Next.js defaults, strict
postcss.config.mjs   tailwindcss plugin
.gitignore           node_modules, .next, out
```

## Component contracts

### `<Reveal>` (replaces the prototype's `useReveal()` hook)
- Wraps any block of content.
- Renders `<div className="reveal">{children}</div>` on the server.
- On mount (client), attaches an `IntersectionObserver` with `rootMargin: '-30px'` that adds `.in` and unobserves on first intersect.
- Used in: Hero (masthead, rule, h1 row, 3-col), Work (flagship spread, secondary entry, next-page tease), About (3-col body), Contact (split column).

### `<SectionMast num label title />`
- Pure presentational, server component.
- Props: `num: string` (e.g. `"I"`), `label: string` (e.g. `"Selected Work"`), `title: string`.
- Renders the rust `§ {num}` + mono `{label}` row, the 2px ink underline, and the `clamp(44px, 5.2vw, 72px)` serif title beneath.

### `<Phone tilt z extraStyle />`
- Hymnal phone mockup. Server component.
- Props: `tilt: number` (degrees), `z: number` (z-index), `extraStyle?: CSSProperties`.
- Renders the 200×400 paper-colored device with notch, "The Hymnal · 500" header, "Indirimbo z'agakiza." display title, search bar, "Continue · 1/3" hymn card with "Har' Izina Rihebuje · 123", four-hymn list, four-icon tab bar.

### `<Contact>`
- `'use client'`.
- Owns `{ name, email, message }` state, `err` map, `sent: boolean`, `busy: boolean`.
- Validation: name non-empty, email matches `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`, message ≥10 chars.
- Submit: `setBusy(true)` → `setTimeout(800)` → `setSent(true)`.
- Reset path: "Compose another →" clears state.

## Styling notes

- **Palette tokens** declared in `@theme` block so Tailwind utilities like `bg-bg`, `text-ink`, `border-line` work alongside arbitrary values for the rust accents.
- **Inline styles preserved** where the prototype uses them for one-off geometry (Phone mockup interior, GLW book-spine column, asymmetric grids). Tailwind classes used for repeating patterns (padding, max-width containers, flex/grid skeletons).
- **`html { scroll-behavior: smooth }`** in globals.
- **Selection color** `#C45A2F33` on `#1B1916` in globals.

## Translation: prototype → port

| Prototype (HTML/JSX in `<script type="text/babel">`) | Port |
|---|---|
| React + Babel + ReactDOM from unpkg | Bundled by Next.js |
| `useReveal()` hook attached on mount | `<Reveal>` client component |
| Inline `<style>` block | `app/globals.css` |
| Google Fonts via `<link>` | `next/font/google` |
| All sections in one `App()` function | One component per section file |
| `gap:-30` and `marginRight:-50` on Phone wrapper (invalid CSS) | Absolute positioning of the second phone with explicit `translate`s so the rotated phones overlap as designed |
| `style={{ ...inline }}` everywhere | Mix of Tailwind classes + inline `style` where geometry is unique-per-component |

## Risks

1. **Cormorant Garamond italic weights.** Italic 500 and 600 must be explicitly requested in `next/font`, otherwise we silently fall back to italic 400 and the display feels light. **Mitigation:** request the exact weights listed in the Decisions table.
2. **Phone mockup stacking.** The prototype's CSS-invalid `gap:-30` is the visual we need to match. **Mitigation:** make the right-hand phone `position: absolute` and translate it so the two phones overlap by ~50px with their respective tilts. This is the only place the implementation diverges from the prototype source.
3. **Mobile layout.** The design's grids (`1fr 280px`, `1fr 1fr 1fr`, `1.4fr 1fr`) collapse poorly on narrow screens. The prototype has no `@media` rules at all. **Mitigation:** add a minimal mobile pass — switch all multi-column grids to single column under 720px, drop the fixed nav to a simpler condensed bar. This is a layout-correctness fix, not a redesign.

## Verification

- `npm run build` exits 0 and emits `out/`.
- `npm run dev` renders all six sections.
- Open `out/index.html` in a browser, scroll top→bottom: every `.reveal` block fades in, the Phone mockup composes correctly, the form's validation triggers on bad input, the success state renders on valid submit, "Compose another →" resets.
- Visual diff against `/tmp/duseb-design/duseb/project/Portfolio v3 - Editorial.html` — spot-check Hero, the flagship spread, the GLW book-spine, and the About monogram.

## Definition of done

- Site builds with `output: 'export'`.
- All six sections present and styled to match the design.
- Form submits and resets without console errors.
- Mobile layout (≤720px) doesn't break — single-column collapse, no horizontal scroll.
- Code committed; design spec committed alongside it.
