# LOG_ON design systems — full page audit

This document lists **every design language in the repo**, where it is used, and how the pieces combine. It is an inventory, not a restyle brief.

**Live marketing host:** `https://logonai.netlify.app`  
**Stack:** Next.js 16 (App Router) · React 19 · Tailwind (`darkMode: ['class']`) · `next-themes` (`storageKey="logon-theme"`)

---

## How chrome is chosen

`src/components/chrome-shell.tsx` treats these first path segments as **standalone systems** (no LOG_ON header, footer, or chatbot):

`/verda` · `/verdara` · `/vista` · `/tessera` · `/chamfer`

Every other route is the **marketing hybrid** (Tessera canvas + Vista header + Verdara sections + teal UI).

```
Standalone?  → system-surface page only
Otherwise    → SiteBackground (lavender) + vista-bar header + main.brand-sheet.ds-root + Footer + Chatbot
```

---

## 1. Marketing hybrid (canonical site)

Used on all customer-facing pages except the five system showcases.

### 1.1 Roles (do not mix)

| Layer | System | Role |
|---|---|---|
| Page field | **Tessera** | Lavender canvas `#C2A4DE` behind everything (`--brand-canvas`, `.site-canvas-body`) |
| Sheet | **Tessera / tokens** | Inset paper main: `.brand-sheet.ds-root` rounded 22px, `--color-bg` / `--color-text` |
| Header | **Vista** | Floating navy capsule `.vista-bar` `#0E1929`, cream type `#F3EDE2`, cream **Book a Demo** |
| Sections / cards / type | **Verdara** | Cream bands, forest ink, one coral italic per headline, `.verdara-*` |
| Functional UI | **LOG_ON teal** | `--primary` / `--color-action` `#006B4D` — links, focus, Subscribe, logo signal |
| Pulse only | **Tessera chartreuse** | `#C9F24A` — pills, “from the desk” kicker, never body text |

**Contrast rule:** never light type on paper, never forest type on navy/pine. Dark theme flips sheet semantics (`html.dark`); the newsletter card is locked `color-scheme: light` so it does not invert.

### 1.2 Token hierarchy (`@layer tokens` in `src/app/globals.css`)

See also `docs/DESIGN_TOKENS.md`.

**Primitives (hex, no UI meaning)**

| Token | Hex |
|---|---|
| `--color-teal-700` | `#006B4D` |
| `--color-teal-400` | `#3DBA8B` |
| `--color-forest-900` | `#123320` |
| `--color-forest-950` | `#0C2617` |
| `--color-paper-100` | `#F4ECDE` |
| `--color-paper-50` | `#FFFDF7` |
| `--color-cream-100` | `#FBF6EC` |
| `--color-lavender-300` | `#C2A4DE` |
| `--color-pulse-400` | `#C9F24A` |
| `--color-coral-500` | `#E8552F` |
| `--color-amber-400` | `#F0B429` |
| `--color-sky-300` | `#A8C8E4` |
| `--color-sage-300` | `#C6D8BF` |
| `--color-rule-200` | `#D9CDB8` |
| `--color-ink-muted` | `#6B7A66` |
| `--color-navy-900` | `#0E1929` |
| `--color-cream-50` | `#F3EDE2` |

**Semantic**

| Token | Light | Dark (`html.dark`) |
|---|---|---|
| `--color-text` | forest `#123320` | cream `#FBF6EC` |
| `--color-text-muted` | `#6B7A66` | cream 72% |
| `--color-bg` | paper `#FFFDF7` | `#0F1F1C` |
| `--color-bg-band` | `#F4ECDE` | `#0C2617` |
| `--color-bg-canvas` | lavender | `#162B27` |
| `--color-action` | teal | teal (brighter via `--primary` HSL) |
| `--color-emphasis` | coral | coral |
| `--mega-fg` / `--mega-bg` | `#212121` / `#FFFDF7` | cream / pine |

**Shadcn HSL** (`--primary: 163 100% 21%`) keeps `bg-primary` / `text-primary` AA on paper. Do not point `--primary` at chartreuse.

**Component:** `--card-bg`, `--card-border`, `--card-radius` (22px), `--button-bg`.

### 1.3 Type

Loaded in `src/app/layout.tsx`:

| CSS var | Face | Use |
|---|---|---|
| `--font-fraunces` | Fraunces | Headlines, `.verdara-title`, display |
| `--font-ui` | Inter | Body, UI, nav |
| `--font-outfit` | Outfit | Verda / Vista showcases |
| `--font-instrument` | Instrument Serif | Tessera / Chamfer showcases |
| `--font-mono` | IBM Plex Mono | Kickers, code, chamfer |
| `--font-jet` | JetBrains Mono | Optional code |

Recipe: **one coral italic word** per Verdara headline (`em` or `.headline-pulse`). Kickers: 0.72rem, 0.16em tracking, uppercase, teal or muted.

### 1.4 Reusable classes (marketing)

| Class | Meaning |
|---|---|
| `.site-canvas` / `.site-canvas-body` | Lavender field |
| `.brand-sheet` / `.ds-root` | Inset paper; remaps `text-foreground` / `text-muted-foreground` |
| `.vista-bar` | Navy capsule header; cream only on pills / logo / triggers — **not** mega panels |
| `.header-cta` | Cream Book a Demo on navy |
| `.nav-pill` | Cream nav; open/current = cream fill + navy type |
| `.verdara-section` | Band background + ink |
| `.verdara-kicker` / `.verdara-title` / `.verdara-lede` | Type stack |
| `.verdara-card` / `-compact` | 22px card, paper, rule border |
| `.verdara-grid` `-2` `-3` `-4` | 1 → 2 → 3/4 columns |
| `.verdara-tag-*` | sage / amber / sky / coral |
| `.verdara-mega` | Desktop dropdown: paper + `--mega-fg` |
| `.chamfer-*` | 45° clips — **`/chamfer` only** |
| `.pulse-action` / `.headline-pill` | Chartreuse pulse |

Layer order: `@layer reset, tokens, base, layout, components, utilities`.

### 1.5 Marketing pages (hybrid applied)

| Route | Notes |
|---|---|
| `/` | Home: PageHero-less hero + Verdara service/insight/industry bands |
| `/solutions` and family: `/ai-solutions` `/automation` `/chatbots` `/web-development` `/business-analytics` `/database-solutions` `/training` | Verdara section + cards + `PageHero` |
| `/about` `/about/our-leadership` `/about/newsroom` `/about/reports` `/about/careers` | Verdara + newsroom cards |
| `/partners` `/resources` `/use-cases` `/support` `/contact` | Verdara; contact = Tally primary + email `<details>` |
| `/insights` and `/insights/[slug]` | Hub + article chrome; catalogue in `src/lib/data/insights.ts` |
| `/ideas-lab` | Verdara stats / cards / CTA |
| `/privacy` `/terms` | Token sheet |
| `/offline` `/not-found` | Token sheet |

**Shared chrome on these routes:** Vista header, Tessera canvas + sheet, Footer (accordion &lt; lg), Botpress chatbot, Book a Demo → `/contact`, newsletter letter (SafeIsland in `layout.tsx`).

### 1.6 Newsletter letter (popup)

Not a fifth product system. Visual is **Verdara paper + Tessera pulse + teal CTA**.

- Module: `src/components/newsletter-popup.module.css` (scoped)
- Mount: `layout.tsx` inside `SafeIsland` — **do not** mount in `ChromeShell` without an import
- Left: paper + forest ink; right: pine + cream / chartreuse
- Locked `color-scheme: light` so dark theme cannot invert
- Email only; `newsletterSignupAction` loaded on submit

---

## 2. Standalone Magic Patterns (showcase only)

No LOG_ON header/footer/chatbot. Switcher: `SystemSwitch`. Class `.system-surface` opts out of marketing heading fonts.

### 2.1 Verda — `/verda`

| | |
|---|---|
| Mood | Dark mint neo-bank |
| Type | Outfit / Inter |
| Canvas | `#061310` / `#04100C` |
| Mint | `#4DE59B` on deep green type |
| Surfaces | `#0C1F19` / `#122A21`, line `#1D3B30` |
| Text | `#E9F5EF` / muted `#8CA79B` |
| Tailwind | `verda-*` |

### 2.2 Verdara — `/verdara`

| | |
|---|---|
| Mood | Cream editorial quarterly |
| Type | Fraunces / Inter |
| Paper | `#F4ECDE` / `#FBF6EC` / card `#FFFDF7` |
| Ink | `#123320` / `#0C2617` |
| Coral italic | `#E8552F` (one word) |
| Amber / sage / sky / rule | `#F0B429` / `#C6D8BF` / `#A8C8E4` / `#D9CDB8` |
| Cards | `rounded-[22px]`, slabs `26px`, gap-5 |
| Tailwind | `verdara-*` |

This recipe is what marketing **copies** via `.verdara-*`.

### 2.3 Vista — `/vista`

| | |
|---|---|
| Mood | Sand canvas + navy panels |
| Type | Outfit / Inter |
| Sand | `#C6A87F` / `#DCC49E` |
| Navy | `#0E1929` / `#152238` / panel `#111D30` |
| Cream | `#F3EDE2` |
| Line / muted / ember | `#26344C` / `#96A3B8` / `#D98C5F` |
| Nav | Full pill `bg-vista-navy` |
| Tailwind | `vista-*` |

Marketing **copies** the navy capsule only (`.vista-bar`).

### 2.4 Tessera — `/tessera`

| | |
|---|---|
| Mood | Lavender field, forest inset, chartreuse pulse |
| Type | Instrument Serif / Inter |
| Lavender | `#C2A4DE` |
| Forest / pine | `#0F1F1C` / `#162B27` |
| Chartreuse / citron | `#C9F24A` / `#EDE57A` |
| Inset | `rounded-[22px]` forest slab |
| Tailwind | `tessera-*` |

Marketing **copies** the lavender canvas + inset sheet, not site-wide chamfer or cubes.

### 2.5 Chamfer — `/chamfer`

| | |
|---|---|
| Mood | 45° cuts, no radius |
| Type | Instrument Serif / IBM Plex Mono |
| Paper / tan | `#F8F3E9` / `#E7DDC9` |
| Amber / orange / rust | `#F2A413` / `#F04E23` / `#D9372A` |
| Ink | `#211D16` |
| Cuts | 8 · 14 · 28 · 72 px (`.chamfer-sm` `.chamfer-inset` `.chamfer-sheet` `.chamfer-hero`) |
| Tailwind | `chamfer-*` |

**Do not** apply chamfer or site-wide neumorphism to marketing.

---

## 3. Other UI layers (not full “systems”)

| Layer | Where | Notes |
|---|---|---|
| Shadcn / Radix | `src/components/ui/*` | Buttons, dialog, accordion, calendar; tokens via HSL |
| Logon experience | `.logon-*` in `globals.css` | Legacy homepage blocks; still token-coloured |
| Newsletter module | `newsletter-popup.module.css` | Isolated; do not re-add global `.nl-*` |
| Flowbite-style audit | docs only | Workflow reference — **not** applied site-wide |

---

## 4. Conflict / contrast checklist

| Risk | Status |
|---|---|
| Vista cream inheriting into mega menu | Scoped: cream only on `.nav-pill` / logo / trigger; mega uses `--mega-fg` `#212121` on paper |
| `--primary` as chartreuse | Forbidden — teal only |
| Chamfer on marketing | Forbidden |
| Dual token systems (HSL + hex) | Intentional: HSL for Tailwind utilities, hex for Verdara/Vista/Tessera |
| Dark text on dark (newsletter) | Left = paper+ink; right = pine+cream; `color-scheme: light` |
| `NewsletterPopup` without import | Must only render from `layout.tsx` + named import |
| Logger throwing in `componentDidCatch` | Logger is defensive; boundary uses `console.error` |

---

## 5. File map

| Path | Owns |
|---|---|
| `src/app/globals.css` | Tokens, vista-bar, verdara, ds-root, chamfer clips |
| `src/app/layout.tsx` | Fonts, ThemeProvider, SafeIsland + NewsletterPopup |
| `src/components/chrome-shell.tsx` | Standalone vs marketing chrome |
| `tailwind.config.ts` | `brand` `verda` `verdara` `vista` `tessera` `chamfer` + shadcn colours |
| `docs/DESIGN_TOKENS.md` | Primitive → semantic → component |
| `src/app/{verda,verdara,vista,tessera,chamfer}/page.tsx` | Showcase sites |

---

## 6. Quick “which system?” for a new page

1. Customer page → **hybrid**: wrap in default chrome; use `.verdara-section` / `.verdara-card` / teal buttons.  
2. Design exploration → add a **standalone** route and put the slug in `SYSTEMS`.  
3. Need a navy header control → Vista classes on chrome only.  
4. Need a 45° cut → Chamfer route only.
