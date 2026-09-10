# LOG_ON responsive audit

Checked against: 320 · 375 · 390 · 414 · 480 (`xs`) · 640 (`sm`) · 768 (`md`) · 1024 (`lg`) · 1280 (`xl`) · 1536 (`2xl`).  
Also: `dvh` vs `vh`, iOS safe-area, landscape phones.

## Breakpoint map (source of truth)

| Token | Width | What should happen |
|---|---|---|
| base | 0–479 | One column. Hamburger. Footer accordion collapsed. Assistant = pill. BKO panel under intake. |
| `xs` 480 | large phone | Extra Tailwind step only. |
| `sm` 640 | small tablet | Chip grids 2-col. Footer brand left-aligned. |
| `md` 768 | tablet | **Desktop nav + Book a Demo.** Mega menus. Intake progress rail. Assistant = card. |
| `lg` 1024 | laptop | Footer 4-col expanded. Intake two-column (form + BKO). |
| `xl` 1280 | desktop | Container cap. |

Header nav and hamburger switch at **`md` (768)** — they must stay paired.

## What was broken (and fixed this pass)

1. **Intake BKO hidden below `lg`** — Spec says the live object stays visible, stacked. Panel now scrolls under the form (`max-height: 200px` → full height at `lg`).
2. **Intake overflow** — `92vh` ignored iOS chrome. Now `min(92dvh, 92vh)` + touch scroll + `min-w-0`.
3. **City/state/country inputs** — no `min-w-0`/`w-full`, overflowed 320px grids.
4. **Progress rail** — now `flex-wrap`.
5. **Newsletter letter** — forced `min-height: 480px` on phones. Removed; overlay uses safe-area padding.
6. **Header crowding 640–767** — Book a Demo showed with hamburger. Demo now `md:` with the desktop nav.
7. **`.logon-pill-block` full-bleed** — `calc(50% - 50vw)` caused horizontal scroll. Capped to `max-width: 100%` + container padding.
8. **Main sheet** — `min-w-0 overflow-x-hidden` so nested grids cannot push the page.
9. **Assistant** — `env(safe-area-inset-*)` so it sits above the home indicator.

## Still true (do not regress)

- Footer folds below `lg` (1024). Do not re-add `initMobileFoldingFooter`.
- Header bar stays `h-16`.
- Mega/theme menus: paper + `#212121`, `color-scheme: light`.
- Newsletter + intake lock `color-scheme: light`.
- Showcase `/verda` `/verdara` `/vista` `/tessera` `/chamfer` have no site chrome.
- FABs: visibility pill **left**; Book a Demo + chatbot **right** (`bottom-24`).

## Device / dimension matrix

| Viewport | Header | Home | Intake | Letter | Footer | FABs |
|---|---|---|---|---|---|---|
| 320×568 | Logo + theme + burger. No Demo. | Hero stacks. Band CTA full wrap. | Single column, BKO 200px, buttons stacked (Continue above Back). | Column, scroll. | Accordion. | Pill left, demo/chat right. |
| 375×812 | Same | Hero readable. Ideas Lab seeded, no random. | Same + safe-area. | Same | Accordion | Safe-area |
| 768×1024 | Nav + Demo | Two-col starts on some sections | Progress rail + wrap | Side-by-side letter if width allows | Still accordion until 1024 | Card left |
| 1024+ | Full Vista bar | 12-col / verdara-grid-3 | Form 7 / BKO 5 | 720×480 letter | 4 columns open | Card left, demo right |
| Landscape phone | Sticky header | Short hero `min-h` can clip — watch | `dvh` helps | Overlay padding | Accordion | Overlap risk if keyboard open |

## Overlays (z)

| Layer | z |
|---|---|
| Header | 80 |
| Mega | 90 |
| Demo FAB | 100 |
| Visibility assistant | 100 |
| Intake | 210 |
| Dialog / popover | 220–240 |
| Newsletter | `--z-newsletter` (top) |

Keyboard on iOS: intake/letter already `overflow-y: auto`. Do not `position:fixed` clip on `html` (breaks dialogs).

## Code hotspots

- `tailwind.config.ts` → `screens.xs` … `2xl`
- `header.tsx` / `desktop-nav.tsx` / `mobile-nav.tsx`
- `globals.css` → footer fold `@media (max-width: 1023px)`, logon grids `@media (max-width: 900px)`
- `newsletter-popup.module.css` → 767px stack
- `visibility-intake.module.css` → 1024px split
- `visibility-assistant.module.css` → 768px dock vs pill
- `chrome-shell.tsx` → sheet + overflow

## Residual risks (not blockers)

- Chatbot + Book a Demo both right-side; chatbot usually higher. Fine at 375; tight at 320 landscape.
- Hero `min-h-screen` on short landscape tablets is tall — content still reachable.
- Mega `min(920px, 100vw-2rem)` OK; if zoomed 200% use hamburger (md).
- Insights hub still `"use client"` (AUD-UI-014) — not a layout bug.

## How to verify

1. 320, 375, 768, 1024, 1440 — home, `/visibility`, `/contact`, `/insights`.
2. Open letter, intake, mega, mobile sheet; confirm scroll inside, not the page.
3. iOS Safari: address bar show/hide (`dvh`).
4. Dark theme: letter + intake stay paper/forest.
