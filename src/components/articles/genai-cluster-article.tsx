"use client";

import { genaiArticles } from "@/lib/data/genai-articles";
import { buildStructuredInsight } from "@/lib/build-structured-insight";
import { InsightArticleLayout } from "@/components/articles/insight-article-layout";

export default function GenaiClusterArticle({ slug }: { slug: string }) {
  const article = genaiArticles.find((item) => item.slug === slug);
  if (!article) return <p>This Generative AI article could not be loaded.</p>;
  const doc = buildStructuredInsight(article, {
    label: "Generative AI",
    href: "/insights/generative-ai",
    siblings: genaiArticles.map((a) => ({ title: a.title, slug: a.slug })),
  });
  return <InsightArticleLayout doc={doc} />;
}
