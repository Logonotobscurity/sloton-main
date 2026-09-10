# LOG_ON UI/UX & Interaction Quality Audit v2

**Date:** 2026-08-21  
**Branch:** `arena/01a01243-sloton-main`  
**Commit:** `d1f47d1` (+ uncommitted site-index work)  
**Mode:** full · marketing site (Next 15 App Router, React 18, Tailwind, Radix)  
**Default action:** PROPOSE only. No risky UI implementation.

---

## Tool execution

| tool | status | fallback | confidence |
|------|--------|----------|------------|
| Playwright e2e (`e2e/header.spec.ts`) | present, **not run this session** | code review of spec | Medium |
| axe-core / Lighthouse | unavailable (no browser session) | DIRECT_CODE | Low for contrast/LCP |
| visual regression / Storybook / bundle analyser | unavailable | inference | Low |
| static route inventory | **run** (`find src/app -name page.tsx` → 53) | — | High |
| sitemap module | **run** (`getSitemapEntries`) | — | High |

```json
{
  "project_type": "fullstack_web",
  "ui_framework": "react",
  "styling": "tailwind",
  "routing": "next_app_router",
  "design_system": true,
  "component_library": true,
  "public_pages": true,
  "authenticated_pages": false,
  "mobile_responsive": true,
  "seo_applicable": true,
  "mode": "full"
}
```

No login/checkout. Treat as static marketing + Insights + Tally contact.

---

## Executive summary

- **Overall UI/UX quality:** **71 / 100**
- **Risk level:** **High** (not Critical — primary nav exists and is coded; conversion is not hard-blocked)
- **Top issues:** fake 800ms full-screen loader on every route; no `loading.tsx`/`error.tsx`; contact form missing `type="email"` / autocomplete / `aria-busy`; Insights hub is a client island; header height swap (CLS); dual Tally+email forms; “All systems operational” is decorative fiction.

**First actions (approval required for 1–2):**
1. Remove or gate `WebsiteLoader` so it does not overlay every pathname change.
2. Add `src/app/error.tsx` + optional `loading.tsx` skeletons.
3. Fix contact fallback form semantics.
4. `aria-current="page"` on desktop/mobile nav.
5. Collapse footer accordions by default on small screens.

---

## Scorecard (0–100)

| Category | Score | Reasoning |
|----------|------:|-----------|
| Visual consistency | 74 | Tokens in `globals.css`; Button variants are duplicates; leftover `.hamburger` / `.mobile-nav` CSS |
| Interaction quality | 68 | Radix menus + focus rings; fake loader; identical button variants |
| Navigation & routing | 78 | `menuData` shared header/footer; no `aria-current`; nested Insights redirects exist |
| Accessibility | 66 | Skip link, landmarks, social names; missing form types; scrollbar hidden globally |
| Responsive design | 76 | `md:` header split; footer fold `<1024px`; overflow-x clipped |
| Performance | 55 | Artificial 800ms overlay; Insights client page; no Lighthouse this run |
| Content quality | 80 | Entity leads, llms.txt, catalogue; hub hrefs now live slugs |
| Forms & input | 62 | Zod + toast; no email type; dual forms; query `subject` unused |
| Error handling | 58 | Styled 404; global-error only; no segment `error.tsx` |
| Developer experience | 70 | Tokens + tests for header/site-index; no Storybook |
| **Overall** | **71** | Weighted toward nav/content; loader and forms pull down |

---

## Route inventory (ground truth)

**Public, no auth.** Layout: root `Header` + `main#main-content` + `Footer`.

| Path | Notes |
|------|--------|
| `/` | Home, metadata in `layout.tsx` |
| `/ai-solutions`, `/automation`, `/chatbots`, `/web-development`, `/business-analytics`, `/database-solutions`, `/training`, `/solutions`, `/use-cases`, `/resources` | Services |
| `/insights` + 15 hubs + `/insights/[slug]` | Catalogue-first |
| `/contact` | Tally + email fallback |
| `/about/*`, `/partners`, `/support`, `/ideas-lab` | Company |
| `/privacy`, `/terms` | Legal — **no cookie policy** |
| `/offline` | SW fallback |
| `/component-showcase`, `/ab-testing` | robots disallow |
| `/automation/[slug]` | templates |
| 404 `not-found.tsx`; 500 `global-error.tsx` only |

Sitemap: static concepts + templates + `insights[]` via `site-index.ts`.

---

## Findings

### AUD-UI-001 — Fake full-screen loader on every route (High)

- **evidence_type:** DIRECT_CODE  
- **location:** `src/components/website-loader.tsx:12–31`  
- **excerpt:** `setLoading(true)` on `pathname`; hide after **800ms** regardless of data. Overlay `z-[200]`.  
- **impact:** Perceived performance worse than reality; INP/LCP; possible focus trap; blocks chat widgets (`z-[200]`).  
- **confidence:** High  
- **Risk:** Impact 4 × Likelihood 5 × Blast 3 = **60 → Critical override?** Conversion not blocked → **High** (policy: overlay on all routes is severe but site still usable).  
- **proposal:** Delete overlay **or** show only if navigation > 400ms. Never fake delay.  
- **approval:** **required** (global perceived performance).  
- **validation:** Playwright: route `/` → `/contact` no `[class*=loader]` after 100ms; axe on overlay.

### AUD-UI-002 — No App Router `loading.tsx` / `error.tsx` (High)

- **DIRECT_CODE:** `find src/app` → no `loading.tsx` or `error.tsx`; only `global-error.tsx`, `not-found.tsx`.  
- **impact:** Failed RSC fetch has no retry UI except full document crash.  
- **proposal:** `src/app/error.tsx` with reset; lightweight `loading.tsx` skeleton matching header height.  
- **approval:** required (error semantics).

### AUD-UI-003 — Contact fallback form a11y (High)

- **DIRECT_CODE:** `src/components/contact-form.tsx` — `Input` for email **no `type="email"`**, no `autoComplete`, submit **no `aria-busy`**.  
- **`/contact?subject=`** (`contact/page.tsx:110`) **not read** by the form.  
- **proposal:** `type="email"`, `autoComplete` name/email/tel, `aria-busy={isSubmitting}`, `useSearchParams` for subject.  
- **approval:** required (forms).

### AUD-UI-004 — Dual intake on `/contact` (Medium)

- **DIRECT_CODE:** Tally + `ContactForm` stacked (`contact/page.tsx:42–64`).  
- **impact:** Duplicate cognitive load.  
- **proposal:** Tally primary; fallback behind `<details>` “Form didn’t load?”.  
- **approval:** required (public conversion).

### AUD-UI-005 — Desktop nav missing `aria-current` (Medium)

- **DIRECT_CODE:** `desktop-nav.tsx:24–31` computes `active` via class `text-primary` only.  
- **proposal:** `aria-current={active ? "page" : undefined}` on `Link`. Same for mobile item links.

### AUD-UI-006 — Header height swap CLS (Medium)

- **DIRECT_CODE:** `header.tsx:39–42` `h-[72px]` vs `h-16` after 24px scroll.  
- **proposal:** Fixed `h-16` always.

### AUD-UI-007 — Footer: all columns expanded on mobile (Medium)

- **DIRECT_CODE:** `footer.tsx:95–100` `solutions/company/resources: true`. CSS collapses only when `data-expanded=false` (`globals.css:1269–1280`).  
- **impact:** Long footer, extra scroll.  
- **proposal:** Default `false` below `lg`.

### AUD-UI-008 — Footer links `min-h-[32px]` (Medium)

- **DIRECT_CODE:** `footer.tsx:67` vs WCAG 2.5.5 / 44px target. Headers are 48px.  
- **proposal:** `min-h-11` on footer `<Link>`.

### AUD-UI-009 — “All systems operational” (Medium)

- **DIRECT_CODE:** `footer.tsx:187–191` pulse dot, no health fetch.  
- **impact:** Trust.  
- **proposal:** Remove or wire `/api/health`.

### AUD-UI-010 — Global scrollbar hidden (Medium)

- **DIRECT_CODE:** `globals.css` ~1745–1760 `scrollbar-width: none` on `html, body, *`.  
- **impact:** Overflow hard to discover; a11y.  
- **proposal:** Restore vertical scrollbar; keep overflow-x clip.

### AUD-UI-011 — Button variants identical (Medium)

- **DIRECT_CODE:** `button.tsx:14–22` default/primary/secondary/outline all same pill. Comment claims reduced-motion; CVA still `hover:-translate-y-0.5`.  
- **proposal:** One outline + one filled primary; `motion-reduce:transform-none`.  
- **approval:** required (design tokens / brand).

### AUD-UI-012 — CSS graveyard (Low)

- **DIRECT_CODE:** `.hamburger`, `.mobile-nav` overlay (`globals.css` ~850–930) unused by React Sheet. Comment still says `min-[1100px]` while header uses `md:`.  
- **proposal:** Delete unused blocks in a dedicated CSS PR.

### AUD-UI-013 — `global-error` incomplete document (Medium)

- **DIRECT_CODE:** `global-error.tsx:16–17` `<html><body>` no `lang`, no tokens.  
- **proposal:** `lang="en"` + inline background.

### AUD-UI-014 — Insights hub is a client page (Medium)

- **DIRECT_CODE:** `src/app/insights/page.tsx:1` `"use client"` + search. Metadata lives in `layout.tsx` (OK).  
- **impact:** Larger JS; search is filter-only (not a new product search).  
- **proposal:** Server-render hub; client island for filter.

### AUD-UI-015 — No cookie policy (Low)

- Privacy/terms exist; no `/cookies`. Footer has no cookie link.  
- **proposal:** Short cookies page or section in privacy.

### AUD-UI-016 — Mobile logo `span onClick` (Low)

- **DIRECT_CODE:** `mobile-nav.tsx:94` `span onClick={() => setMenuOpen(false)}`. Logo already links home.  
- **proposal:** Wrap `Logo` only.

### AUD-UI-017 — Partnership CTA dead query (Low)

- Same as 003 subject param.

### AUD-UI-018 — i18n (Low / N/A)

- English-only `lang="en"` in layout. No language switcher. **wont_fix** unless product asks.

### AUD-UI-019 — No Storybook (Low)

- `component-showcase` exists, robots-disallowed.

---

## Header & menu

**Strengths:** Skip link (`skip-to-content.tsx`); `role="banner"`; Primary nav `aria-label`; hamburger `aria-expanded` + name; ThemeToggle `onSelect`; mega menu `NavigationMenuLink`; noscript links; e2e covers 375 / 1024 / 1280.

**Gaps:** no `aria-current`; Contact hidden `<sm`; mega hover-first (Radix also click); Sheet vs leftover CSS.

## Footer

`<footer aria-label="Site footer">` (prefer implicit / `contentinfo`). Social `rel="noopener noreferrer"` + 44px. Dynamic year. Privacy/terms/sitemap. Folding CSS max-width 1023 — do **not** re-add `initMobileFoldingFooter`.

## Page loading

WebsiteLoader **hurts** perceived performance. Fonts `display: swap`. No FOUC boot script for theme in `layout.tsx` (good).

## Accessibility

Landmarks: header, main, footer. `html lang="en"`. Focus-visible global. Reduced-motion media query in CSS (good) vs Button lift (gap). Hidden scrollbars (gap).

## Performance (hypothesis where unmarked)

No Lighthouse this run (`confidence: Low` for LCP numbers). Code: loader, client Insights, `framer-motion` on Insights.

## Content & SEO

Canonical `getSiteUrl()`; robots AI bots allowed; llms.txt + generated llms-full; Organization JSON-LD. Cookie policy missing.

## Technical debt

- Duplicate Button variants  
- Duplicate CSS button systems (`.btn-primary` vs CVA)  
- Insights client hub  
- In-memory rate limit (out of UI scope)

## Roadmap (propose)

1. **Phase 1:** Remove/gate WebsiteLoader; `error.tsx`; contact form types.  
2. **Phase 2:** `aria-current`; footer collapse default; footer 44px links; drop fake status.  
3. **Phase 3:** Button token consolidation; delete unused CSS.  
4. **Phase 4:** Server Insights hub; restore scrollbar; cookie copy.  
5. **Phase 5:** Lighthouse/axe CI on `/`, `/insights`, `/contact`.  
6. **Phase 6:** Storybook or keep showcase.  
7. **Future:** i18n only if requested.

---

## QA checklist (when implementing)

- [ ] Playwright header spec green at 375/1024/1280  
- [ ] No 800ms overlay on client nav  
- [ ] Keyboard: skip → main; Escape closes sheet/mega  
- [ ] Contact email field rejects invalid in browser  
- [ ] Footer columns collapsed at 375, open at 1280  
- [ ] axe on `/` `/contact` `/insights` (0 critical)

---

## Persistent findings JSON

See following machine block in chat / `docs/UI_UX_AUDIT_v2.json` (embedded below in agent response).

**Approval gate:** Do not implement Phase 1–3 without explicit “approve loader / forms / nav” — those touch global header/footer/tokens/public conversion.
