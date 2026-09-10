import { notFound, redirect } from "next/navigation";
import { agentArticles } from "@/lib/data/agent-articles";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return agentArticles.map((article) => ({ slug: article.slug }));
}

export default async function AgentNestedArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = agentArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  redirect(`/insights/${slug}`);
}
