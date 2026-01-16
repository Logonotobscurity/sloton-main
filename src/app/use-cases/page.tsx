
import { PageHero } from '@/components/page-sections/page-hero';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight, BrainCircuit, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import { BottomCta } from '@/components/page-sections/bottom-cta';
import { SidebarNav } from '@/components/sidebar-nav';
import { industries, sidebarNavItems } from '@/lib/data/industries-data';

export const metadata: Metadata = {
  title: 'Workplace Automation Use Cases by Industry in Nigeria',
  description: 'Explore how LOG_ON delivers industry-specific AI agent development and workplace automation solutions for Finance, Healthcare, and E-Commerce in Nigeria to drive growth.',
};

export default function UseCasesPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="Solutions For Your Industry"
        description="We combine deep industry knowledge with technological expertise to build solutions that address the unique challenges of your sector. Explore how we empower businesses to innovate and grow."
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12">
            <aside className="lg:col-span-1 lg:sticky top-24 self-start">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="lg:col-span-4 space-y-20">
              {industries.map((industry) => (
                <section key={industry.id} id={industry.id} className="scroll-mt-20">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-8">
                      <industry.icon className="h-10 w-10 text-primary" />
                      <div className='flex-1'>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">{industry.name}</h2>
                        <p className="mt-1 text-lg text-muted-foreground">{industry.description}</p>
                      </div>
                  </div>
                  <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-accent" /> Key Industry Challenges</h3>
                        <ul className="space-y-2 list-inside list-disc text-muted-foreground">
                          {industry.challenges.map((challenge) => (
                            <li key={challenge}>{challenge}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-accent" /> Our AI-Powered Solutions</h3>
                        <div className="space-y-4">
                          {industry.solutions.map((solution) => (
                            <Card key={solution.name} className="bg-secondary/50">
                              <CardHeader>
                                <CardTitle className="text-base">{solution.name}</CardTitle>
                                <CardDescription>{solution.description}</CardDescription>
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Tangible Benefits</h3>
                        <div className="flex flex-wrap gap-3">
                          {industry.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full text-sm">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                       <div className="pt-6">
                        <Button asChild>
                          <Link href={`/contact?subject=Inquiry%20for%20${industry.name}`}>
                            Discuss Your {industry.name} Needs <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                </section>
              ))}
            </div>
        </div>
      </div>
      <BottomCta />
    </div>
  );
}
