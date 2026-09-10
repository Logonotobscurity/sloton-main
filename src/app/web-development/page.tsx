
import React, { lazy, Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, Code } from 'lucide-react';
import { generateMetadata, KEYWORD_SETS, JsonLd, generateServiceSchema } from '@/lib/seo';
import { PageHero } from '@/components/page-sections/page-hero';
import { webDevelopmentServices } from '@/lib/data/services-data';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceConceptBlock } from '@/components/service-concept-block';

const CaseStudyFeature = lazy(() => import('@/components/page-sections/case-study-feature').then(module => ({ default: module.CaseStudyFeature })));
const Faq = lazy(() => import('@/components/faq').then(module => ({ default: module.Faq })));

export const metadata = generateMetadata({
  title: 'Custom Web & Application Development in Nigeria | Next.js & React',
  description: 'Custom web development for publishers, e-commerce, and corporate clients in Nigeria. We build scalable, secure, and optimized digital platforms using Next.js and React to help your business grow.',
  keywords: [
    ...KEYWORD_SETS.development,
    'web development Nigeria',
    'Next.js development Lagos',
    'React development Nigeria',
    'custom web applications',
    'e-commerce development Nigeria',
    'corporate website development',
    'scalable web platforms',
  ],
  canonical: 'https://logonai.netlify.app/web-development',
});

const webDevServiceSchema = generateServiceSchema({
  name: 'Custom Web & Application Development',
  description: 'Custom web development for publishers, e-commerce, and corporate clients. We build scalable, secure, and optimized digital platforms using Next.js and React.',
  url: 'https://logonai.netlify.app/web-development',
  provider: 'LOG_ON',
  areaServed: 'Nigeria',
});

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
        <JsonLd data={webDevServiceSchema} />
        <PageHero
            title="Web & Custom Development"
            description="We specialize in crafting custom web projects tailored to your specific business needs. Drawing on our deep experience in IT solutions and AI automation, we build scalable, secure, and optimized digital platforms designed to help you grow."
            icon={<Code className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
        />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="verdara-section -mx-4 px-5 py-16">
            <p className="verdara-kicker">Build</p>
            <h2 className="verdara-title mt-2">Web & custom <em>development</em></h2>
             <div className="verdara-grid verdara-grid-2 mt-10">
                {webDevelopmentServices.map((service) => (
                <article key={service.title} className="verdara-card">
                    <span className="verdara-tag verdara-tag-amber">Web</span>
                    <h3 className="mt-4">{service.title}</h3>
                    <p className="verdara-lede mt-auto pt-3">{service.description}</p>
                </article>
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

        <ServiceConceptBlock path="/web-development" />

      </div>
    </div>
  );
}
