import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
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
  title: 'About Us | AI & Automation Experts in Nigeria',
  description: 'Learn about LOG_ON, your digital architects for workplace automation in Nigeria. We build integrated digital ecosystems where businesses thrive through AI agent development.',
};

export default function AboutPage() {
    // Extract filtering logic to useMemo for performance
    const pressReleases = React.useMemo(
        () => insights.filter(i => i.tags.includes("Announcement") || i.tags.includes("Press Release")),
        []
    );

  return (
    <div>
        <PageHero 
            title="Your Digital Architects"
            description="LOG_ON is more than a technology provider; we are your strategic partner in growth. Our mission is to empower businesses by building intelligent systems that drive efficiency, spark innovation, and create lasting competitive advantages. We believe in connecting the dots between technology and business goals to deliver integrated solutions that produce real-world results."
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
                    <div className="p-6 md:p-8">
                        <h3 className="text-fluid-md font-bold font-headline flex items-center gap-3"><Globe className="h-8 w-8 text-primary"/> Our Mission</h3>
                        <p className="text-muted-foreground mt-4">To architect and build integrated digital ecosystems where businesses of all sizes can thrive, automate, and innovate with confidence.</p>
                    </div>
                </GlowingCard>
                <GlowingCard>
                    <div className="p-6 md:p-8">
                        <h3 className="text-fluid-md font-bold font-headline flex items-center gap-3"><Scale className="h-8 w-8 text-primary"/> Our Values</h3>
                        <ul className="text-muted-foreground mt-4 space-y-2">
                            <li><strong>Innovation-Driven:</strong> We are constantly exploring new technologies to deliver cutting-edge solutions.</li>
                            <li><strong>Client-Centric:</strong> Your success is our ultimate metric. We build partnerships based on trust and transparency.</li>
                            <li><strong>Results-Oriented:</strong> We design solutions focused on delivering measurable, tangible business value.</li>
                        </ul>
                    </div>
                </GlowingCard>
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
        
        <section id="news" className="py-fluid-lg">
            <div className="container mx-auto px-fluid-sm space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-fluid-lg font-bold font-headline flex items-center justify-center gap-3"><Rss className="h-8 w-8 text-primary"/> News & Announcements</h2>
                    <p className="mt-4 text-fluid-base text-muted-foreground">The latest company announcements, press releases, media assets, and our recent features in the news.</p>
                </div>
                {pressReleases.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pressReleases.map((insight) => (
                         <GlowingCard key={insight.title}>
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
                            <CardContent className="p-4 md:p-6 flex-grow">
                            <CardDescription>{formatFullDate(insight.date)}</CardDescription>
                            <CardTitle className="text-lg md:text-xl mt-2">
                                <Link href={`/insights/${insight.slug}`} className="hover:text-primary transition-colors">
                                    {insight.title}
                                </Link>
                            </CardTitle>
                            </CardContent>
                            <CardFooter className="p-4 md:p-6 pt-0">
                            <Link href={`/insights/${insight.slug}`} className="text-primary font-semibold flex items-center group">
                                <span className="sr-only">Read more about {insight.title}</span>
                                <span aria-hidden="true">Read More</span> <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                            </CardFooter>
                        </GlowingCard>
                    ))}
                    </div>
                )}
            </div>
        </section>

        <section id="analyst-reports" className="py-fluid-lg bg-secondary/20">
            <div className="container mx-auto px-fluid-sm space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-fluid-lg font-bold font-headline">Industry Analyst Reports</h2>
                    <p className="mt-4 text-fluid-base text-muted-foreground">Don't just take our word for it. See why leading industry analysts recognize LOG_ON for our innovation, market presence, and ability to deliver results for our customers.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto">
                    {analystReports.map((report, i) => (
                        <GlowingCard 
                            key={report.title}
                            className={`border-t border-border/50 ${
                                i === 0 ? "md:border-l-0" : "md:border-l"
                            } ${
                                i % 2 !== 0 ? "md:border-l-0" : "md:border-l"
                            }`}
                        >
                            <div className="p-6 md:p-8 h-full flex flex-col">
                                <p className="font-semibold text-primary text-sm uppercase tracking-wide">{report.firm}</p>
                                <h3 className="text-xl font-semibold mt-3 mb-2">{report.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{report.date}</p>
                                <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground flex-grow">
                                    "{report.excerpt}"
                                </blockquote>
                                <Button asChild variant="outline" className="mt-6 w-full">
                                    <Link href={report.href} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4"/>
                                        View Report
                                    </Link>
                                </Button>
                            </div>
                        </GlowingCard>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Button asChild size="lg">
                        <Link href="/about/reports">
                            View All Reports <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="research" className="py-fluid-lg">
             <div className="container mx-auto px-fluid-sm space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-fluid-lg font-bold font-headline">LOG_ON Research</h2>
                    <p className="mt-4 text-fluid-base text-muted-foreground">Innovation is at the core of our DNA. LOG_ON Research is dedicated to exploring the frontiers of artificial intelligence and automation through our internal labs, partnerships, and open-source contributions.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold font-headline mb-4 text-center">Our Core Research Areas</h3>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {researchAreas.map(area => (
                            <Card key={area.title}>
                                <CardHeader>
                                    <area.icon className="h-8 w-8 text-primary"/>
                                    <CardTitle className="pt-4">{area.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{area.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
             </div>
        </section>

        <section id="trust" className="py-fluid-lg bg-secondary/20">
            <div className="container mx-auto px-fluid-sm space-y-12">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-fluid-lg font-bold font-headline">Trust & Compliance</h2>
                    <p className="mt-4 text-fluid-base text-muted-foreground">Trust is the foundation of every partnership. We are deeply committed to protecting your data, respecting privacy, and maintaining the highest standards of security and compliance.</p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {trustPillars.map(pillar => (
                            <Card key={pillar.title} className="bg-background">
                                <CardHeader>
                                    <pillar.icon className="h-8 w-8 text-primary"/>
                                    <CardTitle className="pt-4">{pillar.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{pillar.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <BottomCta />
    </div>
  );
}