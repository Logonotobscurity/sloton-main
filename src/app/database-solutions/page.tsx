
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Database } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseStudyFeature } from '@/components/page-sections/case-study-feature';
import { PageHero } from '@/components/page-sections/page-hero';
import { databaseServices, databaseSolutionsBenefits } from '@/lib/data/services-data';
import { ServiceConceptBlock } from '@/components/service-concept-block';

export const metadata: Metadata = {
  title: 'Database Solutions | SQL & NoSQL Design, Migration, & Management',
  description: 'Robust database solutions including SQL & NoSQL architecture, cloud migration, performance tuning, and security. We build and manage scalable database systems on AWS, and Google Cloud.',
};


export default function DatabaseSolutionsPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="Database & Data Management Solutions"
        description="Your data is the backbone of your business. We design, build, and manage secure, scalable, and high-performance database systems that ensure your data is always available, consistent, and protected. From architecture to optimization, we provide end-to-end data solutions."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="space-y-4 pt-4">
                {databaseSolutionsBenefits.map(benefit => (
                    <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{benefit}</span>
                    </div>
                ))}
            </div>
            <Button asChild size="lg" className="mt-4">
              <Link href="/contact">Get Consultation</Link>
            </Button>
          </div>
          <div className="relative h-80 lg:h-96 mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-3 transition-transform duration-300 ease-in-out hover:rotate-0"></div>
            <Card className="absolute inset-2 sm:inset-5 bg-background/80 backdrop-blur-lg rotate-2 transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105 flex flex-col">
                 <CardHeader>
                    <div className="flex justify-center mb-4">
                        <Database className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                    </div>
                    <CardTitle className="text-center text-fluid-lg">Secure & Scalable Data</CardTitle>
                    <CardDescription className="text-center">
                        The foundation for your digital operations.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-fluid-base">
                    <p className="leading-relaxed">We ensure your data infrastructure is robust, performant, and ready for growth.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="verdara-section -mx-fluid-sm px-5 py-16">
            <p className="verdara-kicker">Data</p>
            <h2 className="verdara-title mt-2">Database <em>services</em></h2>
            <p className="verdara-lede mt-4">
                    We offer a complete range of services to manage the entire lifecycle of your data.
            </p>
             <div className="verdara-grid verdara-grid-2 mt-10">
                {databaseServices.map((service) => (
                <article key={service.title} className="verdara-card">
                    <span className="verdara-tag verdara-tag-sage">SQL</span>
                    <h3 className="mt-4">{service.title}</h3>
                    <p className="verdara-lede mt-auto pt-3">{service.description}</p>
                </article>
                ))}
            </div>
        </section>

        <CaseStudyFeature 
            tags={["Database", "Cloud", "Scalability"]}
            title="Success in Data Management"
            description="Learn how our database solutions have helped clients achieve scalability, performance, and rock-solid security for their critical applications."
        />

         <section className="text-center mt-fluid-md py-fluid-md bg-background rounded-lg px-fluid-sm">
            <h2 className="text-fluid-lg font-bold font-headline">Is Your Data Working For You?</h2>
            <p className="mt-4 text-fluid-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Let's discuss how our database expertise can improve your application performance and secure your data. Schedule a free consultation today.
            </p>
            <div className="mt-8 flex justify-center">
                <Button asChild size="lg">
                    <Link href="/contact">
                        Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

        <ServiceConceptBlock path="/database-solutions" />

      </div>
    </div>
  );
}
