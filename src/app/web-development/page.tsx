
import React, { lazy, Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, Code } from 'lucide-react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/page-sections/page-hero';
import { webDevelopmentServices } from '@/lib/data/services-data';
import { Skeleton } from '@/components/ui/skeleton';

const CaseStudyFeature = lazy(() => import('@/components/page-sections/case-study-feature').then(module => ({ default: module.CaseStudyFeature })));
const Faq = lazy(() => import('@/components/faq').then(module => ({ default: module.Faq })));

export const metadata: Metadata = {
  title: 'Custom Web & Application Development',
  description: 'Custom web development for publishers, e-commerce, and corporate clients. We build scalable, secure, and optimized digital platforms using Next.js and React to help your business grow.',
};

const SectionSkeleton = () => (
  <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-10 w-48 mt-4" />
    </div>
  </div>
);

export default function WebDevelopmentPage() {
  return (
    <div className="bg-background">
        <PageHero
            title="Web & Custom Development"
            description="We specialize in crafting custom web projects tailored to your specific business needs. Drawing on our deep experience in IT solutions and AI automation, we build scalable, secure, and optimized digital platforms designed to help you grow."
            icon={<Code className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
        />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="py-16 md:py-24">
             <div className="grid md:grid-cols-2 gap-8">
                {webDevelopmentServices.map((service) => (
                <Card key={service.title} className="bg-secondary/50 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <service.icon className="h-8 w-8 text-primary" />
                        <CardTitle className="text-lg md:text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm md:text-base">{service.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>

        <Suspense fallback={<SectionSkeleton />}>
            <CaseStudyFeature 
                tags={["Web Development", "Next.js", "Publisher"]}
                title="Our Web Development Work"
                description="See how our custom web development solutions have helped businesses launch high-performance platforms that drive revenue and engagement."
            />
        </Suspense>

         <section className="text-center mt-16 md:mt-24 py-12 md:py-16 bg-background rounded-lg px-4">
            <h2 className="text-2xl md:text-4xl font-bold font-headline">Have a Project in Mind?</h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're an established publisher, a growing e-commerce brand, or a corporation looking to enhance your digital presence, we're here to help.
            </p>
            <div className="mt-8 flex justify-center">
                <Button asChild size="lg">
                    <Link href="/contact">
                        Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}
