
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Rss } from 'lucide-react';
import type { Metadata } from 'next';
import { insights } from '@/lib/data/insights';
import { PageHero } from '@/components/page-sections/page-hero';
import { ArticleCodeVisual } from '@/components/ui/article-code-visual';
import { formatFullDate } from '@/lib/date-utils';
import { OptimizedImage } from '@/lib/image-utils';

export const metadata: Metadata = {
  title: 'Newsroom | LOG_ON',
  description: 'The latest news, announcements, and media resources from LOG_ON. Stay up to date with our company updates and product launches.',
};

export default function NewsroomPage() {
  const pressReleases = insights.filter(i => i.tags.includes("Announcement") || i.tags.includes("Press Release"));
  const latestArticles = insights.slice(0, 3);

  return (
    <div>
        <PageHero
            title="Newsroom"
            description="Welcome to the LOG_ON newsroom. Here you'll find the latest company announcements, press releases, media assets, and our recent features in the news."
        />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-12">
        {pressReleases.length > 0 && (
            <section className="verdara-section rounded-[26px] p-6">
                <h2 className="verdara-title mb-4">Press <em>releases</em></h2>
                <div className="verdara-grid verdara-grid-3">
                {pressReleases.map((insight) => (
                    <article key={insight.title} className="verdara-card">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">{insight.title}</h3>
                                <p className="text-sm text-muted-foreground">{insight.date}</p>
                            </div>
                            <p className="text-muted-foreground">{insight.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {insight.tags.map(tag => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
                </div>
            </section>
        )}

        <section className="verdara-section rounded-[26px] p-6">
            <h2 className="verdara-title mb-4">Latest <em>insights</em></h2>
            <div className="verdara-grid verdara-grid-3">
            {latestArticles.map((insight) => (
                <article key={insight.title} className="verdara-card p-0 overflow-hidden">
                <div className="flex flex-col h-full">
                    <CardHeader className="p-0">
                    <Link href={`/insights/${insight.slug}`}>
                        <div data-ai-hint={insight.dataAiHint} className="relative h-48 overflow-hidden rounded-t-xl">
                            {insight.codeVisualType ? (
                                <ArticleCodeVisual 
                                    type={insight.codeVisualType} 
                                    className="h-full w-full rounded-none border-0"
                                    animated={false}
                                />
                            ) : (
                                <OptimizedImage
                                    src={insight.image}
                                    alt={insight.title}
                                    width={insight.width}
                                    height={insight.height}
                                    hoverScale
                                    className="w-full h-full"
                                />
                            )}
                        </div>
                    </Link>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                    <CardDescription>{formatFullDate(insight.date)}</CardDescription>
                    <CardTitle className="text-lg md:text-xl mt-2">
                        <Link href={`/insights/${insight.slug}`} className="hover:text-primary transition-colors">
                            {insight.title}
                        </Link>
                    </CardTitle>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 mt-auto">
                    <Link href={`/insights/${insight.slug}`} className="text-primary font-semibold flex items-center group">
                        <span className="sr-only">Read more about {insight.title}</span>
                        <span aria-hidden="true">Read More</span> <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    </CardFooter>
                </div>
                </article>
            ))}
            </div>
        </section>
        </div>
    </div>
  );
}
