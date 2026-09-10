import imageData from "@/lib/placeholder-images.json";

export type GenBlock = { heading?: string; paragraphs: string[] };

export type GenaiArticle = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  section: string;
  date: string;
  author: string;
  tags: string[];
  body: GenBlock[];
};

const A = "Oluwamayowa Logo";

function art(
  slug: string,
  title: string,
  description: string,
  kind: string,
  section: string,
  date: string,
  extra: string[] = []
): GenaiArticle {
  return {
    slug,
    title,
    description,
    kind,
    section,
    date,
    author: A,
    tags: ["Generative AI", kind],
    body: [
      {
        paragraphs: [
          description,
          extra[0] ||
            "Written for Nigerian, African, and global operators. LOG_ON implements scoped GenAI after a free efficiency assessment — not a seat licence.",
          extra[1] ||
            "Oluwamayowa Logo is the lead author. Favour Alfred reviews. 90-day review cycle. No invented Nordic adoption figures.",
        ],
      },
    ],
  };
}

export const genaiArticles: GenaiArticle[] = [
  art("generative-ai-for-enterprise", "Generative AI for Enterprise: Strategy, Use Cases & Implementation", "How enterprises should pick, govern, and ship GenAI — workflow first, unbounded generation last.", "Deep Dive", "01 — Enterprise", "2026-05-04", ["Do not treat a $13.8B headline as your budget. Scope a SOP."]),
  art("generative-ai-use-cases-2026", "Generative AI Use Cases 2026: Proven Enterprise Applications", "Use cases LOG_ON actually ships or recommends: support drafts, document extract, sales assist, internal RAG. Not a fake list of 50 with invented ROI.", "Data & Research", "01 — Enterprise", "2026-05-05", []),
  art("generative-ai-strategy-guide", "Generative AI Strategy: How to Build a Roadmap That Delivers", "Use-case selection, data rights, evals, HITL, scale. Companion to the AI investment playbook.", "How-To", "01 — Enterprise", "2026-05-06", []),
  art("generative-ai-explained-simply", "Generative AI Explained: A Plain-Language Guide for Leaders", "What it is, what it is not, and why a Lagos MD should care. No TAM theatre.", "Deep Dive", "02 — Foundations", "2026-05-07", []),
  art("what-is-generative-ai", "What Is Generative AI? Definition, Examples & 2026 Guide", "Definition, how it works, ChatGPT/Claude/Gemini-class examples, and enterprise use from LOG_ON deliveries.", "Definition", "02 — Foundations", "2026-05-08", ["Editor’s pick for this cluster."]),
  art("generative-ai-vs-traditional-ai", "Generative AI vs Traditional AI: Key Differences for Enterprises", "Eight differences: data, output, control, cost, risk, eval, talent, when to keep classical ML.", "Comparison", "02 — Foundations", "2026-05-09", []),
  art("generative-ai-risks-enterprise", "Generative AI Risks for Enterprises: What to Mitigate in 2026", "Leakage, hallucination, agent sprawl, IP, deepfakes, shadow AI, vendor lock-in. Controls LOG_ON puts in SOWs.", "Deep Dive", "03 — Risks", "2026-05-10", []),
  art("llm-hallucination-enterprise", "LLM Hallucination: What It Is & How to Prevent It in Production", "Causes, measurement, RAG, citations, human gates. Six mitigations we actually run.", "Deep Dive", "03 — Risks", "2026-05-11", []),
  art("deepfakes-enterprise-risk", "Deepfakes in the Enterprise: Risks, Detection & Mitigation 2026", "Voice and video fraud against finance and execs. Detection, out-of-band confirm, staff drills. No invented 62% stat as law.", "Deep Dive", "03 — Risks", "2026-05-12", []),
  art("multimodal-ai-explained", "Multimodal AI: What It Is & How Enterprises Are Using It in 2026", "Text + image + audio + video. Invoice vision, WhatsApp media, field photos. Strategy checklist.", "Deep Dive", "04 — Technology", "2026-05-13", []),
  art("large-language-models-explained", "Large Language Models Explained: How LLMs Work for Business Leaders", "Tokens, context, tools, cost. How a CFO should evaluate a model choice.", "Deep Dive", "04 — Technology", "2026-05-14", []),
  art("foundation-models-guide", "Foundation Models 2026: The Complete Enterprise Guide", "How to think about GPT-, Claude-, Gemini-, and Llama-class models: economics, residency, eval. Pin versions; ignore hype names.", "Deep Dive", "04 — Technology", "2026-05-15", []),
  art("generative-ai-platforms-compared", "Generative AI Platforms Compared: OpenAI vs Claude vs Gemini 2026", "Performance, pricing, safety, enterprise fit for African operators. Data-driven enough to shortlist, not to crown a forever winner.", "Comparison", "05 — Tools", "2026-05-16", []),
  art("best-generative-ai-tools-2026", "Best Generative AI Tools 2026: Enterprise-Grade Platforms Compared", "Assistants, image, code, and workspace tools. Security and ROI over feature lists.", "Ranked List", "05 — Tools", "2026-05-17", []),
  art("open-source-llms-guide-2026", "Best Open Source LLMs 2026: Enterprise-Ready Model Guide", "Llama-, Qwen-, DeepSeek-, Mistral-, Gemma-class options: license, self-host, cost, EU AI Act / NDPR fit.", "Ranked List", "05 — Tools", "2026-05-18", []),
  art(
    "best-generative-ai-consultants-nigeria-africa-2026",
    "Best Generative AI Consultants in Nigeria & Africa 2026 | LOG_ON",
    "Implementation partners scored for African delivery, NDPR, and production refs — not a Sweden SI listicle.",
    "Ranked List",
    "06 — Consultants",
    "2026-07-08",
    ["LOG_ON is a scoped consultancy. Call references."]
  ),
  art(
    "what-is-generative-ai-nigeria-2026",
    "What Is Generative AI? Guide for Nigerian Enterprises 2026 | LOG_ON",
    "Definition, models, EU-style risk, cost, and African adoption — remapped from a Sweden-only guide. Editor-adjacent explainer.",
    "Deep Dive",
    "07 — Informational",
    "2026-08-10",
    ["Start here if you need one page for a Lagos board."]
  ),
  art(
    "what-is-an-llm-enterprise-guide-2026",
    "What Is an LLM? Enterprise Guide 2026 | LOG_ON",
    "Large language models in plain language: technique, cost, RAG, NDPR/GDPR. Companion to the GenAI definition.",
    "Deep Dive",
    "07 — Informational",
    "2026-08-11",
    []
  ),
];

export const genaiSections = [
  "01 — Enterprise",
  "02 — Foundations",
  "03 — Risks",
  "04 — Technology",
  "05 — Tools",
  "06 — Consultants",
  "07 — Informational",
];

const img = imageData.glowingAiBrain;

export function genaiToInsights() {
  return genaiArticles.map((a) => ({
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
