import { notFound, redirect } from "next/navigation";
import { genaiArticles } from "@/lib/data/genai-articles";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return genaiArticles.map((article) => ({ slug: article.slug }));
}

export default async function GenaiNestedArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = genaiArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  redirect(`/insights/${slug}`);
}
