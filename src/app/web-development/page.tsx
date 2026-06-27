import React, { lazy, Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, Code } from 'lucide-react';
import { generateMetadata, KEYWORD_SETS, JsonLd, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { PageHero } from '@/components/page-sections/page-hero';
import { webDevelopmentServices } from '@/lib/data/services-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CaseStudyFeature = lazy(() => import('@/components/page-sections/case-study-feature').then(module => ({ default: module.CaseStudyFeature })));

export const metadata = generateMetadata({
  title: 'Custom Web & App Development',
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
  canonical: 'https://logonsolutions.netlify.app/web-development',
});

const webDevServiceSchema = generateServiceSchema({
  name: 'Custom Web & Application Development',
  description: 'Custom web development for publishers, e-commerce, and corporate clients. We build scalable, secure, and optimized digital platforms using Next.js and React.',
  url: 'https://logonsolutions.netlify.app/web-development',
  provider: 'LOG_ON Solutions',
  areaServed: 'Nigeria',
});

const faqs = [
  {
    question: "What is custom web development?",
    answer: "Custom web development is the process of building a website or web application tailored specifically to a business's unique requirements, rather than using generic templates. This ensures better performance, security, and scalability."
  },
  {
    question: "Why do you use Next.js and React?",
    answer: "Next.js and React allow us to build high-performance, SEO-friendly, and highly interactive web applications. They provide the best developer experience and the fastest load times for end-users."
  },
  {
    question: "Do you offer e-commerce development?",
    answer: "Yes. We build scalable e-commerce platforms with custom features, secure payment integrations, and AI-powered recommendation engines to drive sales."
  }
];

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
        <JsonLd data={generateFAQSchema(faqs)} />
        <JsonLd data={generateBreadcrumbSchema([
          { name: 'Home', url: 'https://logonsolutions.netlify.app' },
          { name: 'Web Development', url: 'https://logonsolutions.netlify.app/web-development' },
        ])} />
        <PageHero
            title="Custom Web & App Development in Nigeria"
            description="We specialize in crafting custom web projects tailored to your specific business needs. Drawing on our deep experience in IT solutions and AI automation, we build scalable, secure, and optimized digital platforms designed to help you grow."
            icon={<Code className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
        />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">

        {/* Answer Block */}
        <section className="mb-16 bg-secondary/20 p-8 rounded-2xl border border-primary/10">
          <h2 className="text-2xl font-bold mb-4">What is Custom Web Development?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Custom web development in Nigeria refers to the creation of bespoke digital platforms—from corporate websites to complex web applications—built using modern frameworks like Next.js and React. Unlike template-based sites, custom development by LOG_ON Solutions ensures your platform is high-performance, secure, and fully aligned with your specific business goals and AI-integration needs.
          </p>
        </section>

        <section className="py-16 md:py-24">
             <div className="grid md:grid-cols-2 gap-8 mb-24">
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

            {/* Comparison Table */}
            <section className="mb-24">
              <h2 className="text-fluid-lg font-bold font-headline mb-8 text-center">Custom Web Apps vs. Template Sites</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="w-[200px]">Feature</TableHead>
                      <TableHead>Template-Based Sites</TableHead>
                      <TableHead className="text-primary font-bold">LOG_ON Custom Builds</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Performance</TableCell>
                      <TableCell>Slower (heavy themes/plugins)</TableCell>
                      <TableCell>Ultra-fast (optimized code)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SEO & GEO</TableCell>
                      <TableCell>Basic/Generic</TableCell>
                      <TableCell>Advanced, AI-citation ready</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Scalability</TableCell>
                      <TableCell>Limited by platform</TableCell>
                      <TableCell>Infinite cloud scalability</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AI Integration</TableCell>
                      <TableCell>Usually via basic plugins</TableCell>
                      <TableCell>Deep, native AI agent integration</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>
        </section>

        <Suspense fallback={<SectionSkeleton />}>
            <CaseStudyFeature 
                tags={["Web Development", "Next.js", "Publisher"]}
                title="Our Web Development Work"
                description="See how our custom web development solutions have helped businesses launch high-performance platforms that drive revenue and engagement."
            />
        </Suspense>

        {/* FAQs */}
        <section className="py-24 max-w-4xl mx-auto">
          <h2 className="text-fluid-lg font-bold font-headline mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border pb-6">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

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
