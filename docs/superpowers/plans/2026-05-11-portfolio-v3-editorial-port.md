# Portfolio v3 — Editorial Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `Portfolio v3 - Editorial.html` (a Babel-in-browser prototype) into a production Next.js 15 site living at the root of the `blaiseAI/duseb` repo.

**Architecture:** Single-route static-export Next.js App Router project. One layout, one page composing six section components. Tailwind v4 + a small `globals.css` for palette tokens and the prototype's helper classes (`.mono`, `.serif`, `.italic`, `.rule`, `.reveal`). Client components only where the prototype had state: `Reveal` (IntersectionObserver) and `Contact` (form).

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind v4 (`@tailwindcss/postcss`), `next/font/google` for Cormorant Garamond + Inter Tight + JetBrains Mono.

**Reference source:** `/tmp/duseb-design/duseb/project/Portfolio v3 - Editorial.html` (the prototype). Read it alongside this plan when porting any section.

**Verification primitive:** Because this is a visual port, verification is `next build` (exit 0) + a manual browser sweep at the end. There are no unit tests — visual fidelity is checked by eye against the prototype.

---

## File Structure (locked)

| File | Responsibility |
|---|---|
| `package.json` | deps + scripts |
| `tsconfig.json` | Next.js strict TS defaults |
| `next.config.ts` | `output: 'export'`, `images.unoptimized: true` |
| `postcss.config.mjs` | `@tailwindcss/postcss` plugin |
| `.gitignore` | `node_modules`, `.next`, `out` |
| `app/layout.tsx` | html/body, fonts, globals import, metadata |
| `app/page.tsx` | composes the six section components |
| `app/globals.css` | tailwind import + `@theme` palette + helper classes |
| `components/Reveal.tsx` | `'use client'` IntersectionObserver wrapper |
| `components/Nav.tsx` | fixed top nav |
| `components/Hero.tsx` | masthead + 3-col |
| `components/SectionMast.tsx` | §-numbered section header |
| `components/Phone.tsx` | hymnal phone mockup |
| `components/Work.tsx` | both folios + "next page" tease |
| `components/About.tsx` | monogram + body + practice list + quote |
| `components/Contact.tsx` | `'use client'` form with simulated submit |
| `components/Footer.tsx` | copyright + tagline + type credit |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `.gitignore`
- Create: `app/layout.tsx` (minimal placeholder)
- Create: `app/page.tsx` (placeholder body)
- Create: `app/globals.css` (tailwind import only)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "duseb",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.0.3",
    "react": "19.0.0-rc-66855b96-20241106",
    "react-dom": "19.0.0-rc-66855b96-20241106"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

- [ ] **Step 3: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default config;
```

- [ ] **Step 4: Create `postcss.config.mjs`**

```js
export default {
  plugins: { "@tailwindcss/postcss": {} },
};
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules/
.next/
out/
next-env.d.ts
.DS_Store
*.log
```

- [ ] **Step 6: Create `app/globals.css`**

```css
@import "tailwindcss";
```

- [ ] **Step 7: Create `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blaise Sebagabo — A Quiet Chronicle",
  description: "Websites, mobile apps, and quiet consulting work for churches, parachurch ministries, and faith-based nonprofits.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create `app/page.tsx`**

```tsx
export default function Home() {
  return <main>scaffold ok</main>;
}
```

- [ ] **Step 9: Install deps**

Run: `npm install`
Expected: exits 0, `node_modules/` created.

- [ ] **Step 10: Verify build**

Run: `npm run build`
Expected: exits 0, `out/index.html` exists with text "scaffold ok".

- [ ] **Step 11: Commit**

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs .gitignore app package-lock.json
git commit -m "chore: scaffold Next.js 15 + Tailwind v4 + TS"
```

---

## Task 2: Fonts, palette tokens, and helper classes

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/layout.tsx` with font + body wiring**

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blaise Sebagabo — A Quiet Chronicle",
  description: "Websites, mobile apps, and quiet consulting work for churches, parachurch ministries, and faith-based nonprofits.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${interTight.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Replace `app/globals.css` with palette + helpers**

```css
@import "tailwindcss";

@theme {
  --color-bg: #F4EFE6;
  --color-paper: #FAF6EC;
  --color-ink: #1B1916;
  --color-ink-soft: #5D5953;
  --color-muted: #9C948A;
  --color-rust: #C45A2F;
  --color-line: #1B19161A;

  --font-serif: var(--font-cormorant), Georgia, serif;
  --font-sans: var(--font-inter-tight), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;
}

html { scroll-behavior: smooth; }
body { font-family: var(--font-sans); }
::selection { background: #C45A2F33; color: #1B1916; }

.rule { height: 1px; background: var(--color-line); width: 100%; }
.rule-thick { height: 2px; background: var(--color-ink); }
.mono {
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 10.5px;
  color: #1B19169C;
}
.serif { font-family: var(--font-serif); }
.italic-accent { font-style: italic; color: var(--color-rust); }

.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.8s cubic-bezier(.2,.7,.3,1), transform 0.8s cubic-bezier(.2,.7,.3,1);
}
.reveal.in { opacity: 1; transform: translateY(0); }

@media (max-width: 720px) {
  .stack-on-mobile { grid-template-columns: 1fr !important; }
  .mobile-pad { padding-left: 24px !important; padding-right: 24px !important; }
}
```

Note: the prototype's `.italic` clashes with Tailwind's `italic` utility, so we use `.italic-accent` for the rust-colored italics. Plain italic styling uses inline `style={{fontStyle:"italic"}}` or Tailwind's `italic` class.

- [ ] **Step 3: Update `app/page.tsx` to smoke-test the palette**

```tsx
export default function Home() {
  return (
    <main className="p-12">
      <p className="mono">Vol. I · Smoke test</p>
      <h1 className="serif text-6xl text-ink">Sebagabo</h1>
      <p className="italic-accent">in rust</p>
    </main>
  );
}
```

- [ ] **Step 4: Verify dev render**

Run: `npm run dev` (in background)
Open: `http://localhost:3000`
Expected: cream background `#F4EFE6`, ink-colored "Sebagabo" in Cormorant serif, small uppercase "VOL. I · SMOKE TEST" above it, rust-colored italic "in rust" below.
Stop the dev server.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/globals.css app/page.tsx
git commit -m "feat: add fonts, palette tokens, helper classes"
```

---

## Task 3: `Reveal` client wrapper

**Files:**
- Create: `components/Reveal.tsx`

- [ ] **Step 1: Create `components/Reveal.tsx`**

```tsx
"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer";
  className?: string;
  style?: CSSProperties;
};

export default function Reveal({ children, as: Tag = "div", className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "-30px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const TagAny = Tag as unknown as "div";
  return (
    <TagAny ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </TagAny>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add components/Reveal.tsx
git commit -m "feat: add Reveal IntersectionObserver wrapper"
```

---

## Task 4: `Nav` component

**Files:**
- Create: `components/Nav.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

```tsx
const links: Array<[string, string, string]> = [
  ["i", "Work", "work"],
  ["ii", "About", "about"],
  ["iii", "Contact", "contact"],
];

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#F4EFE6dd",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "18px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a href="#top" style={{ textDecoration: "none", display: "flex", gap: 14, alignItems: "baseline" }}>
          <span className="serif" style={{ fontSize: 22, fontStyle: "italic", fontWeight: 500, color: "var(--color-ink)" }}>
            Sebagabo
          </span>
          <span className="mono">№ 01 · MMXXVI</span>
        </a>
        <div style={{ display: "flex", gap: 32 }}>
          {links.map(([n, l, h]) => (
            <a
              key={h}
              href={"#" + h}
              style={{
                textDecoration: "none",
                color: "var(--color-ink)",
                fontSize: 14,
                display: "flex",
                gap: 8,
                alignItems: "baseline",
              }}
            >
              <span className="serif" style={{ fontSize: 14, fontStyle: "italic", color: "var(--color-rust)" }}>
                {n}.
              </span>
              <span style={{ fontWeight: 400 }}>{l}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80 }}>
        <p className="mono" style={{ padding: 48 }}>Nav smoke test</p>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Open: `http://localhost:3000`
Expected: fixed cream blurred nav bar across the top, "Sebagabo" in italic serif on left next to mono "№ 01 · MMXXVI", three roman-numeral-prefixed links on the right.
Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: add Nav"
```

---

## Task 5: `Hero` section

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" style={{ padding: "140px 48px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
        <span className="mono">Vol. I · A Chronicle of Work · Alberta, Canada</span>
        <span className="mono">Established 2019</span>
      </Reveal>
      <Reveal className="rule-thick" style={{ marginBottom: 36 }} />

      <Reveal
        className="stack-on-mobile"
        style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 48, alignItems: "end" }}
      >
        <h1
          className="serif"
          style={{
            margin: 0,
            fontWeight: 500,
            fontSize: "clamp(64px,8.5vw,148px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "var(--color-ink)",
          }}
        >
          A quiet
          <br />
          <span className="italic-accent">chronicle</span>
          <br />
          of work made
          <br />
          for the <span className="italic-accent">Kingdom</span>.
        </h1>
        <div style={{ paddingBottom: 8 }}>
          <span className="mono">The author</span>
          <div className="serif" style={{ fontSize: 24, fontWeight: 500, marginTop: 4, letterSpacing: "-0.01em" }}>
            Blaise Sebagabo
          </div>
          <div style={{ fontSize: 14, color: "var(--color-ink-soft)", marginTop: 2 }}>
            Developer · Designer · Consultant
          </div>
        </div>
      </Reveal>

      <Reveal
        className="stack-on-mobile"
        style={{
          marginTop: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 48,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 32,
        }}
      >
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>Prologue</div>
          <p className="serif" style={{ margin: 0, fontSize: 22, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
            <span
              style={{
                float: "left",
                fontSize: 74,
                lineHeight: 0.85,
                paddingRight: 10,
                paddingTop: 6,
                fontWeight: 600,
                color: "var(--color-ink)",
              }}
            >
              I
            </span>
            began making websites for a small church plant in college because the quote they were given was more than
            their plate offering. Seven years later, the work has not stopped — but the purpose has clarified.
          </p>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>The practice</div>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "var(--color-ink-soft)" }}>
            Websites, mobile apps, and quiet consulting work for churches, parachurch ministries, and faith-based
            nonprofits — across Alberta and beyond.{" "}
            <em style={{ color: "var(--color-rust)" }}>
              Free when I can, at cost when I should, honestly when the scope is real.
            </em>
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="#work"
              style={{
                padding: "12px 22px",
                border: "1.5px solid var(--color-ink)",
                borderRadius: 0,
                textDecoration: "none",
                color: "var(--color-ink)",
                fontSize: 13,
                letterSpacing: ".02em",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Read the chronicle <span style={{ fontFamily: "serif", fontStyle: "italic" }}>→</span>
            </a>
            <a
              href="#contact"
              style={{
                padding: "12px 22px",
                background: "var(--color-ink)",
                color: "var(--color-bg)",
                borderRadius: 0,
                textDecoration: "none",
                fontSize: 13,
                letterSpacing: ".02em",
              }}
            >
              Send a letter
            </a>
          </div>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>Marginalia</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 14, lineHeight: 1.7, color: "var(--color-ink)" }}>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>Location</span>
              <span>Alberta, CA</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>Practice</span>
              <span>Web · Mobile · UI</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>Patrons</span>
              <span>Churches · Ministries</span>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span className="serif" style={{ fontStyle: "italic" }}>Status</span>
              <span style={{ color: "var(--color-rust)" }}>● Open this season</span>
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Open: `http://localhost:3000`
Expected:
- Top mono row reads "VOL. I · A CHRONICLE OF WORK · ALBERTA, CANADA" left and "ESTABLISHED 2019" right.
- 2px black rule underneath.
- Huge serif display "A quiet *chronicle* of work made for the *Kingdom*." with rust italics on "chronicle" and "Kingdom".
- Right column under the headline: "THE AUTHOR" / "Blaise Sebagabo" / "Developer · Designer · Consultant".
- Three-column grid below with Prologue (large drop-cap "I"), The practice (with two buttons), Marginalia (dotted-row list ending with rust ● Open this season).
- Scrolling triggers fade-in.
Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero"
```

---

## Task 6: `SectionMast` and `Phone` components

**Files:**
- Create: `components/SectionMast.tsx`
- Create: `components/Phone.tsx`

- [ ] **Step 1: Create `components/SectionMast.tsx`**

```tsx
import Reveal from "./Reveal";

type Props = { num: string; label: string; title: string };

export default function SectionMast({ num, label, title }: Props) {
  return (
    <Reveal style={{ marginBottom: 48 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          borderBottom: "2px solid var(--color-ink)",
          paddingBottom: 10,
        }}
      >
        <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
          <span
            className="serif"
            style={{ fontSize: 36, fontStyle: "italic", color: "var(--color-rust)", fontWeight: 500, lineHeight: 1 }}
          >
            § {num}
          </span>
          <span className="mono">{label}</span>
        </div>
        <span className="mono">A Chronicle · {label}</span>
      </div>
      <h2
        className="serif"
        style={{
          margin: "28px 0 0",
          fontSize: "clamp(44px,5.2vw,72px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.02,
        }}
      >
        {title}
      </h2>
    </Reveal>
  );
}
```

- [ ] **Step 2: Create `components/Phone.tsx`**

```tsx
import type { CSSProperties } from "react";

type Props = { tilt?: number; z?: number; style?: CSSProperties };

const tabBar: Array<[string, 0 | 1]> = [["№", 0], ["Hymns", 1], ["♥", 0], ["⋯", 0]];
const hymns: Array<[string, string]> = [
  ["1", "Murinzi We"],
  ["2", "Umwam' Ageze"],
  ["3", "Ndashima Yesu"],
  ["4", "Reka Mvuge"],
];

export default function Phone({ tilt = 0, z = 1, style = {} }: Props) {
  return (
    <div
      style={{
        width: 200,
        height: 400,
        background: "var(--color-paper)",
        borderRadius: 30,
        border: "6px solid var(--color-ink)",
        boxShadow: "0 26px 50px -20px rgba(28,28,28,.35)",
        padding: "18px 12px 4px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transform: `rotate(${tilt}deg)`,
        zIndex: z,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 54,
          height: 14,
          borderRadius: 9,
          background: "var(--color-ink)",
        }}
      />
      <div className="mono" style={{ marginTop: 14, color: "var(--color-rust)", fontSize: 8.5 }}>
        The Hymnal · 500
      </div>
      <div
        className="serif"
        style={{
          lineHeight: 0.95,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          fontSize: 26,
          color: "var(--color-ink)",
          marginTop: 4,
        }}
      >
        Indirimbo
        <br />
        <span style={{ fontStyle: "italic", color: "var(--color-rust)" }}>z&apos;agakiza.</span>
      </div>
      <div
        style={{
          marginTop: 10,
          background: "#fff",
          borderRadius: 8,
          padding: "7px 9px",
          fontSize: 9.5,
          color: "var(--color-muted)",
          boxShadow: "0 1px 0 rgba(0,0,0,.04)",
        }}
      >
        ⌕ Search hymns
      </div>
      <div
        style={{
          marginTop: 8,
          background: "var(--color-ink)",
          color: "var(--color-paper)",
          borderRadius: 10,
          padding: "8px 10px",
          position: "relative",
        }}
      >
        <div className="mono" style={{ color: "#C9BEAE", fontSize: 7 }}>
          CONTINUE · 1/3
        </div>
        <div className="serif" style={{ fontSize: 14, lineHeight: 1.05, marginTop: 2 }}>
          Har&apos; Izina
          <br />
          <span style={{ fontStyle: "italic", color: "#E6D9C6" }}>Rihebuje</span>
        </div>
        <div
          className="serif"
          style={{ position: "absolute", top: 8, right: 10, fontSize: 20, color: "#E6D9C6", fontStyle: "italic" }}
        >
          123
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 9 }}>
        {hymns.map(([n, t]) => (
          <div
            key={n}
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: 6,
              padding: "6px 0",
              borderBottom: "1px solid var(--color-line)",
            }}
          >
            <span className="serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--color-rust)" }}>
              {n}
            </span>
            <span style={{ fontWeight: 600, fontSize: 9.5, letterSpacing: "-0.01em", color: "var(--color-ink)" }}>
              {t}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          padding: "6px 0",
          borderTop: "1px solid var(--color-line)",
        }}
      >
        {tabBar.map(([l, on], i) => (
          <div
            key={i}
            className="mono"
            style={{
              textAlign: "center",
              fontSize: 6.5,
              color: on ? "var(--color-rust)" : "var(--color-muted)",
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add components/SectionMast.tsx components/Phone.tsx
git commit -m "feat: add SectionMast and Phone components"
```

---

## Task 7: `Work` section

**Files:**
- Create: `components/Work.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Work.tsx`**

```tsx
import Reveal from "./Reveal";
import SectionMast from "./SectionMast";
import Phone from "./Phone";

const flagshipMetrics: Array<[string, string]> = [
  ["25,700+", "downloads"],
  ["500", "hymns"],
  ["3", "iOS · Android · Web"],
  ["2", "Kinyarwanda · English"],
];

const flagshipTags = ["Mobile App", "Web App", "Next.js", "React Native"];

const glwBooks: Array<{ h: number; c: string; l: string }> = [
  { h: 130, c: "#B07A4A", l: "RW" },
  { h: 160, c: "#8E6238", l: "EN" },
  { h: 120, c: "#C28A4A", l: "FR" },
  { h: 150, c: "#9C6B3D", l: "SW" },
];

const glwTags = ["Mobile App", "Multilingual", "In Development"];

export default function Work() {
  return (
    <section id="work" style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionMast num="I" label="Selected Work" title="Things made, slowly, and on purpose." />

      {/* Flagship spread */}
      <Reveal
        className="stack-on-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 48,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 36,
        }}
      >
        <div>
          <div style={{ display: "flex", gap: 14, alignItems: "baseline", marginBottom: 18 }}>
            <span
              className="serif"
              style={{ fontSize: 42, fontStyle: "italic", color: "var(--color-rust)", fontWeight: 500 }}
            >
              Folio 1
            </span>
            <span className="mono">The flagship · Live · 25,700+ downloads</span>
          </div>
          <h3
            className="serif"
            style={{
              margin: 0,
              fontSize: "clamp(40px,4.6vw,64px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            SDA Kinyarwanda
            <br />
            <span className="italic-accent">Hymnal.</span>
          </h3>
          <div className="rule" style={{ margin: "28px 0" }} />
          <div
            className="stack-on-mobile"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          >
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "var(--color-ink)" }}>
              <span
                className="serif"
                style={{
                  float: "left",
                  fontSize: 56,
                  lineHeight: 0.85,
                  paddingRight: 8,
                  paddingTop: 4,
                  fontWeight: 600,
                }}
              >
                T
              </span>
              he complete digital hymn book for the Seventh-day Adventist church —{" "}
              <em style={{ color: "var(--color-rust)" }}>500 hymns in Kinyarwanda and English</em>, with melodies,
              search by number, and a continue-where-you-left-off card on the home screen.
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
              Shipped to iOS, Android, and the web — written in Next.js and React Native, with shared content pipelines
              so the same hymn database flows to every surface. Used in homes, on Sabbath mornings, in cars on the long
              drive home.
            </p>
          </div>
          <div
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 0,
              borderTop: "1px solid var(--color-line)",
              borderBottom: "1px solid var(--color-line)",
            }}
          >
            {flagshipMetrics.map(([v, l], i) => (
              <div
                key={i}
                style={{
                  padding: "18px 16px",
                  borderRight: i < 3 ? "1px solid var(--color-line)" : "none",
                }}
              >
                <div
                  className="serif"
                  style={{
                    fontSize: 36,
                    letterSpacing: "-0.02em",
                    fontWeight: 500,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {v}
                </div>
                <div className="mono" style={{ marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {flagshipTags.map((t) => (
              <span
                key={t}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--color-ink)",
                  borderRadius: 0,
                  fontSize: 12,
                  letterSpacing: ".01em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href="https://sda-kinyarwanda-hymnal.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="serif"
            style={{
              marginTop: 28,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              fontStyle: "italic",
              color: "var(--color-rust)",
              textDecoration: "none",
              borderBottom: "1px solid #C45A2F55",
              paddingBottom: 4,
            }}
          >
            Read the colophon →
          </a>
        </div>

        {/* Phone composition */}
        <div
          style={{
            position: "relative",
            minHeight: 520,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, var(--color-paper) 0%, var(--color-bg) 100%)",
              border: "1px solid var(--color-line)",
              borderRadius: 2,
            }}
          />
          <div className="mono" style={{ position: "absolute", top: 24, left: 24 }}>
            Plate № I · The Hymnal
          </div>
          <div className="mono" style={{ position: "absolute", bottom: 24, right: 24 }}>
            Fig. 1.1 — Home screen
          </div>
          <div style={{ position: "relative", width: 320, height: 420 }}>
            <Phone tilt={-7} z={1} style={{ position: "absolute", left: 0, top: 10 }} />
            <Phone tilt={6} z={2} style={{ position: "absolute", left: 150, top: 0 }} />
          </div>
        </div>
      </Reveal>

      {/* Secondary entry: GLW Ministry */}
      <Reveal
        className="stack-on-mobile"
        style={{
          marginTop: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 48,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 36,
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "#D4A37322",
            border: "1px solid #D4A37388",
            borderRadius: 2,
            padding: 36,
            minHeight: 340,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            {glwBooks.map((b, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: b.h,
                  background: b.c,
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  writingMode: "vertical-rl",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: 8,
                  boxShadow: "inset -3px 0 0 rgba(0,0,0,.12), 0 8px 16px -8px rgba(28,28,28,.3)",
                }}
              >
                {b.l}
              </div>
            ))}
          </div>
          <span className="mono" style={{ position: "absolute", top: 18, left: 18, color: "#8E6238" }}>
            Plate № II · In press
          </span>
          <span
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              padding: "5px 10px",
              background: "#8E6238",
              color: "#fff",
              fontSize: 10,
              letterSpacing: ".1em",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
            }}
          >
            Forthcoming
          </span>
        </div>
        <div>
          <div style={{ display: "flex", gap: 14, alignItems: "baseline", marginBottom: 18 }}>
            <span className="serif" style={{ fontSize: 36, fontStyle: "italic", color: "#8E6238", fontWeight: 500 }}>
              Folio 2
            </span>
            <span className="mono">In development · Multilingual library</span>
          </div>
          <h3
            className="serif"
            style={{
              margin: 0,
              fontSize: "clamp(36px,4vw,56px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            GLW Ministry —
            <br />
            <span style={{ fontStyle: "italic", color: "#8E6238" }}>a multilingual library.</span>
          </h3>
          <p style={{ marginTop: 24, fontSize: 16.5, lineHeight: 1.7, color: "var(--color-ink-soft)", maxWidth: 520 }}>
            A mobile app bringing translated Christian books to readers in four to five local languages. Making truth
            accessible to every tongue — beginning with Kinyarwanda, English, French, and Swahili.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {glwTags.map((t) => (
              <span
                key={t}
                style={{ padding: "6px 12px", border: "1px solid var(--color-ink)", borderRadius: 0, fontSize: 12 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal
        style={{
          marginTop: 60,
          padding: 32,
          border: "1.5px dashed var(--color-muted)",
          textAlign: "center",
        }}
      >
        <span className="serif" style={{ fontSize: 24, fontStyle: "italic", color: "var(--color-muted)" }}>
          The next page is unwritten.
        </span>
        <div className="mono" style={{ marginTop: 8 }}>More folios in due season</div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Open: `http://localhost:3000`
Expected:
- After Hero, "§ I" rust mark + "SELECTED WORK" mono label, 2px ink underline, big serif "Things made, slowly, and on purpose." title.
- Folio 1: huge "SDA Kinyarwanda *Hymnal.*" with two-column body, four-metric strip ("25,700+ downloads", "500 hymns", "3 iOS · Android · Web", "2 Kinyarwanda · English"), tag pills, "Read the colophon →" link in rust italic. Right side: gradient panel containing two overlapping tilted phones (-7° behind, +6° in front).
- Folio 2: terracotta book-spine block (RW/EN/FR/SW vertical labels) on the left, "GLW Ministry — *a multilingual library.*" on the right with copy and three tag pills.
- Dashed bordered "The next page is unwritten." tease at the bottom.
Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/Work.tsx app/page.tsx
git commit -m "feat: add Work section (Hymnal flagship + GLW Ministry)"
```

---

## Task 8: `About` section

**Files:**
- Create: `components/About.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/About.tsx`**

```tsx
import Reveal from "./Reveal";
import SectionMast from "./SectionMast";

const practice: Array<[string, string]> = [
  ["Web", "Next.js · React"],
  ["Mobile", "React Native"],
  ["Design", "UI/UX · Brand"],
  ["Counsel", "Consulting"],
  ["Tongues", "TypeScript · EN/RW"],
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "var(--color-paper)",
        padding: "100px 48px",
        borderTop: "2px solid var(--color-ink)",
        borderBottom: "2px solid var(--color-ink)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionMast num="II" label="About the Author" title="A craft, shaped by calling." />
        <Reveal
          className="stack-on-mobile"
          style={{ display: "grid", gridTemplateColumns: "260px 1fr 280px", gap: 60, marginTop: 36 }}
        >
          <div>
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "var(--color-rust)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontSize: 96,
                fontWeight: 500,
                letterSpacing: "-0.04em",
                boxShadow: "0 24px 48px -28px rgba(196,90,47,.5)",
              }}
            >
              BS
            </div>
            <div className="mono" style={{ marginTop: 18 }}>Portrait · plate № III</div>
            <div
              className="serif"
              style={{ fontSize: 18, marginTop: 6, color: "var(--color-ink)", fontStyle: "italic" }}
            >
              Blaise Sebagabo
            </div>
            <div style={{ fontSize: 13, color: "var(--color-ink-soft)" }}>
              Developer · Designer · Consultant · Alberta, Canada
            </div>
          </div>
          <div style={{ columns: 2, columnGap: 36, columnRule: "1px solid var(--color-line)" }}>
            <p
              className="serif"
              style={{
                margin: "0 0 16px",
                fontSize: 22,
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                fontWeight: 500,
                breakInside: "avoid",
              }}
            >
              <span
                style={{
                  float: "left",
                  fontSize: 72,
                  lineHeight: 0.85,
                  paddingRight: 10,
                  paddingTop: 6,
                  fontWeight: 600,
                  color: "var(--color-rust)",
                }}
              >
                I
              </span>
              &apos;m a developer and designer who believes technology is a gift meant to be shared.
            </p>
            <p style={{ margin: "0 0 14px", fontSize: 15, lineHeight: 1.75, color: "var(--color-ink-soft)" }}>
              Based in Alberta, Canada, I build websites, mobile apps, and digital tools for churches, ministries, and
              nonprofits. My work spans the full stack — from UI/UX design and consulting to shipping production apps
              on both app stores.
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "var(--color-ink-soft)" }}>
              I do this because I believe every ministry doing God&apos;s work deserves tools that match their mission.
              Whether it&apos;s a hymnal app used by thousands or a quiet consulting call to help a church plan their
              digital presence — <em style={{ color: "var(--color-rust)" }}>it&apos;s all Kingdom work</em>.
            </p>
          </div>
          <aside style={{ borderLeft: "1px solid var(--color-line)", paddingLeft: 24 }}>
            <div className="mono" style={{ marginBottom: 12 }}>The practice</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, fontSize: 13.5, lineHeight: 1.9, color: "var(--color-ink)" }}>
              {practice.map(([k, v], i) => (
                <li
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: i < practice.length - 1 ? "1px dotted var(--color-muted)" : "none",
                  }}
                >
                  <span className="serif" style={{ fontStyle: "italic" }}>{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <blockquote
              className="serif"
              style={{
                margin: "32px 0 0",
                padding: "16px 0 0 18px",
                borderLeft: "3px solid var(--color-rust)",
                fontSize: 18,
                lineHeight: 1.4,
                color: "var(--color-ink)",
                fontStyle: "italic",
              }}
            >
              &quot;Each of you should use whatever gift you have received to serve others, as faithful stewards of
              God&apos;s grace in its various forms.&quot;
              <footer
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  fontStyle: "normal",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: ".1em",
                  color: "var(--color-muted)",
                }}
              >
                — I PETER IV : X
              </footer>
            </blockquote>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Open: `http://localhost:3000#about`
Expected: paper-colored band with 2px ink rules top and bottom. "§ II" rust + "ABOUT THE AUTHOR" mono. Title "A craft, shaped by calling." Three columns: rust BS monogram circle on left (with caption), two-column body text with rust drop-cap "I" in middle, practice list + I Peter IV : X blockquote with rust left bar on right.
Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx app/page.tsx
git commit -m "feat: add About section"
```

---

## Task 9: `Contact` section

**Files:**
- Create: `components/Contact.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Contact.tsx`**

```tsx
"use client";

import { useState, type CSSProperties } from "react";
import Reveal from "./Reveal";
import SectionMast from "./SectionMast";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

export default function Contact() {
  const [f, setF] = useState<Fields>({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er: Errors = {};
    if (!f.name.trim()) er.name = "Please share your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email = "Email looks off.";
    if (f.message.trim().length < 10) er.message = "A few more lines, please.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    // Intentionally not wired to a backend. Locked by spec.
    setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 800);
  };

  const fieldStyle = (hasError: boolean, multiline: boolean): CSSProperties => ({
    width: "100%",
    padding: "12px 0",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${hasError ? "var(--color-rust)" : "var(--color-ink)"}`,
    fontSize: 18,
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    color: "var(--color-ink)",
    outline: "none",
    resize: multiline ? "vertical" : "none",
  });

  const field = (k: keyof Fields, label: string, type: string = "text", multiline = false) => {
    const has = err[k];
    return (
      <label style={{ display: "block" }}>
        <div className="mono" style={{ marginBottom: 4 }}>{label}</div>
        {multiline ? (
          <textarea
            value={f[k]}
            onChange={(e) => setF({ ...f, [k]: e.target.value })}
            style={fieldStyle(!!has, true)}
            rows={4}
          />
        ) : (
          <input
            type={type}
            value={f[k]}
            onChange={(e) => setF({ ...f, [k]: e.target.value })}
            style={fieldStyle(!!has, false)}
          />
        )}
        {has && (
          <div style={{ fontSize: 11, color: "var(--color-rust)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
            {has}
          </div>
        )}
      </label>
    );
  };

  return (
    <section id="contact" style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionMast num="III" label="Correspondence" title="Let us begin a correspondence." />
      <Reveal
        className="stack-on-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 36,
        }}
      >
        <div>
          <p className="serif" style={{ margin: 0, fontSize: 22, lineHeight: 1.45, letterSpacing: "-0.01em", fontWeight: 500, maxWidth: 460 }}>
            <span
              style={{
                float: "left",
                fontSize: 72,
                lineHeight: 0.85,
                paddingRight: 10,
                paddingTop: 6,
                fontWeight: 600,
                color: "var(--color-rust)",
              }}
            >
              W
            </span>
            hether your church needs a website, your ministry needs an app, or you simply have an idea worth thinking
            through — <em style={{ color: "var(--color-rust)" }}>I would love to hear from you</em>.
          </p>
          <div style={{ marginTop: 36, fontSize: 14, lineHeight: 1.9, color: "var(--color-ink)", maxWidth: 420 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>By post</span>
              <span>Alberta, Canada</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>By electronic</span>
              <a href="mailto:hello@sebagabo.dev" style={{ color: "var(--color-rust)", textDecoration: "none" }}>
                hello@sebagabo.dev
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span className="serif" style={{ fontStyle: "italic" }}>Hours kept</span>
              <span>Mon–Fri · weekends for ministries</span>
            </div>
          </div>
        </div>
        <div style={{ background: "var(--color-paper)", padding: 32, border: "1px solid var(--color-line)" }}>
          {sent ? (
            <div style={{ minHeight: 340, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span
                className="serif"
                style={{ fontSize: 44, lineHeight: 1, color: "var(--color-rust)", fontStyle: "italic" }}
              >
                Received.
              </span>
              <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.6, color: "var(--color-ink-soft)", maxWidth: 340 }}>
                Thank you for writing. I&apos;ll reply within a couple of days — usually sooner. Grace and peace.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setF({ name: "", email: "", message: "" });
                }}
                className="mono"
                style={{
                  marginTop: 20,
                  background: "transparent",
                  border: "none",
                  color: "var(--color-rust)",
                  cursor: "pointer",
                  padding: 0,
                  textAlign: "left",
                }}
              >
                Compose another →
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "grid", gap: 20 }}>
              <div className="mono" style={{ textAlign: "right", letterSpacing: ".18em" }}>
                Letter № 01
              </div>
              {field("name", "Your name")}
              {field("email", "Where to reply", "email")}
              {field("message", "Your message", "text", true)}
              <button
                type="submit"
                disabled={busy}
                style={{
                  marginTop: 8,
                  padding: "14px 24px",
                  background: "var(--color-ink)",
                  color: "var(--color-bg)",
                  border: "none",
                  borderRadius: 0,
                  fontSize: 13,
                  letterSpacing: ".06em",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  cursor: busy ? "default" : "pointer",
                  opacity: busy ? 0.7 : 1,
                }}
              >
                {busy ? "Sealing…" : "Send the letter →"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify form in browser**

Run: `npm run dev`
Open: `http://localhost:3000#contact`
Manually verify:
1. Submit empty form → three rust-underlined errors appear ("Please share your name.", "Email looks off.", "A few more lines, please.").
2. Fill all three (any valid email, message ≥10 chars), click "Send the letter →".
3. Button shows "Sealing…" for ~800ms, then success state: huge rust italic "Received." with thank-you paragraph and rust "Compose another →" link.
4. Click "Compose another →" — form returns blank.
Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/Contact.tsx app/page.tsx
git commit -m "feat: add Contact section with simulated submit"
```

---

## Task 10: `Footer` and final composition

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer style={{ padding: "40px 48px", borderTop: "2px solid var(--color-ink)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span className="mono">© MMXXVI · Blaise Sebagabo</span>
        <span className="serif" style={{ fontSize: 18, color: "var(--color-ink)", fontStyle: "italic" }}>
          Soli Deo Gloria.
        </span>
        <span className="mono">Set in Cormorant &amp; Inter Tight · Printed on the web</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`** (final composition)

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify full page in browser**

Run: `npm run dev`
Open: `http://localhost:3000`
Scroll top to bottom. Expected order: Nav fixed at top, then Hero → Work → About → Contact → Footer with the type credit. Every `.reveal` block fades in once.
Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer and finalize page composition"
```

---

## Task 11: Build + manual browser verification

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: exits 0. `out/index.html` exists.

- [ ] **Step 2: Serve the static export**

Run: `npx serve out -l 4000` (in background)
Open: `http://localhost:4000`

- [ ] **Step 3: Desktop sweep (1280px+)**

Verify visually against `/tmp/duseb-design/duseb/project/Portfolio v3 - Editorial.html`:
- Hero matches: huge serif headline with rust italics, 3-column Prologue/Practice/Marginalia.
- Work flagship: two phones overlap correctly with -7°/+6° tilts; four-metric strip aligns; tags render; rust "Read the colophon →" link present.
- GLW spread: book-spine block on left with four colored spines (RW/EN/FR/SW), title on right with brown italic "a multilingual library.", three tags.
- About: rust BS monogram, two-column body text with rust drop-cap, practice list with dotted rows, I Peter blockquote.
- Contact: form validates, submits, shows "Received." state, resets.
- Footer: three-column type credit row.

- [ ] **Step 4: Mobile sweep (≤720px)**

Resize browser to 375px wide. Expected:
- No horizontal scroll.
- Hero collapses to one column.
- Work spreads collapse to one column.
- About columns collapse to one column.
- Contact split collapses to one column.

- [ ] **Step 5: Stop the serve process**

- [ ] **Step 6: Mark complete**

If everything above passes, this task is done. If anything is off, fix inline and commit before moving on.

```bash
git status
# should be clean, or contain only fix commits
```

---

## Self-Review Notes

- **Spec coverage:** every File-layout entry maps to a task. All locked decisions (Next.js static export, Tailwind v4 with `@theme`, `next/font` fonts, simulated form, verbatim copy) are reflected. Mobile pass is folded into `globals.css` `.stack-on-mobile` rather than a dedicated task, since the only change needed is a single `@media` rule.
- **Type consistency:** `<Reveal>`, `<SectionMast>`, `<Phone>` props match across all usages. `Phone`'s `style` prop is `CSSProperties`. `Contact`'s `field()` helper returns JSX with consistent prop types.
- **Risk 1 (italic font weights):** handled in Task 2 by requesting Cormorant weights `400/500/600/700` with both `normal` and `italic` styles via `next/font`.
- **Risk 2 (Phone stacking with invalid CSS):** handled in Task 7 by switching to absolute positioning of the two phones with explicit `left`/`top` offsets inside a sized parent.
- **Risk 3 (mobile layout):** handled by `.stack-on-mobile` class applied to every multi-column grid in Hero, Work, About, Contact.

