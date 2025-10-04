
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Globe, Heart, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Global Impact',
  description: 'Learn about LOG_ON\'s commitment to creating a positive global impact through ethical AI, digital skill development, and community support.',
};

const impactPillars = [
    {
        icon: <Heart className="h-8 w-8 text-primary"/>,
        title: "Ethical AI & Technology",
        description: "We are committed to the responsible development and deployment of AI. Our research in areas like bias mitigation and model transparency aims to ensure that technology serves humanity in a fair and equitable way."
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary"/>,
        title: "Digital Skill Development",
        description: "Through our 'RiseUp with LOG_ON' initiative and free training programs, we aim to equip individuals and communities with the skills needed to thrive in a digital-first economy."
    },
    {
        icon: <Globe className="h-8 w-8 text-primary"/>,
        title: "Community Support",
        description: "We lend our expertise and resources to non-profits and social enterprises, helping them leverage technology to amplify their impact and better serve their communities."
    }
]

export default function GlobalImpactPage() {
  return (
    <div>
        <PageHero 
            title="Our Global Impact"
            description="We believe that technology has the power to be a profound force for good. Our commitment to global impact extends beyond our client work into three core pillars: fostering ethical AI, empowering communities with digital skills, and supporting non-profit organizations."
        />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-12">
            <section>
                <div className="grid md:grid-cols-3 gap-8">
                    {impactPillars.map(pillar => (
                        <Card key={pillar.title}>
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
            </section>

            <section className="p-8 bg-secondary/30 rounded-lg">
                <h2 className="text-2xl font-bold text-center">LISTNER AI Project</h2>
                <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
                    One of our flagship community projects is LISTNER AI, an AI-powered mental health chatbot designed to provide accessible, confidential, and compassionate initial support. This project embodies our commitment to using technology to address critical societal needs.
                </p>
                <div className="text-center mt-6">
                        <Link href="/training#impact" className="text-primary font-semibold hover:underline">
                            Learn more about our community projects
                        </Link>
                </div>
            </section>
        </div>
    </div>
  );
}
