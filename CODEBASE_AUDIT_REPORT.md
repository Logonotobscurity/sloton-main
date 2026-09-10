# CODEBASE AUDIT REPORT

**Project:** LOG_ON / `nextn` (Next.js 15 App Router marketing + AI assistant site)  
**Scope:** Full repository as checked out (source, config, API routes, UI, analytics/pipeline stubs).  
**Method:** Static review only — no code was modified.  
**Date:** 2026-08-18  

**Stack notes:** There is **no application database, Prisma/TypeORM schema, or ORM query layer**. Persistence is email (Resend), optional webhook, in-memory log array, and mock data-pipeline / analytics configs. Database findings below are therefore “absence / mock” issues, not missing indexes on a live schema.

```
# CODEBASE AUDIT REPORT

## Critical
──────────────────────────────────────

[C-001]
Files:
- src/app/actions.ts
- middleware.ts
- src/lib/security.ts

Issue:
Public server actions (`askSupportBot`, `getAutomatedTaskDesign`, `getSolutionRecommendationAction`, contact/newsletter/lead) are callable by anyone. Middleware rate limiting only applies to `/api/*`. Server Actions use POST to Next’s action endpoint, not `/api/`, so they bypass the limiter. `getSolutionRecommendationAction` also has no try/catch and will throw unhandled.

Impact:
Unbounded Gemini/Genkit spend (retryWithBackoff up to 3× per ask), email/webhook spam, and possible DoS of the AI provider quota.

Recommendation:
Apply rate limits (and optional CAPTCHA) to server actions; wrap all AI actions in the same error handling as `askSupportBot`.

──────────────────────────────────────

[C-002]
Files:
- src/app/api/logs/route.ts
- src/lib/logger.ts

Issue:
Unauthenticated POST `/api/logs` accepts any JSON array and appends it to a process-global `logs` array with no size cap, schema, or auth. Client logger POSTs automatically. Failed flush re-queues logs incorrectly (`this.logQueue = [...this.logQueue, ...this.logQueue.slice(...)]`), which can explode memory.

Impact:
Anyone can fill instance memory (OOM) or poison logs; in serverless this is per-instance but still a cheap DoS. Log flood also bypasses useful observability.

Recommendation:
Authenticate or drop the ingest endpoint in production; cap body size; never grow an unbounded in-memory array; fix flush re-queue to restore the original `logs` batch only.

──────────────────────────────────────

[C-003]
Files:
- src/app/api/ai/health/route.ts

Issue:
Unauthenticated POST accepts `{ action: 'reset' | 'test' }` and resets AI service manager state (circuit breaker). GET exposes provider names, circuit-breaker state, failure counts, uptime, and environment.

Impact:
Attacker can flip circuit-breaker state and fingerprint infrastructure; combined with C-001 this is an operational control plane on the public internet.

Recommendation:
Require a shared secret / admin session for POST; redact internals on GET or restrict to private network.

──────────────────────────────────────

[C-004]
Files:
- src/app/actions.ts
- src/schemas/forms.ts

Issue:
Server-side `contactFormSchema` is a weak duplicate (`z.string()` only, no min length). `contactFormAction` and `communityLeadAction` never call `.parse()`. Client Zod is not a security boundary. `getAutomatedTaskDesign` / `askSupportBot` accept unbounded strings and full chat history.

Impact:
Oversized payloads, HTML/script in emails (stored XSS in inboxes), prompt-injection into RAG, and webhook abuse.

Recommendation:
Parse the shared schemas from `src/schemas/forms.ts` on the server; add max lengths; sanitize email HTML.

──────────────────────────────────────

[C-005]
Files:
- middleware.ts
- src/lib/security.ts
- src/lib/csp.ts
- src/app/layout.tsx

Issue:
Rate limiter is an in-memory `Map` constructed at module scope. On Vercel/Netlify this does not share state across isolates and resets constantly — it is theater. CSP nonce is generated and set on `x-nonce` but **never applied** to GTM/Matomo/`next/script` tags. Production CSP still allows `'unsafe-eval'` in the unused `SECURITY_HEADERS` copy. `X-Frame-Options: SAMEORIGIN` conflicts with `frame-ancestors 'none'`.

Impact:
Rate limits do not hold under load; CSP does not actually constrain inline scripts (browser may ignore nonce policy when scripts have no nonce — they get blocked *or* the policy is ineffective depending on browsers). Clickjacking headers are inconsistent.

Recommendation:
Use a shared store (Upstash/Redis) for limits; wire nonce into Script tags or drop nonce and use hashes; pick one framing policy.

──────────────────────────────────────

## High
──────────────────────────────────────

[H-001]
Files:
- src/components/faq.tsx
- src/app/solutions/page.tsx
- src/app/automation/[slug]/page.tsx
- src/components/ui/chart.tsx
- src/components/ui/hero-code-preview.tsx
- src/components/ui/article-code-visual.tsx

Issue:
Multiple `dangerouslySetInnerHTML` usages. FAQ answers are hardcoded HTML (currently safe) but the pattern will break the first time CMS/copy is dynamic. Solutions page interpolates `app.solution` through a naive `**bold**` → `<strong>` replace with no HTML escape of the rest of the string.

Impact:
Stored XSS if any data source becomes untrusted (insights, workflow templates, industry copy).

Recommendation:
Render links/bold via React nodes (same as `SafeMessage`) or sanitize with DOMPurify.

──────────────────────────────────────

[H-002]
Files:
- src/app/actions.ts
- src/data-pipeline/server.ts
- src/data-pipeline/connectors.ts

Issue:
Webhook POST has no HMAC, timeout, or retry budget. Ingestion API compares `x-api-key` with `===` (timing-unsafe) and depends on `express`/`ajv`/`uuid` which are **not in package.json**. `INGESTION_API_KEY` undefined makes every request unauthorized or, if env is empty string, may lock the route inconsistently.

Impact:
Lead pipeline is non-runnable as packaged; webhook is spoofable if URL leaks; SSRF-adjacent if `THIRD_PARTY_WEBHOOK_URL` is attacker-controlled via env misconfig.

Recommendation:
Add HMAC + timeout; document required deps or delete the demo server from the Next app tree; use `crypto.timingSafeEqual`.

──────────────────────────────────────

[H-003]
Files:
- next.config.mjs
- package.json
- .eslintrc.json

Issue:
`eslint.ignoreDuringBuilds: true`. `eslint-config-next` is **16.1.6** while `next` is **15.5.9**. CLEANUP_REPORT notes ~100 npm audit vulns (30 high / 4 critical). Firebase is a production dependency but unused as an SDK.

Impact:
Type/lint regressions ship; mismatched ESLint plugins miss App Router rules; supply-chain surface is larger than the product needs.

Recommendation:
Fail CI on lint; align eslint-config-next to Next 15; `npm audit` + drop unused `firebase`.

──────────────────────────────────────

[H-004]
Files:
- src/ai/flows/rag-assistant.ts
- src/app/actions.ts
- src/lib/error-handler.ts

Issue:
`retryWithBackoff` always retries 3 times with 1s+ backoff on *any* error (including 4xx / validation). RAG prompt instructs the model to always search and push sales CTAs. History is sent unsanitized. `handleError` returns raw `error.message` to clients.

Impact:
Cost amplification; prompt injection via history; internal exception strings leak to the UI.

Recommendation:
Retry only transient errors; strip/limit history; map errors to generic client messages.

──────────────────────────────────────

[H-005]
Files:
- src/lib/security.ts
- src/config/app.config.ts

Issue:
CSRF token helpers and JWT expiry config exist but are never issued or checked. Server Actions rely on Next’s origin check only. `validateRequest` is unused and inspects `request.mode` (not a Fetch API header on incoming Request).

Impact:
False sense of CSRF/auth coverage; future API routes will likely ship unprotected.

Recommendation:
Either implement CSRF for cookie-authenticated routes or delete the dead JWT/CSRF surface.

──────────────────────────────────────

[H-006]
Files:
- public/im4lol/mobile-695.gif (per CLEANUP_REPORT ~14MB)
- public/images/team/oluwamayowa.png (~1.7MB)
- src/app/layout.tsx (AnimatedCodeBackground on every page)

Issue:
Huge unoptimized media plus a global animated code canvas (`framer-motion` / canvas work) on all routes.

Impact:
Poor LCP/TBT on mobile; wasted bandwidth in NG market; hurts Core Web Vitals / GEO.

Recommendation:
Compress to WebP/AVIF or video; lazy-load hero media; disable or reduce the global background on content pages.

──────────────────────────────────────

[H-007]
Files:
- src/analytics/* 
- src/data-pipeline/*

Issue:
Large analytics/pipeline modules reference Postgres, Elasticsearch, Kafka, Redis (`analytics.config.ts`) with no implementations wired into the Next app. Tests: 6 failing property tests noted in CLEANUP_REPORT.

Impact:
Dead weight in the bundle/typecheck graph; onboarding confusion; failing tests normalize red CI.

Recommendation:
Move stubs to a separate package or `docs/`; quarantine or fix failing tests.

──────────────────────────────────────

## Medium
──────────────────────────────────────

[M-001]
Files:
- src/app/actions.ts
- src/schemas/forms.ts

Issue:
Duplicate Zod schemas with different shapes (`solutionRecommendationSchema` in actions ≠ forms.ts). Newsletter schema on server has no name field; forms.ts does.

Impact:
Client/server validation drift; silent acceptance of invalid AI form payloads.

Recommendation:
Single schema module imported by both client forms and server actions.

──────────────────────────────────────

[M-002]
Files:
- src/lib/logger.ts
- src/lib/security.ts
- src/lib/shutdown.ts

Issue:
`setInterval` in Logger (browser) and RateLimiter (server) without Edge-safe guards. Middleware imports Node `crypto` via CSP + RateLimiter’s `crypto` and dynamic `shutdown` import — Edge middleware may fail or bloat.

Impact:
Unreliable middleware on some hosts; timer leaks in long-lived Node.

Recommendation:
Split Edge-safe middleware from Node-only security helpers.

──────────────────────────────────────

[M-003]
Files:
- src/hooks/use-mobile.tsx
- src/hooks/use-media-query.tsx

Issue:
Two breakpoint hooks; `useMediaQuery` defaults to `false` (desktop) then flips (layout shift) and listens to `resize` instead of `matchMedia.change`.

Impact:
Hydration flicker; extra listeners.

Recommendation:
Consolidate on one hook with `undefined` initial state.

──────────────────────────────────────

[M-004]
Files:
- src/lib/data/industries.tsx
- src/lib/data/industries-data.ts
- src/lib/data/workflow-templates.ts
- src/lib/data/workflow-templates.json

Issue:
Parallel data sources for the same domains (documented as “distinct” but easy to desync).

Impact:
Copy/URL drift across /use-cases and homepage bento.

Recommendation:
One source of truth with view-specific selectors.

──────────────────────────────────────

[M-005]
Files:
- src/app/layout.tsx
- src/lib/constants.ts

Issue:
Hardcoded `https://logonai.netlify.app`, GTM fallback `GTM-XXXXXXX` (invalid ID still injected), Matomo site ID `1` hardcoded in Script, not `NEXT_PUBLIC_SITE_URL`.

Impact:
Wrong canonical/OG if domain changes; wasted third-party requests with dummy GTM.

Recommendation:
Single `SITE_URL` env; skip GTM script when ID is placeholder.

──────────────────────────────────────

[M-006]
Files:
- src/components/faq.tsx
- src/app/support/page.tsx (implied)
- src/lib/data/support-data.ts

Issue:
Community Forums `href: '#'`. Several marketing CTAs go nowhere.

Impact:
Broken UX and accessibility (focusable dead links).

Recommendation:
Remove or point to a real destination.

──────────────────────────────────────

[M-007]
Files:
- src/ai/examples/ai-service-usage.tsx
- genkit-project/
- src/app/component-showcase/page.tsx

Issue:
Example/demo routes and a nested genkit project live in the production app tree.

Impact:
Extra pages in the 182-page build; accidental public showcase of internal components.

Recommendation:
Gate with `NODE_ENV` or move to Storybook.

──────────────────────────────────────

[M-008]
Files:
- src/lib/error-handler.ts (handleError details)
- src/app/api/health/route.ts

Issue:
Health endpoint exposes heap used/total and environment. Error responses may include stack in development but `details` can still leak via logger flush to public `/api/logs`.

Impact:
Recon for attackers; PII in client-flushed logs (email in newsletter success logs).

Recommendation:
Never log emails at info; redact health internals.

──────────────────────────────────────

[M-009]
Files:
- src/components/ui/* (shadcn)
- tailwind.config.ts
- src/app/globals.css (~1800+ lines)

Issue:
Design tokens exist (CSS variables) but many sections use one-off `text-primary`, arbitrary values (`[mask-image:_linear-gradient...]`), mixed `py-fluid-lg` vs `py-12` / `mt-12`. Heading levels in articles skip (h2 → h3 FAQs) inconsistently across pages.

Impact:
Visual drift; harder theming; uneven heading outline for a11y/SEO.

Recommendation:
Enforce spacing/type scale in a small set of section primitives.

──────────────────────────────────────

[M-010]
Files:
- src/components/header/*
- src/components/ui/button.tsx

Issue:
Generally good skip-link and labels exist (`skip-to-content`, theme toggle aria-label). Gaps: FAQ accordion HTML answers are not keyboard-documented beyond Radix defaults; global animated background is `aria-hidden` (good) but may still cause vestibular motion with no `prefers-reduced-motion` short-circuit visible in layout.

Impact:
Motion-sensitive users; contrast of `text-muted-foreground` on `bg-secondary/20` should be verified in dark mode.

Recommendation:
Honor `prefers-reduced-motion` at the layout root; audit muted-on-secondary contrast.

──────────────────────────────────────

## Low
──────────────────────────────────────

[L-001]
Files:
- package.json

Issue:
Package name is `nextn` / version `0.1.0` — leftover template identity.

Recommendation:
Rename to `@logon/web` or similar.

──────────────────────────────────────

[L-002]
Files:
- src/lib/csp.ts
- src/lib/security.ts

Issue:
Two independent CSP builders that will drift (already have: Matomo allowed in one, not the other).

Recommendation:
Delete `SECURITY_HEADERS` CSP; import `getCSPPolicy` only.

──────────────────────────────────────

[L-003]
Files:
- middleware.ts

Issue:
No `export const config.matcher` — middleware runs on every asset including `_next/static` and images.

Impact:
Unnecessary latency and nonce generation on static files.

Recommendation:
Match only pages + `/api`.

──────────────────────────────────────

[L-004]
Files:
- src/config/app.config.ts
- src/config/config-manager.ts

Issue:
Heavy config system for a mostly-static site; JWT fields unused.

Recommendation:
Slim to env-validated Zod config.

──────────────────────────────────────

[L-005]
Files:
- src/lib/icons.tsx (375 lines)
- src/lib/image-utils.tsx
- src/lib/animation-variants.ts (496 lines)

Issue:
Large utility modules; some icons likely unused (dead-export risk).

Recommendation:
Run knip/ts-prune; colocate animation variants with consumers.

──────────────────────────────────────

[L-006]
Files:
- README.md (114 bytes)

Issue:
README is effectively empty; real knowledge is in CLEANUP_REPORT.md and docs/archive.

Recommendation:
Restore a short install/env/run README.

──────────────────────────────────────

[L-007]
Files:
- src/components/articles/visual-ai-document-article.tsx

Issue:
`process.env.GEMINI_API_KEY` appears inside a **string example** in a client component — not executed, but greps will false-positive and copy-paste readers may put keys in client code.

Recommendation:
Show `process.env.GEMINI_API_KEY` only in a clearly server-only snippet comment.

──────────────────────────────────────

[L-008]
Files:
- next.config.mjs images.remotePatterns

Issue:
Wide `**` pathnames for picsum, icons8, uxwing, etc.

Impact:
Any HTTPS image on those hosts can be optimized through your Next image proxy (bandwidth abuse).

Recommendation:
Narrow pathnames.

──────────────────────────────────────

[L-009]
Files:
- public/service-worker.js
- src/lib/register-sw.ts
- src/app/api/service-worker/route.ts

Issue:
Multiple SW registration paths; easy to serve stale HTML caches for a marketing site that changes often.

Recommendation:
Network-first for HTML; single registration entry.

──────────────────────────────────────

[L-010]
Files:
- .github/workflows/*

Issue:
CI exists (lint, e2e, lighthouse, security) but local CLEANUP notes `next lint` deprecation and ignored build lint.

Recommendation:
Make security.yml + typecheck required checks on PRs.

```

---

## Coverage map (what was / was not found)

### 1. Code quality
Dead/duplicate layers remain after a recent cleanup (analytics stubs, dual CSP, dual industry data, dual form schemas, unused Firebase, `ai/examples`). Naming is mostly consistent (`kebab-case` files). Hardcoded site URL, WhatsApp, and GTM placeholders should be env-only.

### 2. Database & performance
**No production schema.** In-memory `logs[]` is the only “table” and it has no eviction. N+1 is not applicable. Over-fetch: RAG loads full insights/case-studies/services into the tool closure on every invocation. Pagination: insights appear statically listed — fine at current size, will not scale if content grows.

### 3. UI consistency
shadcn + Tailwind tokens are the system; page-sections mix fluid and fixed spacing. Chat path is a11y-conscious (`SafeMessage`, skip link). FAQ HTML and muted contrast are the main a11y gaps. Images reviewed via `next/image` generally include alt text.

### 4. Debugging & reliability
Central `handleError` / `logger` is good but unused in several catch sites (`config`, `social-share`, `AssistCard`, pipeline). `getSolutionRecommendationAction` swallows nothing — it throws. Contact form returns `{ success: true }` even when Resend is unset (silent “success”).

### 5. Performance
Global `AnimatedCodeBackground`, large GIFs/PNGs, `lodash` full package, `recharts` on marketing pages, no route-level `dynamic`/`lazy` for chatbot/forms. First-load JS was previously reported ~261 kB — chatbot + framer-motion are the main levers.

### 6. Security
Strong *intent* (headers, sanitize helper, SafeMessage) but controls are incomplete: unauthenticated AI + logs + health POST, weak server Zod, in-memory rate limit, unused CSRF, webhook without signing. No classic SQL injection (no SQL). XSS risk is concentrated in `dangerouslySetInnerHTML` + email HTML.

---

**Status (2026-08-18):** Critical/High items C-001–C-005, H-001, H-002 (webhook timeout + secret header), H-004 (retry only transient), M-006 (dead support link), M-005 (dummy GTM skipped), M-008 (health internals) are implemented in this branch. Remaining: shared Redis rate limit, image compression, unused firebase, analytics stubs.
