
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Building, Users, Scale, Globe, ShieldCheck, Lock, DatabaseZap, FlaskConical, Lightbulb, BrainCircuit, Rss, Download, Heart, BookOpen } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-hero';
import { BottomCta } from '@/components/bottom-cta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { insights } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'About LOG_ON',
  description: 'Learn about LOG_ON, your digital architects. We build integrated digital ecosystems where businesses thrive. Explore our mission, values, research, and commitment to trust.',
};

const stats = [
    { value: '100+', label: 'Projects Completed' },
    { value: '50+', label: 'Satisfied Clients' },
    { value: '10+', label: 'Technology Partners' },
    { value: '5+', label: 'Countries Served' }
]

const trustPillars = [
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Security by Design",
        description: "We embed security into every stage of our development lifecycle. From architecture to deployment, we follow industry best practices to protect against threats and vulnerabilities."
    },
    {
        icon: <Lock className="h-8 w-8 text-primary"/>,
        title: "Data Privacy & Governance",
        description: "Your data is yours. We adhere to strict data privacy principles and comply with global regulations like GDPR. We provide you with the tools and transparency to control your data."
    },
    {
        icon: <DatabaseZap className="h-8 w-8 text-primary"/>,
        title: "Platform Reliability & Resilience",
        description: "We build our systems on world-class cloud infrastructure like AWS and Google Cloud, designing for high availability and disaster recovery to ensure your services remain online."
    }
];

const researchAreas = [
    {
        icon: <BrainCircuit className="h-8 w-8 text-primary"/>,
        title: "Generative AI & LLMs",
        description: "Developing novel architectures for more efficient and context-aware Large Language Models and exploring new applications for generative content.",
    },
    {
        icon: <FlaskConical className="h-8 w-8 text-primary"/>,
        title: "Ethical & Responsible AI",
        description: "Creating frameworks and tools to identify and mitigate bias in AI models, ensuring fairness and transparency in automated decision-making.",
    },
    {
        icon: <Lightbulb className="h-8 w-8 text-primary"/>,
        title: "Human-Computer Interaction",
        description: "Researching how AI can best augment human capabilities, designing intuitive 'copilot' experiences that boost productivity and creativity.",
    }
]

const reports = [
    {
        firm: "Gartner®",
        title: "Magic Quadrant™ for Enterprise Conversational AI Platforms",
        date: "July 2024",
        excerpt: "LOG_ON recognized for its ability to execute and completeness of vision in the rapidly evolving AI landscape.",
        href: "#"
    },
    {
        firm: "Forrester™",
        title: "The Forrester Wave™: Robotic Process Automation, Q3 2024",
        date: "September 2024",
        excerpt: "LOG_ON named a Strong Performer in our evaluation of the top RPA vendors, cited for its ease of use and strong partner ecosystem.",
        href: "#"
    }
]

export default function AboutPage() {
    const pressReleases = insights.filter(i => i.tags.includes("Announcement") || i.tags.includes("Press Release"));

  return (
    <div>
        <PageHero 
            title="Your Digital Architects"
            description="LOG_ON is more than a technology provider; we are your strategic partner in growth. Our mission is to empower businesses by building intelligent systems that drive efficiency, spark innovation, and create lasting competitive advantages. We believe in connecting the dots between technology and business goals to deliver integrated solutions that produce real-world results."
        />

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
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

        <section className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <GlowingCard>
                    <div className="p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold font-headline flex items-center gap-3"><Globe className="h-8 w-8 text-primary"/> Our Mission</h3>
                        <p className="text-muted-foreground mt-4">To architect and build integrated digital ecosystems where businesses of all sizes can thrive, automate, and innovate with confidence.</p>
                    </div>
                </GlowingCard>
                <GlowingCard>
                    <div className="p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold font-headline flex items-center gap-3"><Scale className="h-8 w-8 text-primary"/> Our Values</h3>
                        <ul className="text-muted-foreground mt-4 space-y-2">
                            <li><strong>Innovation-Driven:</strong> We are constantly exploring new technologies to deliver cutting-edge solutions.</li>
                            <li><strong>Client-Centric:</strong> Your success is our ultimate metric. We build partnerships based on trust and transparency.</li>
                            <li><strong>Results-Oriented:</strong> We design solutions focused on delivering measurable, tangible business value.</li>
                        </ul>
                    </div>
                </GlowingCard>
            </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="text-center py-12 md:py-16 bg-secondary/30 rounded-lg px-6">
                <h2 className="text-2xl md:text-4xl font-bold font-headline">Meet the People Behind the Innovation</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
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
        
        <section id="news" className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline flex items-center justify-center gap-3"><Rss className="h-8 w-8 text-primary"/> News & Announcements</h2>
                    <p className="mt-4 text-md md:text-lg text-muted-foreground">The latest company announcements, press releases, media assets, and our recent features in the news.</p>
                </div>
                {pressReleases.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pressReleases.map((insight) => (
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
                                <CardDescription>{new Date(insight.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                                <CardTitle className="text-lg md:text-xl mt-2">
                                    <Link href={`/insights/${insight.slug}`} className="hover:text-primary transition-colors">
                                        {insight.title}
                                    </Link>
                                </CardTitle>
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
                )}
            </div>
        </section>

        <section id="analyst-reports" className="py-16 md:py-24 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6 space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Industry Analyst Reports</h2>
                    <p className="mt-4 text-md md:text-lg text-muted-foreground">Don't just take our word for it. See why leading industry analysts recognize LOG_ON for our innovation, market presence, and ability to deliver results for our customers.</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-6">
                    {reports.map((report) => (
                        <Card key={report.title} className="bg-background">
                            <CardHeader>
                                <p className="font-semibold text-primary">{report.firm}</p>
                                <CardTitle>{report.title}</CardTitle>
                                <CardDescription>{report.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
                                    "{report.excerpt}"
                                </blockquote>
                                <Button asChild variant="outline" className="mt-6">
                                    <Link href={report.href}>
                                        <Download className="mr-2 h-4 w-4"/>
                                        Access Report
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="research" className="py-16 md:py-24">
             <div className="container mx-auto px-4 md:px-6 space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">LOG_ON Research</h2>
                    <p className="mt-4 text-md md:text-lg text-muted-foreground">Innovation is at the core of our DNA. LOG_ON Research is dedicated to exploring the frontiers of artificial intelligence and automation through our internal labs, partnerships, and open-source contributions.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold font-headline mb-4 text-center">Our Core Research Areas</h3>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {researchAreas.map(area => (
                            <Card key={area.title}>
                                <CardHeader>
                                    {area.icon}
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

        <section id="trust" className="py-16 md:py-24 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6 space-y-12">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Trust & Compliance</h2>
                    <p className="mt-4 text-md md:text-lg text-muted-foreground">Trust is the foundation of every partnership. We are deeply committed to protecting your data, respecting privacy, and maintaining the highest standards of security and compliance.</p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {trustPillars.map(pillar => (
                            <Card key={pillar.title} className="bg-background">
                                <CardHeader>
                                    {pillar.icon}
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
