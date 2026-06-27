
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-sections/page-hero';

export const metadata: Metadata = {
  title: 'Analyst Reports',
  description: 'See why industry analysts recognize LOG_ON Solutions as a leader in AI and automation. Access reports from Gartner, Forrester, and more.',
};

import { Route } from 'next';

interface Report {
  firm: string;
  title: string;
  date: string;
  excerpt: string;
  href: Route;
}

const reports: Report[] = [
    {
        firm: "Gartner®",
        title: "Magic Quadrant™ for Enterprise Conversational AI Platforms",
        date: "July 2024",
        excerpt: "LOG_ON Solutions recognized for its ability to execute and completeness of vision in the rapidly evolving AI landscape.",
        href: "#"
    },
    {
        firm: "Forrester™",
        title: "The Forrester Wave™: Robotic Process Automation, Q3 2024",
        date: "September 2024",
        excerpt: "LOG_ON Solutions named a Strong Performer in our evaluation of the top RPA vendors, cited for its ease of use and strong partner ecosystem.",
        href: "#"
    }
]

export default function AnalystReportsPage() {
  return (
    <div>
        <PageHero 
            title="Industry Analyst Reports"
            description="Don't just take our word for it. See why leading industry analysts recognize LOG_ON Solutions for our innovation, market presence, and ability to deliver results for our customers."
        />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <section className="space-y-6">
                {reports.map((report) => (
                    <Card key={report.title}>
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
                                <Link href={report.href as Route}>
                                    <Download className="mr-2 h-4 w-4"/>
                                    Access Report
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    </div>
  );
}
