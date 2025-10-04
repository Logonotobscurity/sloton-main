
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight, Rss } from 'lucide-react';
import type { Metadata } from 'next';
import { insights } from '@/lib/insights';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-hero';

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
            <section>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Press Releases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pressReleases.map((insight) => (
                    <GlowingCard key={insight.title} className="p-6">
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
                    </GlowingCard>
                ))}
                </div>
            </section>
        )}

        <section>
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Latest Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((insight) => (
                <GlowingCard key={insight.title}>
                <div className="flex flex-col h-full">
                    <CardHeader className="p-0">
                    <Link href={`/insights/${insight.slug}`}>
                        <Image
                        src={insight.image}
                        alt={insight.title}
                        width={insight.width}
                        height={insight.height}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                        data-ai-hint={insight.dataAiHint}
                        />
                    </Link>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                    <CardDescription>{new Date(insight.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                    <CardTitle className="text-lg md:text-xl mt-2">
                        <Link href={`/insights/${insight.slug}`} className="hover:text-primary transition-colors">
                            {insight.title}
                        </Link>
                    </CardTitle>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 mt-auto">
                    <Link href={`/insights/${insight.slug}`} className="text-primary font-semibold flex items-center group">
                        Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    </CardFooter>
                </div>
                </GlowingCard>
            ))}
            </div>
        </section>
        </div>
    </div>
  );
}
