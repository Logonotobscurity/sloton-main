"use client";

import Link from "next/link";

export type WrittenBlock = { heading?: string; paragraphs: string[] };

export function WrittenArticleShell({
  clusterHref,
  clusterLabel,
  section,
  title,
  description,
  kind,
  extra,
}: {
  clusterHref: string;
  clusterLabel: string;
  section?: string;
  title: string;
  description: string;
  kind?: string;
  extra?: WrittenBlock[];
}) {
  const blocks: WrittenBlock[] = [
    {
      paragraphs: [
        description,
        `${title} is written for Nigerian, African, and global operators who need production guidance in 2026 — not a vendor slogan. LOG_ON is a Lagos consultancy: we implement scoped agents, automation, and AI-search work after a free efficiency assessment.`,
      ],
    },
    {
      heading: "Why this matters in 2026",
      paragraphs: [
        "Boards now ask for citations, audit trails, and a named owner. EU-style risk language shows up in exporter RFPs even when the work is delivered from Lagos. Agentic systems and AI search are mainstream; the failure mode is a pilot with no metric.",
        "Treat this page as an operating note. If a number appears, it is either a LOG_ON delivery record (2024–2026) or labelled research. We do not invent Nordic case figures or Swedish agency rankings.",
      ],
    },
    {
      heading: kind ? `How to use this ${kind.toLowerCase()}` : "How to use this guide",
      paragraphs: [
        "Read the definition, then the implementation steps, then decide whether this is a one-week hygiene fix or a scoped build. Share the URL with your CIO, counsel, and the operator who will live with the system.",
        "Do the smallest useful version first: one prompt panel, one agent tool, one schema block. Expand only when that slice has an owner and a kill switch.",
      ],
    },
    {
      heading: "Implementation checklist",
      paragraphs: [
        "Name the buyer prompt or the SOP this page is about. Name the system of record (CRM, ledger, WhatsApp, warehouse). Name the human who can stop the system. If you cannot name those three, you are not ready to implement — you are still in slides.",
        "Ship crawl and entity hygiene (robots, Bing, Organization schema, llms.txt) before you buy another content package. For agents, ship read-only tools and traces before write access. For both, put a visible Updated date on the public URL and review it inside 90 days.",
        "Measure one number the CFO already understands: cycle time, cost-to-serve, citation count on a fixed prompt panel, or hours returned. LOG_ON will not sign a statement of work that only promises “transformation.”",
      ],
    },
    {
      heading: "Common failure modes",
      paragraphs: [
        "Copying a US or Nordic listicle into an African RFP. Blocking every AI crawler and then asking why ChatGPT cannot cite you. Giving an agent production credentials on day one. Publishing FAQ schema for questions nobody asks. Dating a page “2026” without changing a sentence.",
        "If this article is a comparison, treat scores as a starting shortlist. Call references. If it is a how-to, do the steps on a staging host. If it is a definition, put the definition in the first two sentences of your own page so models can lift it.",
      ],
    },
    ...(extra ?? []),
    {
      heading: "What LOG_ON will actually do",
      paragraphs: [
        "Assessment, written scope, a thin vertical slice, then production with a runbook. Chatbots typically 2–4 weeks; automation 4–8 weeks; broader programmes 3–6 months. Pricing is scoped — this site is not a rate card.",
        "If you need this applied on your domain or stack, use the contact path. The demo assistant on the site is not a statement of work.",
      ],
    },
  ];

  return (
    <div>
      <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
        <Link href={clusterHref} className="hover:underline">
          {clusterLabel}
        </Link>
        {section ? <span className="text-muted-foreground font-normal"> · {section}</span> : null}
      </p>
      {blocks.map((block, index) => (
        <section key={index} className="mb-8">
          {block.heading ? <h2 className="text-2xl font-bold mt-10 mb-4">{block.heading}</h2> : null}
          {block.paragraphs.map((p) => (
            <p key={p.slice(0, 64)} className="mb-4 leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      ))}
      <p className="mt-10 text-sm text-muted-foreground">
        Reviewed on a 90-day cycle. Operator-authored by LOG_ON (Lagos).{" "}
        <Link href="/contact" className="text-primary underline">
          Book an assessment
        </Link>
        .
      </p>
    </div>
  );
}
