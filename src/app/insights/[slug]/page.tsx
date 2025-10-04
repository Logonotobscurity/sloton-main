
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AuthorBio } from '@/components/author-bio';
import { insights as allInsights } from '@/lib/insights';
import Script from 'next/script';
import { ShareModal } from '@/components/share-modal';
import type { Metadata, ResolvingMetadata } from 'next';
import { InsightPageContent } from '@/components/insight-page-content';

export const insights = allInsights;

type Props = {
  params: { slug: string }
}

// This function now correctly runs on the server.
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const insight = insights.find((insight) => insight.slug === params.slug);

  if (!insight) {
    return {
      title: "Insight Not Found",
      description: "The requested article could not be found.",
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  const absoluteImageUrl = new URL(insight.image, (await parent).metadataBase || undefined).toString();

  return {
    title: insight.title,
    description: insight.description,
    openGraph: {
      title: insight.title,
      description: insight.description,
      images: [absoluteImageUrl, ...previousImages],
    },
     twitter: {
      card: 'summary_large_image',
      title: insight.title,
      description: insight.description,
      images: [absoluteImageUrl], 
    },
  }
}

export default function InsightPage({ params }: { params: { slug: string } }) {
  const insight = insights.find((insight) => insight.slug === params.slug);

  if (!insight) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": insight.title,
    "description": insight.description,
    "image": new URL(insight.image, "https://logonsolutions.netlify.app").toString(),
    "author": {
      "@type": "Person",
      "name": insight.author
    },
    "publisher": {
        "@type": "Organization",
        "name": "LOG_ON connecting Advantages",
        "logo": {
            "@type": "ImageObject",
            "url": "https://logonsolutions.netlify.app/og-image.png"
        }
    },
    "datePublished": insight.date,
  };

  return (
    <div>
       <Script 
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Link href="/insights" className="text-primary hover:underline flex items-center gap-2 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Link>

          <article>
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {insight.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-primary text-primary">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{insight.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
                 <div className="flex items-center gap-4">
                    <span>By {insight.author}</span>
                    <span>•</span>
                    <span>{new Date(insight.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <ShareModal title={insight.title} />
              </div>
            </header>

            <div data-ai-hint={insight.dataAiHint}>
                <Image
                src={insight.image}
                alt={insight.title}
                width={insight.width}
                height={insight.height}
                className="w-full h-auto object-cover rounded-lg mb-8"
                priority
                />
            </div>
            
            <InsightPageContent slug={params.slug} />
            
             <section className="mt-16 border-t pt-8">
                <h3 className="text-2xl font-bold mb-4">About the Author</h3>
                <AuthorBio authorName={insight.author} />
             </section>
          </article>
        </div>
      </div>
    </div>
  );
}
