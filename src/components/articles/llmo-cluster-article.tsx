"use client";

import { llmoArticles } from "@/lib/data/llmo-articles";
import { buildStructuredInsight } from "@/lib/build-structured-insight";
import { InsightArticleLayout } from "@/components/articles/insight-article-layout";

export default function LlmoClusterArticle({ slug }: { slug: string }) {
  const article = llmoArticles.find((item) => item.slug === slug);
  if (!article) return <p>This AI Search &amp; LLMO article could not be loaded.</p>;
  const doc = buildStructuredInsight(article, {
    label: "AI Search & LLMO",
    href: "/insights/ai-search",
    siblings: llmoArticles.map((a) => ({ title: a.title, slug: a.slug })),
  });
  return <InsightArticleLayout doc={doc} />;
}
