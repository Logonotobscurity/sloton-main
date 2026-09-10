"use client";

import { agentArticles } from "@/lib/data/agent-articles";
import { buildStructuredInsight } from "@/lib/build-structured-insight";
import { InsightArticleLayout } from "@/components/articles/insight-article-layout";
import { whatIsAnAiAgent } from "@/lib/data/what-is-an-ai-agent";

export default function AgentClusterArticle({ slug }: { slug: string }) {
  if (slug === "what-is-an-ai-agent") {
    return <InsightArticleLayout doc={whatIsAnAiAgent} />;
  }
  const article = agentArticles.find((item) => item.slug === slug);
  if (!article) return <p>This AI Agents article could not be loaded.</p>;
  const doc = buildStructuredInsight(article, {
    label: "AI Agents",
    href: "/insights/ai-agents",
    siblings: agentArticles.map((a) => ({ title: a.title, slug: a.slug })),
  });
  return <InsightArticleLayout doc={doc} />;
}
