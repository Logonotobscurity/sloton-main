import { notFound, redirect } from "next/navigation";
import { strategyArticles } from "@/lib/data/strategy-articles";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return strategyArticles.map((article) => ({ slug: article.slug }));
}

export default async function StrategyNestedArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = strategyArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  redirect(`/insights/${slug}`);
}
