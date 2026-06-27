import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { JsonLd, BreadcrumbSchema } from '@/lib/seo';
import { ArrowRight, Building, Users, Scale, Globe, Download, Rss } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-sections/page-hero';
import { BottomCta } from '@/components/page-sections/bottom-cta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { insights } from '@/lib/data/insights';
import { stats, trustPillars, researchAreas, analystReports } from '@/lib/data/about-page-data';
import { ArticleCodeVisual } from '@/components/ui/article-code-visual';
import { formatFullDate } from '@/lib/date-utils';
import React from 'react';
import { OptimizedImage } from '@/lib/image-utils';

export const metadata: Metadata = {
  title: 'About Our Expertise',
  description: 'Learn about LOG_ON Solutions, your digital architects for workplace automation in Nigeria. We build integrated digital ecosystems where businesses thrive through AI agent development.',
  alternates: {
    canonical: 'https://logonsolutions.netlify.app/about',
  },
};

const leadershipSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Oluwamayowa Logo',
    'jobTitle': 'Lead Developer & Automation Solution Architect',
    'worksFor': {
      '@type': 'Organization',
      'name': 'LOG_ON Solutions'
    },
    'sameAs': [
      'https://www.linkedin.com/in/logo-oluwamayowa-cpo-/',
      'https://github.com/Logonotobscurity/',
      'https://x.com/Logo_obscurity'
    ],
    'description': 'Expert in AI architecture, automation solutions, and scalable enterprise systems.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Favour Alfred',
    'jobTitle': 'Team Lead, Sales & Business Process Automation',
    'worksFor': {
      '@type': 'Organization',
      'name': 'LOG_ON Solutions'
    },
    'description': 'Expert in workflow design, digital marketing, and business transformation.'
  }
];

export default function AboutPage() {
    // Extract filtering logic to useMemo for performance
    const pressReleases = React.useMemo(
        () => insights.filter(i => i.tags.includes("Announcement") || i.tags.includes("Press Release")),
        []
    );

  return (
    <div>
        <JsonLd data={leadershipSchema} />
        <BreadcrumbSchema items={[
          { name: 'Home', url: 'https://logonsolutions.netlify.app' },
          { name: 'About', url: 'https://logonsolutions.netlify.app/about' },
        ]} />
        <PageHero 
            title="Your Digital Architects"
            description="LOG_ON Solutions is more than a technology provider; we are your strategic partner in growth. Our mission is to empower businesses by building intelligent systems that drive efficiency, spark innovation, and create lasting competitive advantages."
        />

        <section className="py-fluid-lg">
            <div className="container mx-auto px-fluid-sm">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map(stat => (
                        <div key={stat.label}>
                            <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                            <p className="text-muted-foreground mt-2 text-sm md:text-base">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="container mx-auto px-fluid-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <GlowingCard>
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3"><Building className="text-primary"/> Our Story</h2>
                        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                            <p>Founded in Lagos, Nigeria, LOG_ON Solutions was born from a simple observation: while the world was racing ahead with AI and automation, many businesses across Africa were being left behind by fragmented, expensive, and overly complex technology.</p>
                            <p>We set out to change that. We don't just sell software; we design digital ecosystems. Our approach combines the precision of high-end engineering with a deep understanding of the local business landscape.</p>
                        </div>
                    </div>
                </GlowingCard>
                <div className="space-y-8">
                     <div className="flex items-start gap-6">
                        <div className="bg-primary/10 p-4 rounded-full flex-shrink-0">
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-headline mb-2">Our Mission</h3>
                            <p className="text-muted-foreground text-lg">To democratize access to advanced AI and automation, empowering African enterprises to scale with confidence and efficiency.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="bg-primary/10 p-4 rounded-full flex-shrink-0">
                            <Scale className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-headline mb-2">Our Values</h3>
                            <p className="text-muted-foreground text-lg">Integrity, innovation, and impact. We measure our success not by the code we ship, but by the results our partners achieve.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="container mx-auto px-fluid-sm py-fluid-lg">
            <div className="text-center py-fluid-md bg-secondary/30 rounded-lg px-6">
                <h2 className="text-fluid-lg font-bold font-headline">Meet the People Behind the Innovation</h2>
                <p className="mt-4 text-fluid-base text-muted-foreground max-w-2xl mx-auto">
                    Our team is a dynamic duo of technology experts dedicated to delivering exceptional service.
                </p>
                <div className="mt-8 flex justify-center">
                    <Button asChild size="lg">
                        <Link href="/about/our-leadership">
                            Meet Our Team <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        <BottomCta />
    </div>
  );
}
