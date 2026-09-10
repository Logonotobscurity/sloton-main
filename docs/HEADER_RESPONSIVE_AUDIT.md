# LOG_ON header & homepage — visual / a11y audit

**Product:** Marketing site (no account login, no site search, no promo alert).  
**Date:** 2026-08-19  
**Scope:** Header, mega-menu, mobile sheet, hero, footer. Do **not** invent login or search.

---

## 1. File map

| Path | Purpose |
|---|---|
| `src/components/header.tsx` | Sticky banner: brand · nav · Contact · theme · hamburger |
| `src/components/header/desktop-nav.tsx` | Radix Navigation Menu (Solutions / Resources / Company / Partners / Contact) |
| `src/components/header/mega-menu.tsx` | Two-column mega panel + art + links |
| `src/components/header/mobile-nav.tsx` | Sheet drawer + accordion (≤767px) |
| `src/components/header/theme-toggle.tsx` | Light / Dark / System |
| `src/components/header/logo.tsx` | Wordmark / compact mark |
| `src/components/header/skip-to-content.tsx` | Skip link → `#main-content` |
| `src/components/header/main-nav.tsx` | Thin wrapper (unused by Header) |
| `src/components/ui/navigation-menu.tsx` | Radix primitives, viewport z-index |
| `src/components/ui/dropdown-menu.tsx` | Theme menu (z-200) |
| `src/components/ui/sheet.tsx` | Mobile drawer |
| `src/lib/menu-data.ts` | Single sitemap source |
| `src/app/globals.css` | Tokens, hamburger leftovers, footer fold |
| `tailwind.config.ts` | `darkMode: class`, fluid type/spacing |
| `src/components/page-sections/hero.tsx` | Hero copy + dual CTAs |
| `src/components/footer.tsx` | Folding columns below 1024 |

**Not in product:** login card, alert banner, header search. Specs below mark those **N/A**.

---

## 2. Breakpoint wireframes (mobile-first)

```
480   768          1024         1280+
 |     |             |             |
 phone  large phone   tablet/laptop  desktop
        / small tab
```

### 360–479 — small phone

```
[ skip ]
[ LOGO          ☀  ☰ ]
─────────────────────
        HERO
 Do More with Less:
 [typed line]
 for Growing Businesses.
 body copy
 [ Primary CTA full width ]
 Explore solutions →   (text link)
 (code preview hidden)
─────────────────────
 Entity copy (no image)
 …
 FOOTER: tap to fold columns
```

| Element | Behavior |
|---|---|
| Header | Brand left. Theme + 44px hamburger right. No horizontal nav. |
| Nav | Sheet flyout; accordions; Book a conversation + theme. |
| Alert | N/A |
| Hero | Stacked, centered. Preview off. Primary full-width; secondary text link. |
| Imagery | Mega art only inside sheet header; `object-cover` + center crop. |
| Login | N/A — Contact is the action. |
| Footer | Collapsed/expandable sections. |

### 480–767 — large phone

Same as above. Contact CTA still in the sheet (header stays uncluttered). Touch targets ≥44px.

### 768–1023 — tablet (condensed horizontal)

```
[ LOGO ]  Solv ▾  Res ▾  Co ▾  Partners  Contact   [Contact Us] ☀
```

| Element | Behavior |
|---|---|
| Header | Persistent condensed nav. Hamburger **hidden**. |
| Mega | Hover/click; width `min(920px, 100vw-2rem)`; max-height 70vh, internal scroll. |
| Hero | Still stacked until `lg` (1024). |
| Footer | Still folding until 1024. |

### 1024–1279 — small laptop

```
[ LOGO ]     Solutions  Resources  Company  Partners  Contact     [Contact Us] ☀
                     ┌──────── mega 2-col ────────┐
                     │ art  │  2× link grid       │
                     └────────────────────────────┘
 HERO: copy left · code preview right
 FOOTER: 4 columns open
```

### 1280+ — desktop

Same chrome; more horizontal air. Mega stays centered under nav (`left-1/2 -translate-x-1/2`).

---

## 3. Component spec

### Navigation

- **&lt;768:** hamburger → Sheet. No hover mega.
- **≥768:** horizontal Radix menu. Open on hover (200ms delay) **and** click. Escape closes. Arrow keys via Radix.
- **Search:** none. Do not add.
- **No-JS:** `noscript` list of category URLs (`/solutions`, `/resources`, `/about`, `/partners`, `/contact`).
- **ARIA:** `header[role=banner]`, `nav[aria-label=Primary]`, triggers expose `aria-expanded` / `aria-haspopup` from Radix. Sheet: `aria-label="Mobile navigation menu"`. Icons `aria-hidden`.

### Alert / banner

N/A. Do not add a promo bar (would compete with hero CTA).

### Hero

- Fluid title: `text-fluid-hero` + inner `text-fluid-lg` for the typed line.
- Mobile: keep headline to ~3 short lines; hide code card until `lg`.
- Primary: **Get Your Free Efficiency Assessment** (dialog — keep).
- Secondary: text link on &lt;640px; outline button from `sm`.

### Login

**N/A.** Site has no session. Tradeoffs of inline vs modal login do not apply. The equivalent action is **Contact Us** → `/contact` (Tally). Building a fake login would violate product scope.

### Images

- Mega art: `fill` + `object-cover object-[center_28%]` so brand/type in the upper third stays in frame.
- `sizes="240px"` desktop rail; sheet band `420px`.
- Next Image already emits AVIF/WebP.

### Theme menu

- `z-[200]` above header `z-[80]` and mega `z-[90]`.
- `onSelect` + `modal={false}`.

---

## 4. Tokens (implemented)

| Token | Light | Dark | Contrast |
|---|---|---|---|
| `--background` | 60 43% 98% `#FCFCF8` | 75 8% 9.4% | — |
| `--foreground` | 75 8% 9.4% `#191A16` | 60 8% 90% | ≥4.5:1 body |
| `--primary` | 163 100% 21% `#006B4D` | 163 63% 62% | AA on paper |
| `--accent` | 331 100% 37% `#BD005B` | 341 100% 85% | Use for emphasis, not body |
| `--radius` | 0.5rem | same | Mega 1rem |

**Type:** body Cormorant / `--font-serif`; display Cinzel; mono IBM Plex. Fluid: `text-fluid-xs` → `text-fluid-hero` in `tailwind.config.ts`. Line length ~60–72ch on entity/hero body (`max-w-xl` / `max-w-3xl`).

**Space:** `--space-fluid-*`, `--container-padding-x`. **Touch:** 44–48px (`min-h-11`, hamburger `h-11 w-11`).

---

## 5. Static a11y audit (header)

| Check | Status |
|---|---|
| Landmark header + skip + main id | Pass |
| `ul > li > a/button` in mega | Pass |
| Radix keyboard (Tab / Enter / Space / Arrows / Esc) | Pass (primitive) |
| Focus trap in Sheet + Assessment dialog | Pass (Radix) |
| Visible focus (`focus-visible:ring-2`) | Pass |
| Duplicate IDs in nav | None found |
| Accessible names (hamburger, theme, social) | Pass |
| Mega under hero (z-index) | Viewport `z-[90]` inside sticky header |
| Hover-only on mobile | Sheet only; no hover mega |

---

## 6. QA checklist

**Perf**
- [ ] Mega images not `priority` (below first paint)
- [ ] Offscreen footer / insights lazy by route
- [ ] `prefers-reduced-motion` skips global code canvas
- [ ] No 14MB GIF in header

**A11y**
- [ ] Keyboard: skip → logo → nav → Contact → theme
- [ ] Open Solutions, Tab through items, Esc closes
- [ ] VoiceOver: “Solutions, menu pop-up, collapsed”
- [ ] Contrast body ≥4.5:1 light and dark
- [ ] 360 / 768 / 1024 / 1400: no overlap of mega vs hero

**Manual widths:** 1400, 1024, 768, 360 — brand left, actions right, mega not wider than viewport.

**Browsers:** Chrome, Safari, Firefox, Edge, iOS Safari, Android Chrome.

**Acceptance**
- Pixel: hero CTA full-width on 360; typed line does not overflow.
- No login modal to test (N/A).
- 3G: defer chatbot/widgets; hero is CSS + one type animation; plan: keep GIF off homepage LCP.

---

## 7. What we will not build

- Login card / passwordless / remember-me  
- Header search  
- Sitewide alert banner  

Those belong to a different product. Contact + Tally remain the conversion path.
