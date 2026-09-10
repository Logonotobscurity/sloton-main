# AI readability / LLMO layer

**Business decision (2026-08-18):** LOG_ON intentionally permits recognized AI crawlers to access public marketing, educational, and trust content, and publishes `/llms.txt`, because discoverability in AI search and assistants is strategically valuable. `robots.txt` grants permission; `llms.txt` supplies context. Neither guarantees citation.

Private surfaces stay disallowed: `/api/`, `/admin/`, `/_next/`, `/.netlify/`, `/private/`.

## Files
- `src/app/robots.ts` — crawler policy
- `public/llms.txt` — short Answer.AI map
- `public/llms-full.txt` — longer factual dump
- `src/lib/site.ts` — entity + pricing facts
- `src/components/entity-lead.tsx`, `page-faq.tsx`, `last-updated.tsx`

## Test
A. Browser with JS  
B. View Source: entity sentence, pricing, FAQ answers present  
C. JS disabled: same facts remain  
D. JSON-LD: Organization `sameAs`, Article `datePublished` / `dateModified`  
E. `GET /robots.txt` and `GET /llms.txt`  
F. Case-study claims include a named source or internal record year
