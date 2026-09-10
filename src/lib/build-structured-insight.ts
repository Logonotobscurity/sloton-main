import type { StructuredInsight, ArticleSection } from "@/components/articles/insight-article-layout";

type Loose = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  section: string;
  date: string;
  body?: { heading?: string; paragraphs: string[] }[];
};

export function buildStructuredInsight(
  item: Loose,
  cluster: { label: string; href: string; siblings: { title: string; slug: string }[] }
): StructuredInsight {
  const extras = (item.body ?? []).flatMap((b) => b.paragraphs);
  const sections: ArticleSection[] = [
    {
      id: "definition",
      title: "Definition and why it matters",
      inShort: item.description,
      paragraphs: [
        extras[0] || item.description,
        `${item.title} is part of the LOG_ON ${cluster.label} cluster. It is written for Nigerian, African, and global operators who need a production decision in 2026 — not a slogan.`,
      ],
    },
    {
      id: "practice",
      title: "How LOG_ON applies this",
      inShort: "Scoped implementation after a free efficiency assessment. Workflow first; full agents only when the path is unpredictable.",
      paragraphs: [
        extras[1] ||
          "LOG_ON ships the thinnest system that completes the SOP: a workflow if the steps are known, an agent if the model must choose tools. Chatbots 2–4 weeks; automation 4–8 weeks; broader programmes 3–6 months.",
        "Oluwamayowa Logo is the lead author and technical authority. Favour Alfred reviews for operator fit. We do not invent Nordic case numbers or Swedish agency lists.",
      ],
      bullets: [
        "Name the SOP, the system of record, and the human who can stop the system.",
        "Read-only tools and traces before write access.",
        "One metric a CFO already understands.",
      ],
    },
    {
      id: "when",
      title: "When to use this — and when not to",
      inShort: "Use it when the path is unpredictable or citation/tool-use is required. Skip it when deterministic code or a fixed workflow is enough.",
      paragraphs: [
        extras[2] ||
          "Anthropic’s December 2024 guidance still holds: most production systems should be workflows, not unbounded agents. The same is true for AI-search work — fix crawl and entity before you buy another content farm.",
      ],
    },
  ];

  const next = cluster.siblings.find((s) => s.slug !== item.slug);

  return {
    clusterLabel: cluster.label,
    clusterHref: cluster.href,
    kind: item.kind,
    title: item.title,
    shortTitle: item.title.split(":")[0],
    definition: item.description,
    category: "Artificial Intelligence",
    published: item.date,
    updated: item.date,
    readingTime: "7 min read",
    tldr: item.description,
    keyPoints: [
      item.description,
      extras[0] || "Four parts on every serious system: model, tools, memory, control loop.",
      "Workflow first. Agent only when the path cannot be written as fixed steps.",
      "LOG_ON measures hours, errors, citations, or cost-to-serve — not “transformation.”",
      "Oluwamayowa Logo authors; Favour Alfred reviews; 90-day refresh.",
    ],
    sections,
    faqs: [
      {
        q: `What is ${item.title.split("?")[0].replace("What Is ", "").replace("What is ", "")} in simple terms?`,
        a: item.description,
      },
      {
        q: "Who wrote this?",
        a: "Oluwamayowa Logo, Lead Developer & Automation Solution Architect at LOG_ON (Lagos). Reviewed by Favour Alfred.",
      },
      {
        q: "How do we start?",
        a: "Book a free efficiency assessment via /contact. Engagements start only after a written scope.",
      },
    ],
    sources: [
      { title: "Anthropic — Building effective agents (Dec 2024)", href: "https://www.anthropic.com/research/building-effective-agents" },
      { title: "OpenAI — Function calling", href: "https://platform.openai.com/docs/guides/function-calling" },
      { title: "LOG_ON Insights Hub", href: "/insights" },
    ],
    next: next ? { title: next.title, href: `/insights/${next.slug}` } : undefined,
    relatedTerms: cluster.siblings.slice(0, 5).map((s) => ({ label: s.title.split(":")[0], href: `/insights/${s.slug}` })),
  };
}
