
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Heart, Brain, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Careers at LOG_ON',
  description: 'Join our team of innovators and help us build the future of business efficiency. Explore open positions and learn about our culture at LOG_ON.',
};

const benefits = [
    "Competitive salary and performance bonuses",
    "Comprehensive health insurance",
    "Flexible remote work options",
    "Generous professional development budget",
    "A collaborative and innovative work culture"
];

const openPositions = [
    {
        title: "Senior AI Engineer",
        department: "Engineering",
        location: "Remote",
        description: "As a Senior AI Engineer, you will architect and build the core AI models that power our solutions, directly impacting our product's intelligence and effectiveness.",
        href: "#"
    },
    {
        title: "Business Development Manager",
        department: "Sales & Partnerships",
        location: "Remote",
        description: "You will drive growth by identifying new market opportunities, forging strategic partnerships, and building relationships that expand our customer base.",
        href: "#"
    },
    {
        title: "Product Manager, AI Platforms",
        department: "Product",
        location: "Remote",
        description: "You will own the product lifecycle from concept to launch, translating customer needs into features that deliver tangible value and drive user adoption.",
        href: "#"
    },
    {
        title: "Content Creator & Strategist",
        department: "Marketing",
        location: "Remote",
        description: "You will shape our brand narrative, creating insightful content that establishes LOG_ON as a thought leader and attracts our target audience.",
        href: "#"
    },
    {
        title: "AI Agent Developer",
        department: "Engineering",
        location: "Remote",
        description: "You will specialize in building and deploying the next generation of conversational AI and autonomous agents that redefine our clients' workflows.",
        href: "#"
    },
    {
        title: "AI Researcher",
        department: "Research & Development",
        location: "Remote",
        description: "You will explore the frontiers of AI, publishing research and developing novel techniques that will become the foundation of our future products.",
        href: "#"
    },
    {
        title: "Community Manager",
        department: "Marketing & Community",
        location: "Remote",
        description: "You will be the voice of LOG_ON, engaging with our user community, fostering a culture of learning, and gathering feedback to guide our growth.",
        href: "#"
    },
     {
        title: "AI Trainer",
        department: "Professional Services",
        location: "Remote",
        description: "You will empower our clients by designing and delivering expert-led training programs that enable them to master AI and automation technologies.",
        href: "#"
    },
     {
        title: "Social Media Manager",
        department: "Marketing",
        location: "Remote",
        description: "You will grow our digital footprint and drive engagement by creating and executing compelling social media strategies across all major platforms.",
        href: "#"
    }
]

export default function CareersPage() {
  return (
    <div>
        <PageHero 
            title="Join Our Team"
            description="We're looking for passionate, innovative thinkers to join us on our mission to redefine business efficiency. At LOG_ON, you'll work on challenging projects that have a real impact, collaborate with a team of experts, and have opportunities for continuous growth."
        />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-12 md:space-y-24">
            <section>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8 text-center">Why Work With Us?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="text-center p-4">
                        <CardHeader>
                            <Heart className="h-10 w-10 mx-auto text-primary"/>
                            <CardTitle className="pt-4">Passionate Culture</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Join a team that loves what they do and is driven by a shared vision of innovation.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center p-4">
                        <CardHeader>
                            <Brain className="h-10 w-10 mx-auto text-primary"/>
                            <CardTitle className="pt-4">Meaningful Work</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Solve complex problems and build solutions that have a measurable impact on our clients' success.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center p-4">
                        <CardHeader>
                            <Users className="h-10 w-10 mx-auto text-primary"/>
                            <CardTitle className="pt-4">Growth Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">We invest in our people with training, mentorship, and clear paths for career advancement.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4 text-center">Our Benefits</h2>
                <div className="p-6 md:p-8 bg-secondary/50 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {benefits.map(benefit => (
                        <div key={benefit} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-8 text-center">Open Positions</h2>
                <p className="text-muted-foreground mb-8 text-center max-w-3xl mx-auto">We are actively hiring for key roles across Engineering, Product, Sales, and Marketing. Each position is critical to our mission of driving growth and innovation. Find your place in our journey below.</p>
                <div className="space-y-4">
                    {openPositions.map(pos => (
                        <Card key={pos.title} className="hover:bg-secondary/50 transition-colors">
                            <Link href={pos.href} className="block p-4 md:p-6">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div className="flex-1">
                                        <h3 className="text-lg md:text-xl font-semibold text-primary">{pos.title}</h3>
                                        <p className="text-muted-foreground text-sm mb-2">{pos.department} &middot; {pos.location}</p>
                                        <p className="text-muted-foreground text-sm max-w-2xl">{pos.description}</p>
                                    </div>
                                    <div className="flex items-center text-muted-foreground mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    </div>
  );
}
