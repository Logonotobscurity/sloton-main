"use client";

import type { ReactNode } from "react";
import { insights, type Insight } from "@/lib/data/insights";
import { buildStructuredInsight } from "@/lib/build-structured-insight";
import { InsightArticleLayout } from "@/components/articles/insight-article-layout";
import { LEGACY_BRIEFS } from "@/lib/data/legacy-article-briefs";
import { RelatedInsights } from "@/components/related-insights";

const CLUSTER = {
  search: { label: "AI Search & LLMO", href: "/insights/ai-search" },
  agents: { label: "AI Agents", href: "/insights/ai-agents" },
  functions: { label: "AI for Business Functions", href: "/insights/ai-functions" },
  library: { label: "LOG_ON Insights", href: "/insights" },
} as const;

export function CatalogInsightArticle({
  insight,
  children,
}: {
  insight: Insight;
  children?: ReactNode;
}) {
  const brief = LEGACY_BRIEFS[insight.slug];
  const clusterKey =
    brief?.cluster ||
    (insight.tags.some((t) => /search|seo|geo|llmo/i.test(t))
      ? "search"
      : insight.tags.some((t) => /agent/i.test(t))
        ? "agents"
        : "library");
  const cluster = CLUSTER[clusterKey];

  const siblings = insights
    .filter((i) => i.slug !== insight.slug)
    .slice(0, 8)
    .map((i) => ({ title: i.title, slug: i.slug }));

  const doc = buildStructuredInsight(
    {
      slug: insight.slug,
      title: insight.title,
      description: insight.description,
      kind: brief?.kind || insight.tags[0] || "Deep Dive",
      section: cluster.label,
      date: insight.date,
      body: [{ paragraphs: [insight.description, ...(brief?.keyPoints || [])] }],
    },
    { label: cluster.label, href: cluster.href, siblings }
  );

  if (brief?.keyPoints?.length) doc.keyPoints = brief.keyPoints;
  if (brief?.contexts) doc.contexts = brief.contexts;
  if (brief?.faqs?.length) doc.faqs = [...brief.faqs, ...doc.faqs];

  return (
    <>
      <InsightArticleLayout doc={doc}>{children}</InsightArticleLayout>
      <div className="max-w-3xl">
        <RelatedInsights current={insight} />
      </div>
    </>
  );
}
