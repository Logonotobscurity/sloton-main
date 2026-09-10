"use client";

import { usePathname } from "next/navigation";
import { insights } from "@/lib/data/insights";
import { WrittenArticleShell } from "@/components/articles/written-article-shell";

export default function ArticleContent() {
  const pathname = usePathname() || "";
  const slug = pathname.split("/").filter(Boolean).pop() || "";
  const insight = insights.find((item) => item.slug === slug);

  if (!insight) {
    return (
      <div>
        <p className="mb-6 text-lg">This insight could not be found. Return to the hub and pick a live article.</p>
      </div>
    );
  }

  return (
    <WrittenArticleShell
      clusterHref="/insights"
      clusterLabel="LOG_ON Insights"
      title={insight.title}
      description={insight.description}
      extra={[
        {
          heading: "In this article",
          paragraphs: [
            `${insight.title} sits in our ${insight.tags.join(", ")} set. It is part of the same operating library as the AI Search and AI Agents clusters: entity-clear, dated, and written so a director can brief a board.`,
            "Use the related articles at the bottom of this page for adjacent playbooks. If you came here from search, start with the Insights hub for the cluster map.",
          ],
        },
      ]}
    />
  );
}
