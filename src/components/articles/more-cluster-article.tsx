"use client";

import { moreArticles } from "@/lib/data/more-insight-clusters";
import { buildStructuredInsight } from "@/lib/build-structured-insight";
import { InsightArticleLayout } from "@/components/articles/insight-article-layout";

export default function MoreClusterArticle({ slug }: { slug: string }) {
  const article = moreArticles.find((item) => item.slug === slug);
  if (!article) return <p>This article could not be loaded.</p>;
  const siblings = moreArticles
    .filter((a) => a.clusterHref === article.clusterHref)
    .map((a) => ({ title: a.title, slug: a.slug }));
  const doc = buildStructuredInsight(article, {
    label: article.cluster,
    href: article.clusterHref,
    siblings,
  });
  return <InsightArticleLayout doc={doc} />;
}
