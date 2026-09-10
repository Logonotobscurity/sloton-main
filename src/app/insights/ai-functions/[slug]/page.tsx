import { notFound, redirect } from "next/navigation";
import { functionsArticles } from "@/lib/data/functions-articles";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return functionsArticles.map((article) => ({ slug: article.slug }));
}

export default async function FunctionsNestedArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = functionsArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  redirect(`/insights/${slug}`);
}
