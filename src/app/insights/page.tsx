
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { insights } from '@/lib/insights';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Technology Insights & Articles',
  description: 'Stay ahead of the curve with our expert analysis on the latest trends in technology, automation, and AI. Explore articles on the future of work, business automation, and more.',
};

const topics = [
    "Artificial Intelligence and Machine Learning",
    "Business Process Automation (BPA)",
    "Digital Transformation Strategies",
    "Cloud Computing and DevOps",
    "Web and Mobile Development Trends",
    "Cybersecurity Best Practices"
]

export default function InsightsPage() {
  return (
    <div>
        <PageHero
            title="Insights & Articles"
            description="Welcome to our hub for expert analysis and thought leadership. Here, we delve into the technologies and strategies that are shaping the future of business. Stay ahead of the curve with our in-depth articles on everything from artificial intelligence to digital transformation."
        />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        
        <div className="my-16 md:my-24 max-w-4xl mx-auto">
             <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-headline">Topics We Cover</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {topics.map(topic => (
                    <div key={topic} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{topic}</span>
                    </div>
                ))}
             </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <GlowingCard key={insight.title}>
              <div className="flex flex-col h-full">
                <CardHeader className="p-0">
                  <Link href={`/insights/${insight.slug}`}>
                    <div data-ai-hint={insight.dataAiHint}>
                        <Image
                        src={insight.image}
                        alt={insight.title}
                        width={insight.width}
                        height={insight.height}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
                        />
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-4 md:p-6 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-2">
                     {insight.tags.map(tag => (
                       <Badge key={tag} variant="outline" className="border-primary text-primary">{tag}</Badge>
                     ))}
                  </div>
                  <CardTitle className="text-lg md:text-xl">
                      <Link href={`/insights/${insight.slug}`} className="hover:text-primary transition-colors">
                          {insight.title}
                      </Link>
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm">{insight.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                  <Link href={`/insights/${insight.slug}`} className="text-primary font-semibold flex items-center group">
                    Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardFooter>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </div>
  );
}
