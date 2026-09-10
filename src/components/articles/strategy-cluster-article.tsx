"use client";

import { strategyArticles } from "@/lib/data/strategy-articles";
import { buildStructuredInsight } from "@/lib/build-structured-insight";
import { InsightArticleLayout } from "@/components/articles/insight-article-layout";

export default function StrategyClusterArticle({ slug }: { slug: string }) {
  const article = strategyArticles.find((item) => item.slug === slug);
  if (!article) return <p>This AI Strategy article could not be loaded.</p>;
  const doc = buildStructuredInsight(article, {
    label: "AI Strategy",
    href: "/insights/ai-strategy",
    siblings: strategyArticles.map((a) => ({ title: a.title, slug: a.slug })),
  });
  return <InsightArticleLayout doc={doc} />;
}
