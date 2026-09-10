import { notFound } from "next/navigation";
import { insights } from "@/lib/data/insights";
import Script from "next/script";
import type { Metadata, ResolvingMetadata } from "next";
import { InsightPageContent } from "@/components/insight-page-content";
import { getSiteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const insight = insights.find((item) => item.slug === resolvedParams.slug);

  if (!insight) {
    return { title: "Insight Not Found", description: "The requested article could not be found." };
  }

  const absoluteImageUrl = new URL(insight.image, (await parent).metadataBase || undefined).toString();
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/insights/${resolvedParams.slug}`;

  return {
    title: insight.title,
    description: insight.description,
    authors: [{ name: "Oluwamayowa Logo" }],
    other: {
      "article:published_time": insight.date,
      "article:modified_time": insight.date,
    },
    openGraph: {
      title: insight.title,
      description: insight.description,
      url: articleUrl,
      siteName: "LOG_ON",
      images: [{ url: absoluteImageUrl, width: insight.width, height: insight.height, alt: insight.title }],
      locale: "en_US",
      type: "article",
      publishedTime: insight.date,
      modifiedTime: insight.date,
      authors: ["Oluwamayowa Logo"],
      tags: insight.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    author: {
      "@type": "Person",
      name: "Oluwamayowa Logo",
      url: "https://www.linkedin.com/in/logo-oluwamayowa-cpo-/",
    },
    publisher: {
      "@type": "Organization",
      name: "LOG_ON",
      url: "https://logonai.netlify.app",
    },
    datePublished: insight.date,
    dateModified: insight.date,
  };

  return (
    <div>
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        <InsightPageContent slug={slug} />
      </div>
    </div>
  );
}
