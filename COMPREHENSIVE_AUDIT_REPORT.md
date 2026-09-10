# Comprehensive Codebase Audit Report

**Project:** LOG_ON / `nextn` (Next.js 15 App Router)  
**Scope:** Full tree excluding `node_modules`, `.git`, `.next`  
**Date:** 2026-08-18  
**Method:** Static inspection only — **no code was modified** for this report.

**Stats:** ~545 tracked source/config/asset files · ~200 `.tsx` · ~111 `.ts` · 31 `page.tsx` routes · 6 API routes · 12 GitHub workflow YAMLs.

---

## Table of contents

1. [Input inventory](#1-input-inventory)
2. [Executive summary](#2-executive-summary)
3. [Phase 1 — Architecture](#3-phase-1--architecture)
4. [Phase 2 — Quality, security, performance](#4-phase-2--quality-security-performance)
5. [Phase 3 — Redundancy](#5-phase-3--redundancy)
6. [Phase 4 — Deep URL & routing](#6-phase-4--deep-url--routing)
7. [Issue register](#7-issue-register)
8. [Traceability matrix](#8-traceability-matrix)
9. [Action plan](#9-action-plan)
10. [Open questions](#10-open-questions)

---

## 1. Input inventory

| Source ID | Type | Path / Description | Status |
|---|---|---|---|
| SRC-001 | App routes | `src/app/**/page.tsx` (31 pages) | Available |
| SRC-002 | API | `src/app/api/**/route.ts(x)` (6) | Available |
| SRC-003 | Server actions | `src/app/actions.ts` | Available |
| SRC-004 | Middleware | `middleware.ts` | Available |
| SRC-005 | Config | `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts` | Available |
| SRC-006 | Env templates | `.env.example`, `.env.analytics.example` | Available |
| SRC-007 | SEO / routing | `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/seo/*`, `src/lib/site.ts` | Available |
| SRC-008 | Nav | `src/lib/menu-data.ts`, `src/components/header/*` | Available |
| SRC-009 | Security | `src/lib/security.ts`, `src/lib/action-guard.ts`, `src/lib/csp.ts` | Available |
| SRC-010 | AI | `src/ai/**`, Genkit | Available |
| SRC-011 | Stubs | `src/analytics/**`, `src/data-pipeline/**` | Available |
| SRC-012 | Tests | `src/lib/__tests__/**`, `e2e/header.spec.ts`, `vitest.config.ts` | Available |
| SRC-013 | CI | `.github/workflows/*.yml` | Available |
| SRC-014 | Hosting | `netlify.toml`, `vercel.json`, `firebase.json` | Available |
| SRC-015 | Public | `public/llms.txt`, `public/service-worker.js` | Available |

**Not present:** Prisma/ORM, SQL migrations, auth product, real Kafka/ES. Those layers do not exist; findings below are “absence / mock,” not missing indexes.

---

## 2. Executive summary

**Health score: 6 / 10**

Solid Next.js marketing + Genkit assistant with recent hardening (Zod on actions, Tally webhook, PostHog, CSP, FAQ SSR). Debt is **split identity** (two Netlify hosts), **routing/schema 404s**, **in-memory rate limits**, **unused Firebase + analytics stubs**, and **JWT/CSRF config that is never used**.

### Top 3 critical

1. **Canonical host split** — `getSiteUrl()` defaults to `logonai.netlify.app` while JSON-LD / layout / many `canonical` fields still hardcode `logonsolutions.netlify.app` (see AUDIT-001).
2. **Schema SearchAction → `/search` does not exist** (AUDIT-002).
3. **In-memory rate limit + optional open `/api/logs` in non-production** (AUDIT-003, AUDIT-004).

**Estimated total improvement effort:** 2–3 engineer-weeks (routing/canonical 2d, security store 3d, dead-code/deps 2d, tests/CI 3d).

---

## 3. Phase 1 — Architecture

**Intended pattern:** Next.js App Router marketing site + Server Actions + optional Genkit. Not Clean Architecture. Layers are mixed: pages import data + schema + UI; `actions.ts` is the application service.

**Violations (confirmed):**

- **Dual site URL sources:** `src/lib/site.ts:2–3` vs `src/lib/seo/json-ld.tsx:31–37` vs `src/config/app.config.ts:82–83`.
- **JWT/CSRF in config never consumed** — `src/config/app.config.ts:90–93`, `src/lib/security.ts` CSRF helpers unused by middleware.
- **Business + I/O in one file:** `src/app/actions.ts` (rate limit, Zod, Resend, webhook, PostHog).
- **Client pages hold commercial copy** that also exists in `llms.txt` / `SITE.entityDefinition` (drift risk).
- **`src/analytics` + `src/data-pipeline`** describe Kafka/Postgres/ES and are not imported by `src/app`.

**State:** Zustand (`src/hooks/use-ui-store.ts`, chatbot store). Local form state via RHF. No server session.

**DI:** `AIServiceManager.createFromEnvironment()` — factory, not injected; fine at this scale.

---

## 4. Phase 2 — Quality, security, performance

- **Complexity:** `src/components/faq.tsx`, `src/ai/flows/rag-assistant.ts`, `src/app/globals.css` (~1800+ lines) exceed maintainability budgets. `rag-assistant.ts` knowledge array + prompt > 50 lines.
- **Naming:** `package.json` name `"nextn"` (line 2). `transperent-background.webp` typo in SW precache.
- **Security (remaining):** RateLimiter `Map` in `src/lib/action-guard.ts:5` and `src/lib/security.ts` — not shared across Netlify isolates. Logs ingest open if `NODE_ENV !== 'production'` (`src/app/api/logs/route.ts:13–16`). No CAPTCHA on Tally/site forms. `firebase` unused but shipped.
- **Logging:** Client logger still POSTs `/api/logs` (`src/lib/logger.ts`).
- **Performance:** Global `AnimatedCodeBackground` on layout; large GIF historically flagged; `lodash` full package in `package.json:56`.
- **Tests:** Thin unit coverage; 6 analytics property tests previously failing (CLEANUP_REPORT). `e2e/header.spec.ts` may be stale vs new header (desktop breakpoint 1100px).

---

## 5. Phase 3 — Redundancy

**Safe to delete (after grep confirmation):**

| Path | Reason |
|---|---|
| `src/analytics/**` | Not imported by app |
| `src/data-pipeline/**` | Demo Express server; `express`/`ajv` not in `package.json` |
| `src/ai/examples/**` | Examples |
| `src/app/component-showcase/page.tsx` | Internal showcase |
| `src/app/ab-testing/page.tsx` | Demo; already off sitemap |
| `src/app/about/analyst-reports/page.tsx` | Duplicate of `/about/reports` |
| `firebase` dependency | No `from 'firebase'` in `src` |

**Duplicate URL sources:** `logonsolutions.netlify.app` string appears throughout `json-ld.tsx` while `getSiteUrl()` exists.

**Unused deps:** `firebase`. Likely underused: `@types/lodash` if lodash can be per-method.

---

## 6. Phase 4 — Deep URL & routing

### 6.1 Implemented routes (31 pages)

See inventory in prior message. Dynamic: `/insights/[slug]` (23 slugs in `src/lib/data/insights.ts`), `/automation/[slug]` from templates.

### 6.2 Header vs sitemap vs disk

| Exists | In header | In sitemap |
|---|---|---|
| Core services + contact + about + partners | Yes | Yes |
| `/support`, `/ideas-lab`, `/about/investors`, `/about/locations` | No | Yes |
| `/about/newsroom`, `/research`, `/trust`, `/global-impact`, `/analyst-reports` | No | **No** |
| `/ab-testing`, `/component-showcase` | No | No (intentional) |

### 6.3 Broken / phantom URLs (confirmed)

| Linked / advertised | Evidence | Reality |
|---|---|---|
| `https://logonai.netlify.app/search?q={search_term_string}` | `src/lib/seo/json-ld.tsx:37` | **No** `src/app/search/page.tsx` |
| `/offline` | `src/config/app.config.ts:139`, `src/lib/service-worker-config.ts:29` | **No** page |
| `/use-cases#e-commerce` | `src/app/automation/page.tsx:149` | Section id is `ecommerce` (`src/lib/data/industries-data.ts:56`) |
| Privacy / Terms | `src/components/footer.tsx:188` (plain text) | **No** `/privacy` or `/terms` |
| `/admin/`, `/private/` | `src/app/robots.ts` disallow | **No** such app routes |
| `/auth/` | `src/lib/service-worker-config.ts:39` regex | **No** auth routes |

### 6.4 Host split

| Location | Host |
|---|---|
| `src/lib/site.ts:3` default | `https://logonai.netlify.app` |
| `src/lib/seo/json-ld.tsx:31,37,52,118…` | `https://logonai.netlify.app` |
| `src/config/app.config.ts:82–83` | `logonsolutions.netlify.app` + fictional `api.logonsolutions.netlify.app` |
| Many page `canonical:` props | still old host |

Crawlers and Google can treat two origins as two sites.

### 6.5 Insight slugs never cross-linked

`ai-investment-playbook`, `building-recommendation-systems`, `cybersecurity-ai-threats-opportunities`, `interactive-diagrams-codebase`, `no-code-low-code-nigeria`, `prompt-engineering-for-business`, `scaling-securely-cloud-infrastructure`, `transforming-customer-support-with-ai` — reachable from `/insights` index only.

---

## 7. Issue register

### 🔴 AUDIT-001
| | |
|---|---|
| **Location** | `src/lib/seo/json-ld.tsx:31–37`, `:52`, `:118–122`; `src/config/app.config.ts:82–83`; vs `src/lib/site.ts:2–3` |
| **Category** | Architecture / Routing |
| **Description** | Two public origins. Sitemap uses `getSiteUrl()`; schema and most canonicals do not. |
| **Evidence** | `url: 'https://logonai.netlify.app'` vs default `'https://logonai.netlify.app'` |
| **Impact** | Split SEO equity; wrong SearchAction host; OG/canonical mismatch on live `logonai`. |
| **Root Cause** | Partial migration to `getSiteUrl()` / new Netlify site. |
| **Recommended Solution** | Single `getSiteUrl()` import everywhere; set `NEXT_PUBLIC_SITE_URL` in Netlify; 301 old host → new. |
| **Priority** | Critical |
| **Effort** | 4–8h |
| **Risk of Fix** | Medium (SEO) |
| **Confidence** | Confirmed |

### 🔴 AUDIT-002
| | |
|---|---|
| **Location** | `src/lib/seo/json-ld.tsx:33–37` |
| **Category** | Routing |
| **Description** | `SearchAction` points at `/search` which has no page. |
| **Evidence** | `urlTemplate: '.../search?q={search_term_string}'` — no `src/app/search` |
| **Impact** | Invalid rich result; 404 if Google/Bing use the action. |
| **Root Cause** | Schema copied from template. |
| **Recommended Solution** | Remove `potentialAction` or add `/search`. |
| **Priority** | Critical |
| **Effort** | 1h (remove) / 1d (build search) |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🔴 AUDIT-003
| | |
|---|---|
| **Location** | `src/lib/action-guard.ts:5–41`; `src/lib/security.ts` `RateLimiter`; `middleware.ts` |
| **Category** | Security |
| **Description** | Rate limits are process-local `Map`s. Netlify/Vercel isolates reset constantly. |
| **Evidence** | `const actionLimiter = new RateLimiter();` module scope |
| **Impact** | AI/form abuse still cheap in production. |
| **Root Cause** | No shared store. |
| **Recommended Solution** | Upstash Redis or Netlify Blobs; keep in-memory only for dev. |
| **Priority** | Critical |
| **Effort** | 1–2d |
| **Risk of Fix** | Medium |
| **Confidence** | Confirmed |

### 🟠 AUDIT-004
| | |
|---|---|
| **Location** | `src/app/api/logs/route.ts:13–16` |
| **Category** | Security |
| **Description** | If `LOGS_INGEST_SECRET` unset and not production, POST is open. Preview/staging often `NODE_ENV=production` **or** not — inconsistent. |
| **Evidence** | `if (process.env.NODE_ENV === 'production' && !secret) return false; if (!secret) return true;` |
| **Impact** | Open ingest on mis-labeled envs. |
| **Recommended Solution** | Require secret whenever not `development`. |
| **Priority** | High |
| **Effort** | 30m |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟠 AUDIT-005
| | |
|---|---|
| **Location** | `src/app/automation/page.tsx:149` vs `src/lib/data/industries-data.ts:56` |
| **Category** | Routing |
| **Description** | Hash `#e-commerce` does not match `id: 'ecommerce'`. |
| **Evidence** | `href="/use-cases#e-commerce"` / `id: 'ecommerce'` |
| **Impact** | CTA lands at top of use-cases, not the industry section. |
| **Root Cause** | Inconsistent slug style. |
| **Recommended Solution** | One id (`ecommerce`) and update all hrefs. |
| **Priority** | High |
| **Effort** | 15m |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟠 AUDIT-006
| | |
|---|---|
| **Location** | `src/config/app.config.ts:139`; `src/lib/service-worker-config.ts:29` |
| **Category** | Routing |
| **Description** | SW precaches `/offline` with no page → install can fail or cache 404. |
| **Evidence** | `precacheUrls` includes `'/offline'` |
| **Impact** | Broken offline UX; SW install errors. |
| **Recommended Solution** | Add `src/app/offline/page.tsx` or drop URL. |
| **Priority** | High |
| **Effort** | 2h |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟠 AUDIT-007
| | |
|---|---|
| **Location** | `src/components/footer.tsx:188` |
| **Category** | Routing / Legal |
| **Description** | “Privacy • Terms” is not linked to routes. |
| **Evidence** | Literal text in copyright row |
| **Impact** | No legal pages; trust/GEO gap. |
| **Recommended Solution** | Add `/privacy` `/terms` or remove the words. |
| **Priority** | High |
| **Effort** | 4h |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟠 AUDIT-008
| | |
|---|---|
| **Location** | `package.json:55` (`firebase`) |
| **Category** | Redundancy / Security |
| **Description** | Firebase SDK shipped; zero `from 'firebase'` in `src`. |
| **Evidence** | grep empty |
| **Impact** | Bundle/audit surface (~100 npm vulns noted historically). |
| **Recommended Solution** | `npm uninstall firebase` |
| **Priority** | High |
| **Effort** | 15m |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟡 AUDIT-009
| | |
|---|---|
| **Location** | `src/app/sitemap.ts:31–40` vs `src/app/about/*/page.tsx` |
| **Category** | Routing |
| **Description** | About subpages exist but are omitted from sitemap and header. |
| **Evidence** | Disk: newsroom, research, trust, global-impact, analyst-reports; sitemap lists only 4 about paths |
| **Impact** | Weaker discovery; orphan URLs. |
| **Recommended Solution** | Add to sitemap **or** 301 to `/about#…` |
| **Priority** | Medium |
| **Effort** | 2h |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟡 AUDIT-010
| | |
|---|---|
| **Location** | `src/app/about/analyst-reports/page.tsx` and `src/app/about/reports/page.tsx` |
| **Category** | Redundancy |
| **Description** | Two report URLs. Menu uses `/about/reports`. |
| **Impact** | Duplicate content. |
| **Recommended Solution** | Keep one; redirect the other. |
| **Priority** | Medium |
| **Effort** | 1h |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟡 AUDIT-011
| | |
|---|---|
| **Location** | `src/config/app.config.ts:90–93`; `src/lib/security.ts` CSRF/JWT |
| **Category** | Architecture |
| **Description** | CSRF/JWT constants unused; false sense of auth. |
| **Impact** | Future APIs ship unprotected. |
| **Recommended Solution** | Delete unused surface or implement. |
| **Priority** | Medium |
| **Effort** | 2h |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟡 AUDIT-012
| | |
|---|---|
| **Location** | `src/analytics/**`, `src/data-pipeline/**` |
| **Category** | Redundancy |
| **Description** | Large unused subsystems; pipeline imports `express` not in package.json. |
| **Impact** | Onboarding noise; unrunnable demo. |
| **Recommended Solution** | Move to `docs/` or delete. |
| **Priority** | Medium |
| **Effort** | 2h |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟡 AUDIT-013
| | |
|---|---|
| **Location** | `src/app/layout.tsx` `AnimatedCodeBackground`; `package.json:56` lodash |
| **Category** | Performance |
| **Description** | Global canvas + full lodash. |
| **Impact** | TBT on mobile. |
| **Recommended Solution** | Lazy background; `lodash-es` per-function or native. |
| **Priority** | Medium |
| **Effort** | 1d |
| **Risk of Fix** | Medium |
| **Confidence** | Confirmed |

### 🟢 AUDIT-014
| | |
|---|---|
| **Location** | `package.json:2` |
| **Category** | Code Quality |
| **Description** | Package name `nextn`. |
| **Recommended Solution** | Rename to `@logon/web`. |
| **Priority** | Low |
| **Effort** | 15m |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

### 🟢 AUDIT-015
| | |
|---|---|
| **Location** | `e2e/header.spec.ts` |
| **Category** | Code Quality |
| **Description** | E2E assumes desktop nav at default viewport; header now `min-[1100px]`. |
| **Impact** | Flaky/failing e2e. |
| **Recommended Solution** | Set viewport ≥1100 or test hamburger. |
| **Priority** | Low |
| **Effort** | 1h |
| **Risk of Fix** | Low |
| **Confidence** | Inferred (spec not re-run this pass) |

### 🟢 AUDIT-016
| | |
|---|---|
| **Location** | `src/lib/data/insights.ts` slugs listed in §6.5 |
| **Category** | Routing |
| **Description** | Eight articles never internally linked. |
| **Recommended Solution** | Related-posts component. |
| **Priority** | Low |
| **Effort** | 3h |
| **Risk of Fix** | Low |
| **Confidence** | Confirmed |

---

## 8. Traceability matrix

| Issue ID | Location | Priority | Action Plan Phase | Status |
|---|---|---|---|---|
| AUDIT-001 | `json-ld.tsx`, `app.config.ts`, `site.ts` | Critical | Immediate | Done (`getSiteUrl` / logonai) |
| AUDIT-002 | `json-ld.tsx:33–37` | Critical | Immediate | Done (SearchAction removed; `/search` → `/insights`) |
| AUDIT-003 | `action-guard.ts:5` | Critical | Immediate | Open (in-memory only; needs Upstash) |
| AUDIT-004 | `api/logs/route.ts:13–16` | High | Immediate | Done |
| AUDIT-005 | `automation/page.tsx:149` | High | Immediate | Done |
| AUDIT-006 | `service-worker-config.ts:29` | High | Week 1 | Done (`/offline`) |
| AUDIT-007 | `footer.tsx:188` | High | Week 1 | Done (`/privacy` `/terms`) |
| AUDIT-008 | `package.json:55` | High | Week 1 | Done (firebase removed) |
| AUDIT-009 | `sitemap.ts` vs `about/*` | Medium | Weeks 2–4 | Done |
| AUDIT-010 | dual reports routes | Medium | Weeks 2–4 | Done (301) |
| AUDIT-011 | unused JWT/CSRF | Medium | Weeks 2–4 | Done (surface removed) |
| AUDIT-012 | analytics/pipeline stubs | Medium | Weeks 2–4 | Done (deleted) |
| AUDIT-013 | layout background / lodash | Medium | Months 2–3 | Partial (reduced-motion skip; lodash unused in src) |
| AUDIT-014 | package name | Low | Optional | Done (`logon-web`) |
| AUDIT-015 | e2e header | Low | Weeks 2–4 | Done (1100px / 1024 hamburger spec) |
| AUDIT-016 | unlinked insights | Low | Ongoing | Done (related insights) |

---

## 9. Action plan

### Immediate (Week 1)
1. Unify host via `getSiteUrl()` + Netlify env + 301 — AUDIT-001. **Done when:** no `logonsolutions.netlify.app` left in `src/` except redirects.  
2. Remove SearchAction or add `/search` — AUDIT-002.  
3. Fix `#e-commerce` — AUDIT-005.  
4. Tighten logs auth — AUDIT-004.  
5. Uninstall firebase — AUDIT-008.

### Short-term (Weeks 2–4)
1. Offline page or drop precache — AUDIT-006.  
2. Privacy/Terms pages — AUDIT-007.  
3. Sitemap + 301 about orphans — AUDIT-009, AUDIT-010.  
4. Delete stubs; update e2e — AUDIT-012, AUDIT-015.  
5. Shared Redis rate limit — AUDIT-003.

### Medium-term (Months 2–3)
1. Performance (background, lodash, images) — AUDIT-013.  
2. Related posts — AUDIT-016.  
3. Required CI: typecheck + lint + e2e header.

### Long-term
1. Real lead store or Tally-only (retire dual forms).  
2. Quality gates (knip, lighthouse budget).  
3. Expand tests beyond date-utils/error-handler.

---

## 10. Open questions

- **Assumption:** Production should be `https://logonai.netlify.app`. Confirm if `logonsolutions.netlify.app` must remain canonical.  
- **Not re-run:** `npm audit`, full `vitest`, Playwright against new header (AUDIT-015 Inferred).  
- **Tally webhook** requires deploy + secrets; not verified live in this audit.  
- **No database** — N+1 / index findings N/A.

---

*This document is analysis-only. No application code was changed to produce it.*
