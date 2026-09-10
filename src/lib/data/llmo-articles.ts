import imageData from "@/lib/placeholder-images.json";

export type ClusterBlock = { heading?: string; paragraphs: string[] };

export type LlmoArticle = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  section: string;
  date: string;
  author: string;
  tags: string[];
  body: ClusterBlock[];
};

const img = imageData.seoVsGeo;

export const llmoArticles: LlmoArticle[] = [
  {
    slug: "ai-search-optimization-guide",
    title: "AI Search Optimization: The Complete Guide for 2026",
    description:
      "How Nigerian and global brands get cited by ChatGPT, Perplexity, Claude, and Google AI Overviews in 2026. GEO, LLMO, schema, llms.txt, and citation strategy.",
    kind: "Complete Guide / Pillar",
    section: "00 — Start here",
    date: "2026-04-15",
    author: "Oluwamayowa Logo",
    tags: ["AI Search", "LLMO", "GEO", "SEO"],
    body: [
      {
        paragraphs: [
          "AI search is no longer a side channel. Procurement teams in Lagos, Nairobi, and London now ask ChatGPT and Perplexity who to shortlist before they open your site. This pillar is the LOG_ON operating manual for being the source those systems cite.",
          "The work has three layers: entity clarity (who you are, in language a model can ground), crawl access (robots, Bing, llms.txt), and citation-grade pages (statistics, named methods, dates). Skip one layer and the other two waste budget.",
        ],
      },
      {
        heading: "What “cited” actually means",
        paragraphs: [
          "A citation is a named mention plus a link or a retrievable URL in the answer. Impressions without attribution do not compound brand search. Measure citations per priority prompt, not vanity traffic.",
          "LOG_ON treats AI search like a quarterly cycle: inventory prompts buyers actually type, ship entity and schema fixes, publish one source-backed guide, then re-audit. Ninety days is the review cadence we use on this hub.",
        ],
      },
      {
        heading: "The five assets every African operator should ship first",
        paragraphs: [
          "Organization schema with sameAs, a public entity paragraph, /llms.txt and /llms-full.txt, FAQ schema on money pages, and one comparison or how-to that quotes a primary source. That set is cheaper than a 40-page content farm and more likely to be retrieved.",
          "If you only read one cluster after this guide, start with Foundations, then Technical. Industry plays come after the entity graph is consistent.",
        ],
      },
    ],
  },
  {
    slug: "geo-vs-seo",
    title: "GEO vs SEO: What's the Difference in 2026?",
    description:
      "GEO optimizes for AI citation; SEO optimizes for blue-link rankings. Side-by-side comparison across 10 dimensions for African and global marketers.",
    kind: "Comparison",
    section: "01 — Foundations",
    date: "2026-04-18",
    author: "Favour Alfred",
    tags: ["GEO", "SEO", "AI Search"],
    body: [
      {
        paragraphs: [
          "SEO still wins classic Google blue links. GEO (Generative Engine Optimization) wins the answer box: ChatGPT Search, Perplexity, Gemini, Copilot, and Google AI Overviews. In 2026 you run both; you do not replace one with a slogan.",
          "Aggarwal et al. (2024) showed citation-rich, statistic-heavy pages lift generative visibility. That is a writing and sourcing change, not a new keyword tool.",
        ],
      },
      {
        heading: "Ten dimensions",
        paragraphs: [
          "Goal, unit of success, crawl surface, freshness, E-E-A-T vs entity graph, schema, links vs citations, zero-click risk, measurement, and org owner. SEO is usually marketing. GEO needs marketing plus engineering (robots, llms.txt, logs).",
          "Nigerian publishers who only chase rankings will watch AI Overviews answer the query from a foreign wiki. Pair GEO with local entity signals (Lagos NAP, CAC name, sameAs).",
        ],
      },
    ],
  },
  {
    slug: "llmo-vs-seo",
    title: "LLMO vs SEO: What's the Difference in 2026?",
    description:
      "LLMO targets AI citations; SEO targets blue-link rankings. Twelve-dimension comparison grounded in GEO research, written for LOG_ON clients.",
    kind: "Comparison",
    section: "01 — Foundations",
    date: "2026-05-02",
    author: "Oluwamayowa Logo",
    tags: ["LLMO", "SEO", "AI Search"],
    body: [
      {
        paragraphs: [
          "LLMO is Large Language Model Optimization: make ChatGPT, Claude, Copilot, and Perplexity retrieve and name you. SEO is still the discipline of ranking URLs. They share crawl hygiene. They diverge on what “winning” looks like.",
          "LLMO rewards extractable claims, author identity, and machine-readable maps. SEO still rewards links and intent matching. Budget both; report them on different dashboards.",
        ],
      },
    ],
  },
  {
    slug: "google-ai-overviews-explained",
    title: "Google AI Overviews Explained: How They Work & How to Appear",
    description:
      "AI Overviews launched May 2024 as the SGE rebrand. Gemini-powered, they cite sources and trigger on a subset of queries — here is the 2026 playbook.",
    kind: "Deep Dive",
    section: "01 — Foundations",
    date: "2026-05-06",
    author: "Favour Alfred",
    tags: ["AI Search", "GEO", "Google"],
    body: [
      {
        paragraphs: [
          "AI Overviews appear on informational and exploratory queries more than on navigational or hard commercial ones. They cite a handful of sources. Your job is to be one of those sources, not to “rank #1 inside the overview.”",
          "Tactics that still work in 2026: passage-level clarity, FAQ and HowTo schema, visible update dates, and statistics with a named source. Tactics that do not: stuffing “according to AI” or blocking Google-Extended while hoping to rank.",
        ],
      },
    ],
  },
  {
    slug: "entity-seo-for-ai",
    title: "Entity SEO for AI: Build Machine-Readable Authority in 2026",
    description:
      "Connect your brand to Knowledge Graph-style signals: Schema.org Organization + sameAs, consistent NAP, citation graphs. Built for LOG_ON and African enterprises.",
    kind: "Deep Dive",
    section: "01 — Foundations",
    date: "2026-05-08",
    author: "Oluwamayowa Logo",
    tags: ["LLMO", "SEO", "Entity"],
    body: [
      {
        paragraphs: [
          "Models resolve “who is LOG_ON” from repeated, consistent facts: legal name, Lagos HQ, sameAs profiles, and an entity paragraph in raw HTML. If those strings drift, citations drift to a better-documented competitor.",
          "Ship Organization + Person schema, one canonical About URL, and stop letting agencies invent a second brand name. Wikipedia is optional; consistency is not.",
        ],
      },
    ],
  },
  {
    slug: "what-is-llmo",
    title: "What Is LLMO? Large Language Model Optimization (2026)",
    description:
      "LLMO makes ChatGPT, Copilot, Perplexity, Claude and Google AI Overviews cite your brand. Definition, citation features, and the August 2026 landscape.",
    kind: "Definition",
    section: "02 — Definitions",
    date: "2026-04-20",
    author: "Favour Alfred",
    tags: ["LLMO", "AI Search"],
    body: [
      {
        paragraphs: [
          "LLMO is the practice of making large language models retrieve, trust, and attribute your organisation. It is not a Google product. It is a content, schema, and crawl discipline.",
          "Twelve features we score: entity string, sameAs, llms.txt, robots allowlist, FAQ/HowTo, statistics with sources, author credentials, dateModified, internal hub, inbound citations, Bing index, and prompt-audit coverage.",
        ],
      },
    ],
  },
  {
    slug: "what-is-geo",
    title: "What Is GEO? Generative Engine Optimization Explained",
    description:
      "GEO is Generative Engine Optimization: earning citations inside AI-generated answers. How it differs from SEO, and how LOG_ON applies it in Nigeria.",
    kind: "Definition",
    section: "02 — Definitions",
    date: "2026-05-04",
    author: "Oluwamayowa Logo",
    tags: ["GEO", "AI Search"],
    body: [
      {
        paragraphs: [
          "GEO is the research term popularised after Aggarwal et al. (2024): optimise pages so generative engines quote them. Applications include product explainers, industry definitions, and comparison tables African buyers ask in chat.",
          "If SEO asks “will this URL rank?”, GEO asks “will this paragraph be the extracted answer?” Write the answer in the first two sentences, then prove it.",
        ],
      },
    ],
  },
  {
    slug: "how-to-get-cited-by-chatgpt",
    title: "How to Get Cited by ChatGPT: 12-Step Playbook for 2026",
    description:
      "Twelve signals for ChatGPT Search: Bing index, entity clarity, schema, publisher-grade sourcing, and the 2026 search-v2 changes.",
    kind: "How-To",
    section: "03 — Tactics",
    date: "2026-04-22",
    author: "Oluwamayowa Logo",
    tags: ["LLMO", "ChatGPT", "AI Search"],
    body: [
      {
        paragraphs: [
          "ChatGPT Search still leans on a live index. If Bing cannot see the page, ChatGPT often cannot cite it. Start with Bing Webmaster Tools, then OAI-SearchBot in robots.txt.",
          "The other eleven steps: consistent entity, Organization schema, llms.txt, citation-rich intros, unique stats, author pages, HTTPS, no interstitial walls, FAQ markup, quarterly recrawl, and a prompt audit spreadsheet your CMO can read.",
        ],
      },
    ],
  },
  {
    slug: "how-to-get-cited-by-perplexity-ai",
    title: "How to Get Cited by Perplexity AI: Complete 2026 Playbook",
    description:
      "Nine-step Perplexity playbook: entity clarity, schema, llms.txt, citation-rich writing, and PerplexityBot — for African B2B sites.",
    kind: "How-To",
    section: "03 — Tactics",
    date: "2026-05-10",
    author: "Favour Alfred",
    tags: ["LLMO", "Perplexity", "AI Search"],
    body: [
      {
        paragraphs: [
          "Perplexity shows sources by default. That is an opportunity: a tight, sourced paragraph beats a 3,000-word essay with no numbers.",
          "Allow PerplexityBot, publish llms.txt, put the claim and the source in the same paragraph, and keep category hubs one click from the homepage. Then run ten buyer prompts monthly and log which URL appears.",
        ],
      },
    ],
  },
  {
    slug: "best-llmo-tools-2026",
    title: "Best LLMO Tools 2026: 10 Platforms for AI Visibility Tracking",
    description:
      "Ten LLMO tracking platforms for 2026 — what they measure, where they fail on African domains, and what LOG_ON actually uses in delivery.",
    kind: "Ranked List",
    section: "03 — Tactics",
    date: "2026-05-12",
    author: "Oluwamayowa Logo",
    tags: ["LLMO", "Tools", "AI Search"],
    body: [
      {
        paragraphs: [
          "The category matured fast: Profound, Peec, Otterly, Adobe LLM Optimizer, Ziptie, AthenaHQ, LLMrefs, plus search consoles and raw logs. None of them replace a human prompt audit for Nigerian English and Pidgin queries.",
          "Pick a tracker for citation diffs. Keep GA4 referrer filters and server logs for GPTBot/ClaudeBot. Do not buy three overlapping SaaS seats in year one.",
        ],
      },
    ],
  },
  {
    slug: "llmo-content-strategy",
    title: "LLMO Content Strategy: What AI Models Actually Cite",
    description:
      "Content tactics from GEO research: citations, statistics, and quotations that lift source visibility — applied to LOG_ON industry pages.",
    kind: "Deep Dive",
    section: "03 — Tactics",
    date: "2026-05-14",
    author: "Favour Alfred",
    tags: ["LLMO", "Content Strategy"],
    body: [
      {
        paragraphs: [
          "Models prefer pages that look like sources: named studies, dates, and quotable sentences. Aggarwal et al. reported lifts up to about 40% for citation-heavy rewrites. That is a writing standard, not a plugin.",
          "For African operators, add local proof (naira outcomes, WhatsApp channels, NDPR) so the model does not default to a US blog when the buyer is in Ikeja.",
        ],
      },
    ],
  },
  {
    slug: "how-to-get-cited-by-claude",
    title: "How to Get Cited by Claude & Anthropic: 2026 Guide",
    description:
      "Nine steps for Claude citations: entity clarity, schema, llms.txt for ClaudeBot, and the citation patterns Anthropic systems tend to prefer.",
    kind: "How-To",
    section: "03 — Tactics",
    date: "2026-05-16",
    author: "Oluwamayowa Logo",
    tags: ["LLMO", "Claude", "AI Search"],
    body: [
      {
        paragraphs: [
          "ClaudeBot and Claude’s research modes reward clean, well-structured documents over keyword density. Allow the crawler, publish llms.txt, and keep legal/privacy pages honest — Anthropic-class models are sensitive to junk.",
          "Write like a briefing: claim, mechanism, limit. That pattern is closer to how Claude answers, so your paragraph is easier to lift intact.",
        ],
      },
    ],
  },
  {
    slug: "geo-strategy-ai-overviews",
    title: "GEO Strategy: How to Optimize for Google AI Overviews (2026)",
    description:
      "GEO for AI Overviews: citations, statistics, E-E-A-T, schema, llms.txt, and a quarterly LLMO cycle used by LOG_ON.",
    kind: "How-To",
    section: "03 — Tactics",
    date: "2026-05-18",
    author: "Favour Alfred",
    tags: ["GEO", "Google", "AI Search"],
    body: [
      {
        paragraphs: [
          "Treat Overviews as a citation contest on informational queries. Pair E-E-A-T (named author, Lagos practice, dates) with extractable stats. Then run a 90-day refresh so dateModified is not theatre.",
        ],
      },
    ],
  },
  {
    slug: "geo-audit-checklist",
    title: "GEO Audit Checklist: Is Your Site AI-Search Ready? (12 Categories)",
    description:
      "Twelve-category audit: schema, entity, llms.txt, robots, citations, freshness, FAQ, brand monitoring — the LOG_ON field checklist.",
    kind: "How-To",
    section: "03 — Tactics",
    date: "2026-05-20",
    author: "Oluwamayowa Logo",
    tags: ["GEO", "LLMO", "Audit"],
    body: [
      {
        paragraphs: [
          "The twelve: robots/AI bots, Bing + Google index, HTTPS, entity/NAP, Organization schema, Article/FAQ/HowTo, llms.txt, visible dates, citation density, internal hub, log presence of GPTBot/ClaudeBot, prompt-audit sheet.",
          "Score each 0–2. Anything under 16/24 is not ready for a “we do LLMO” claim in an RFP.",
        ],
      },
    ],
  },
  {
    slug: "bing-copilot-optimization",
    title: "Bing Copilot Optimization: Get Cited in Microsoft AI (2026)",
    description:
      "Eight steps for Bing Copilot and Microsoft 365 citation: Webmaster Tools, schema, llms.txt, and Edge-adjacent discovery.",
    kind: "How-To",
    section: "03 — Tactics",
    date: "2026-05-22",
    author: "Favour Alfred",
    tags: ["LLMO", "Microsoft", "AI Search"],
    body: [
      {
        paragraphs: [
          "Enterprise buyers in Africa still live in Microsoft 365. Copilot answers often flow from Bing’s index plus Graph. If you ignore Bing, you ignore a large share of workplace AI answers.",
          "Verify the site in Bing Webmaster Tools, submit sitemaps, keep schema valid, and write pages that a Copilot citation card can title in one line.",
        ],
      },
    ],
  },
  {
    slug: "llmo-for-b2b-enterprise",
    title: "LLMO for B2B Enterprise: 4-Phase Playbook for 2026",
    description:
      "Buying-committee research patterns, enterprise schema, Tier-1 citations, and LOG_ON’s four-phase LLMO methodology.",
    kind: "Deep Dive",
    section: "03 — Tactics",
    date: "2026-05-24",
    author: "Oluwamayowa Logo",
    tags: ["LLMO", "B2B", "Enterprise"],
    body: [
      {
        paragraphs: [
          "B2B answers must satisfy a committee: CIO, risk, finance, operator. One fluffy blog will not be cited for “best automation partner Nigeria.” You need a hub, a comparison, a method page, and a proof page.",
          "Phases: discover prompts → fix crawl/entity → publish citation assets → measure. Median LOG_ON cycle is one quarter per phase-one site, not a year-long content factory.",
        ],
      },
    ],
  },
  {
    slug: "llmo-case-studies",
    title: "LLMO Case Studies: Real LOG_ON Client Outcomes (2026)",
    description:
      "LOG_ON delivery records used as LLMO proof: commerce AOV, support deflection, finance cycle time — how we turn outcomes into citable pages.",
    kind: "Data & Research",
    section: "03 — Tactics",
    date: "2026-05-26",
    author: "Favour Alfred",
    tags: ["LLMO", "Case Study"],
    body: [
      {
        paragraphs: [
          "Do not invent Nordic revenue figures. Cite what we can stand behind: e-commerce recommendation work (+15% AOV), loan-processing automation (−60% approval time), support RAG (−30% tickets). Each number needs a named engagement type and year range.",
          "The LLMO lesson: publish the outcome on a stable URL with date and method. Models quote pages that look like case notes, not slogan carousels.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-engine-market-share-2026",
    title: "AI Search Engine Market Share 2026: ChatGPT, Perplexity, Google & Microsoft",
    description:
      "The five major AI search surfaces in 2026 — verified launch context, how we measure share, no invented MAU figures.",
    kind: "Data & Research",
    section: "04 — Data & trends",
    date: "2026-05-07",
    author: "Oluwamayowa Logo",
    tags: ["AI Search", "Statistics"],
    body: [
      {
        paragraphs: [
          "Treat “share” as share of buyer prompts in your category, not a global pie you cannot audit. The five surfaces that matter for LOG_ON clients: ChatGPT Search, Perplexity, Google AI Overviews, Microsoft Copilot, Claude research.",
          "We do not publish unverified February 2026 MAU claims. We do log which engine cited you in a 25-prompt monthly panel.",
        ],
      },
    ],
  },
  {
    slug: "zero-click-search-ai-era",
    title: "Zero-Click Search in the AI Era: What Marketers Need to Know",
    description:
      "Zero-click was already high on Google; AI Overviews and chat search compounded it. The strategic response for African brands.",
    kind: "Deep Dive",
    section: "04 — Data & trends",
    date: "2026-05-09",
    author: "Favour Alfred",
    tags: ["AI Search", "SEO"],
    body: [
      {
        paragraphs: [
          "SparkToro’s 2024 work put zero-click near 60% of US Google searches. AI answers raise the share of queries that never hit your analytics. Winning is brand mention + citation + branded search lift, not last-click sessions.",
          "Build destination pages worth a click (tools, calculators, scoped assessments) and accept that definitional queries will stay zero-click. Optimise those for citation, not for a bounce-rate tantrum.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-roi",
    title: "AI Search ROI: Is Optimizing for ChatGPT & Perplexity Worth It?",
    description:
      "Addressable demand, citation lift, and brand-search compounding — how LOG_ON frames AI-search ROI for CFOs.",
    kind: "Data & Research",
    section: "04 — Data & trends",
    date: "2026-05-11",
    author: "Oluwamayowa Logo",
    tags: ["AI Search", "ROI"],
    body: [
      {
        paragraphs: [
          "ROI is (pipeline influenced by cited answers − LLMO cost) / LLMO cost. Cost is content labour, schema, and a tracker — not a mystery media buy.",
          "If your buyers already ask chat engines who to hire in Lagos, the addressable demand is real. If they only search branded terms, spend less on GEO and more on product.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-market-2026-statistics",
    title: "AI Search Market Statistics 2026: Size, Growth & Platform Timeline",
    description:
      "Market context for LLM tools and LLMOps with a platform timeline. We label estimates as estimates.",
    kind: "Data & Research",
    section: "04 — Data & trends",
    date: "2026-05-13",
    author: "Favour Alfred",
    tags: ["AI Search", "Statistics"],
    body: [
      {
        paragraphs: [
          "Analyst ranges for LLM software and LLMOps vary widely. Use them as direction (fast growth, fragmented tools), not as a budget line. Pair any TAM slide with your own prompt-panel data.",
          "Timeline that matters operationally: SGE/Overviews 2024, ChatGPT Search expansion, Copilot in M365, Perplexity as a default research tab for analysts. Plan content for those four, not for every startup wrapper.",
        ],
      },
    ],
  },
  {
    slug: "ai-overview-trigger-rate",
    title: "AI Overview Trigger Rate: Which Queries Show AI Answers?",
    description:
      "Overviews trigger more on informational and exploratory queries. How to measure and what to do in an African content set.",
    kind: "Data & Research",
    section: "04 — Data & trends",
    date: "2026-05-15",
    author: "Oluwamayowa Logo",
    tags: ["GEO", "Google"],
    body: [
      {
        paragraphs: [
          "Informational “what is” and “how does” queries trigger Overviews more than “near me” or hard transactional queries. Measure with a fixed query set, not anecdotes.",
          "Put your citation-grade definitions on those informational URLs. Keep commercial pages focused on proof and next step.",
        ],
      },
    ],
  },
  {
    slug: "voice-search-ai-2026",
    title: "Voice Search + AI: The 2024–2026 Convergence",
    description:
      "ChatGPT Voice, Apple Intelligence, Alexa Plus — speakable answers need short, sourced paragraphs and schema.",
    kind: "Deep Dive",
    section: "04 — Data & trends",
    date: "2026-05-17",
    author: "Favour Alfred",
    tags: ["AI Search", "Voice"],
    body: [
      {
        paragraphs: [
          "Voice interfaces read one or two sentences aloud. If your H1 is poetry and the answer is in paragraph seven, you will not be spoken.",
          "Use Speakable-minded structure: 20–30 word answers under the heading, then detail. This helps WhatsApp voice notes from sales teams as much as it helps Siri.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-users-2026",
    title: "AI Search Users 2026: Adoption Data, Milestones & Behavior",
    description:
      "How we talk about adoption without inventing MAU: ChatGPT scale, Google’s daily search base, and African buyer behaviour we actually see.",
    kind: "Data & Research",
    section: "04 — Data & trends",
    date: "2026-05-19",
    author: "Oluwamayowa Logo",
    tags: ["AI Search", "Statistics"],
    body: [
      {
        paragraphs: [
          "Public milestones (fastest to 100M, hundreds of millions of weekly ChatGPT users, Google’s multi-billion daily searches) are enough to justify a dual strategy. Inventing a precise February 2026 MAU is how you lose a procurement fact-check.",
          "In our assessments, African mid-market buyers use ChatGPT for vendor longlists and Google for brand confirmation. Win both sentences.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-vs-google-2026",
    title: "AI Search vs Google Search: 2026 Comparison (12 Dimensions)",
    description:
      "Twelve-dimension comparison of classic Google versus ChatGPT, Perplexity, and Claude — when to optimise for which.",
    kind: "Comparison",
    section: "04 — Data & trends",
    date: "2026-05-21",
    author: "Favour Alfred",
    tags: ["AI Search", "SEO"],
    body: [
      {
        paragraphs: [
          "Google still owns navigational and many local queries. AI search owns synthesis (“compare three automation firms for a Lagos bank”). Optimise commercial hubs for both: classic SEO title plus a citable comparison table.",
        ],
      },
    ],
  },
  {
    slug: "llms-txt-guide-2026",
    title: "llms.txt Guide 2026: How to Create & Optimize for AI Crawlers",
    description:
      "Format, deployment, and validation of llms.txt — the Jeremy Howard / Answer.AI pattern, as shipped on logonai.netlify.app.",
    kind: "How-To",
    section: "05 — Technical",
    date: "2026-05-05",
    author: "Oluwamayowa Logo",
    tags: ["llms.txt", "LLMO", "Technical"],
    body: [
      {
        paragraphs: [
          "llms.txt is a markdown map at the site root. llms-full.txt can carry the longer brief. LOG_ON ships both. Keep them shorter than a novel and more specific than a slogan.",
          "Validate by fetching /llms.txt anonymously, linking the important URLs, and restating entity, pricing posture, and contact. Update when the offer changes — not once a year as theatre.",
        ],
      },
    ],
  },
  {
    slug: "schema-org-for-ai",
    title: "Schema.org for AI: Structured Data That LLMs Understand (2026)",
    description:
      "JSON-LD patterns for Article, FAQPage, HowTo, Organization, and Person that help retrieval — validated, deployable.",
    kind: "How-To",
    section: "05 — Technical",
    date: "2026-05-23",
    author: "Favour Alfred",
    tags: ["Schema", "LLMO", "Technical"],
    body: [
      {
        paragraphs: [
          "Schema does not “rank you in ChatGPT,” but it removes ambiguity. Organization + sameAs, Article with dates, FAQPage on real questions, Person for authors. Invalid JSON-LD is worse than none.",
          "Use one @id per entity. Do not mark up fake FAQs. LOG_ON’s public pages follow this stack; copy the pattern, not the brand name.",
        ],
      },
    ],
  },
  {
    slug: "citation-optimization-ai",
    title: "Citation Optimization for AI: Get Linked from AI Answers (2026)",
    description:
      "Citation is the primary LLMO lever. Tier-1 sources, inline patterns, and inbound citation tactics for African B2B.",
    kind: "How-To",
    section: "05 — Technical",
    date: "2026-05-25",
    author: "Oluwamayowa Logo",
    tags: ["LLMO", "Citations"],
    body: [
      {
        paragraphs: [
          "Cite primary sources (standards, regulators, your own dated delivery records). Earn inbound citations from industry pages that models already trust. That two-way graph is the work.",
          "Inline the source next to the number. “Studies show” with no name is discarded.",
        ],
      },
    ],
  },
  {
    slug: "ai-crawler-management",
    title: "AI Crawler Management: GPTBot, ClaudeBot, PerplexityBot & More",
    description:
      "User agents, robots.txt decisions, and when to allow or block — including OAI-SearchBot versus training crawlers.",
    kind: "Deep Dive",
    section: "05 — Technical",
    date: "2026-05-27",
    author: "Favour Alfred",
    tags: ["Technical", "Crawlers", "LLMO"],
    body: [
      {
        paragraphs: [
          "Separate training crawlers from search crawlers. Blocking GPTBot but allowing OAI-SearchBot is a real strategy if you want citations without donating the corpus. Document the choice; do not copy a random GitHub gist.",
          "LOG_ON’s robots allow major AI agents we want retrieval from. Review quarterly as user-agent lists change.",
        ],
      },
    ],
  },
  {
    slug: "faq-schema-for-ai-search",
    title: "FAQ Schema for AI Search: Complete 2026 Guide (with JSON-LD)",
    description:
      "FAQ markup still helps LLMs after Google narrowed rich results. Real questions only — with JSON-LD patterns.",
    kind: "How-To",
    section: "05 — Technical",
    date: "2026-05-28",
    author: "Oluwamayowa Logo",
    tags: ["Schema", "FAQ", "LLMO"],
    body: [
      {
        paragraphs: [
          "Google limited FAQ rich results; models did not stop reading Q&A blocks. Use questions customers actually send on WhatsApp. Answer in two sentences, then detail.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-analytics",
    title: "AI Search Analytics: Measure Your AI Visibility (2026 Guide)",
    description:
      "Five methods: prompt audits, citation tools, GA4 referrers, Search Console, and server logs.",
    kind: "How-To",
    section: "05 — Technical",
    date: "2026-05-29",
    author: "Favour Alfred",
    tags: ["Analytics", "LLMO"],
    body: [
      {
        paragraphs: [
          "If you cannot name this month’s citation count on ten buyer prompts, you are not measuring LLMO. Tools help; a spreadsheet and logs are enough to start.",
        ],
      },
    ],
  },
  {
    slug: "site-architecture-for-ai-crawlers",
    title: "Site Architecture for AI Crawlers: Hub-and-Spoke for LLMs",
    description:
      "Hub-and-spoke URLs, internal links, breadcrumbs, llms.txt, sitemap, and robots — the LOG_ON Insights pattern.",
    kind: "How-To",
    section: "05 — Technical",
    date: "2026-05-30",
    author: "Oluwamayowa Logo",
    tags: ["Technical", "IA", "LLMO"],
    body: [
      {
        paragraphs: [
          "This cluster is the spoke. /insights is the hub. /insights/ai-search is the category. Every article should link up to the category and sideways to two siblings. That is how a crawler understands the graph.",
        ],
      },
    ],
  },
  {
    slug: "content-freshness-ai-search",
    title: "Content Freshness & AI Search: Why Dates Matter (2026)",
    description:
      "datePublished, dateModified, visible Updated badges, and a 90-day review cadence by content type.",
    kind: "Deep Dive",
    section: "05 — Technical",
    date: "2026-05-31",
    author: "Favour Alfred",
    tags: ["Freshness", "LLMO"],
    body: [
      {
        paragraphs: [
          "Stale “2024 guide” titles get skipped. Visible Updated dates plus real diffs beat fake date bumps. LOG_ON’s hub promises a 90-day review; keep it.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-optimization-saas",
    title: "AI Search Optimization for SaaS Companies (2026 Playbook)",
    description:
      "Why SaaS buyers research in LLMs first — comparison content, review sites, and citation benchmarks for product companies.",
    kind: "Deep Dive",
    section: "06 — By industry",
    date: "2026-06-02",
    author: "Oluwamayowa Logo",
    tags: ["SaaS", "LLMO"],
    body: [
      {
        paragraphs: [
          "SaaS buyers ask chat engines for alternatives before they book a demo. If your comparison page is thin, the model will invent the shortlist. Publish honest competitor tables and keep pricing posture explicit.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-optimization-ecommerce",
    title: "AI Search Optimization for E-commerce: Product Schema & Reviews",
    description:
      "Product, Offer, AggregateRating JSON-LD, category LLMO, and brand signals for Nigerian and global commerce.",
    kind: "Deep Dive",
    section: "06 — By industry",
    date: "2026-06-04",
    author: "Favour Alfred",
    tags: ["E-commerce", "LLMO"],
    body: [
      {
        paragraphs: [
          "Commerce LLMO is schema plus unique category copy. Paystack/Flutterwave realities belong in the copy so models do not recommend a US-only checkout story to a Lagos shopper.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-optimization-financial-services",
    title: "AI Search Optimization for Financial Services: YMYL & EU AI Act",
    description:
      "Highest LLMO bar: credentials, regulator citations, FinancialService schema, dual NDPR / EU-facing compliance.",
    kind: "Deep Dive",
    section: "06 — By industry",
    date: "2026-06-06",
    author: "Oluwamayowa Logo",
    tags: ["Finance", "LLMO", "Compliance"],
    body: [
      {
        paragraphs: [
          "YMYL means no anonymous tips on credit or insurance. Name the author, cite CBN/SEC/NDIC or relevant regulators, and keep Annex-style risk language if you sell into the EU. Models are conservative here — sloppy pages lose.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-optimization-b2b",
    title: "AI Search Optimization for B2B: Long-Form, Comparison & Brand",
    description:
      "Long-form hubs, comparison tables, and brand entity work for committees that research in ChatGPT before they email you.",
    kind: "Deep Dive",
    section: "06 — By industry",
    date: "2026-06-08",
    author: "Favour Alfred",
    tags: ["B2B", "LLMO"],
    body: [
      {
        paragraphs: [
          "B2B LLMO is a hub, a method, a comparison, and a case. Four URLs beat forty thin posts. LOG_ON’s Insights architecture is that pattern.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-optimization-legal",
    title: "AI Search Optimization for Legal & Professional Services 2026",
    description:
      "YMYL for legal: credentials, LegalService schema, statute citation hierarchy, care with legal-AI claims.",
    kind: "Deep Dive",
    section: "06 — By industry",
    date: "2026-06-10",
    author: "Oluwamayowa Logo",
    tags: ["Legal", "LLMO"],
    body: [
      {
        paragraphs: [
          "Do not let a model invent case law from your blog. Cite statutes, name counsel, and mark opinion as opinion. Professional-services LLMO is trust first.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-optimization-healthcare",
    title: "AI Search Optimization for Healthcare: YMYL & Medical Schema",
    description:
      "Medical credentials, conservative claims, Medical* schema, WHO/NIH-class sources — and NDPR/health-data care in Nigeria.",
    kind: "Deep Dive",
    section: "06 — By industry",
    date: "2026-06-12",
    author: "Favour Alfred",
    tags: ["Healthcare", "LLMO"],
    body: [
      {
        paragraphs: [
          "Health pages that skip credentials will not be cited by careful models and should not be. Pair schema with a clinician reviewer. LOG_ON’s healthcare delivery stories stay operational (scheduling, coding), not diagnostic advice.",
        ],
      },
    ],
  },
  {
    slug: "ai-search-optimization-agencies",
    title: "AI Search Optimization for Agencies & Consultancies (2026)",
    description:
      "Methodology pages, Person schema, named outcomes. This Insights hub is the worked example for LOG_ON.",
    kind: "Deep Dive",
    section: "06 — By industry",
    date: "2026-06-14",
    author: "Oluwamayowa Logo",
    tags: ["Consulting", "LLMO"],
    body: [
      {
        paragraphs: [
          "Agencies get cited when their method has a URL. Publish the playbook, the constraints, and the proof. That is how a model answers “automation consultancy Lagos” with a name instead of a generic list.",
        ],
      },
    ],
  },
  {
    slug: "ai-crawlability-consulting",
    title: "AI Crawlability Consulting: Get Discovered by ChatGPT & Copilot",
    description:
      "What stops ChatGPT, Copilot, and Perplexity from citing you: search-bot access, Bing index, entity graph, and schema — the LOG_ON service view.",
    kind: "Deep Dive",
    section: "07 — Services",
    date: "2026-08-12",
    author: "Oluwamayowa Logo",
    tags: ["Consulting", "LLMO", "Technical"],
    body: [
      {
        paragraphs: [
          "Most “we are invisible to ChatGPT” tickets are crawl and entity bugs, not missing blog posts. We fix robots, Bing, schema, and the entity paragraph first. Content comes second.",
          "Book the efficiency assessment if you want this done on your domain. This article is the brief; the work is in logs and JSON-LD.",
        ],
      },
    ],
  },
];

export function llmoToInsights() {
  return llmoArticles.map((a, i) => ({
    title: a.title,
    slug: a.slug,
    description: a.description,
    image: img.src,
    width: img.width,
    height: img.height,
    dataAiHint: img.dataAiHint,
    tags: a.tags,
    author: a.author,
    date: a.date,
    codeVisualType: "default" as const,
  }));
}

export const llmoSections = [
  "00 — Start here",
  "01 — Foundations",
  "02 — Definitions",
  "03 — Tactics",
  "04 — Data & trends",
  "05 — Technical",
  "06 — By industry",
  "07 — Services",
];
