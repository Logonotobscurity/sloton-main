"use client";

import { functionsArticles } from "@/lib/data/functions-articles";
import { buildStructuredInsight } from "@/lib/build-structured-insight";
import { InsightArticleLayout } from "@/components/articles/insight-article-layout";

export default function FunctionsClusterArticle({ slug }: { slug: string }) {
  const article = functionsArticles.find((item) => item.slug === slug);
  if (!article) return <p>This AI for Business Functions article could not be loaded.</p>;
  const doc = buildStructuredInsight(article, {
    label: "AI for Business Functions",
    href: "/insights/ai-functions",
    siblings: functionsArticles.map((a) => ({ title: a.title, slug: a.slug })),
  });
  return <InsightArticleLayout doc={doc} />;
}
