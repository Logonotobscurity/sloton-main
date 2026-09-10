
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { generateMetadata, KEYWORD_SETS, JsonLd, generateServiceSchema } from '@/lib/seo';
import { CaseStudyFeature } from '@/components/page-sections/case-study-feature';
import { PageHero } from '@/components/page-sections/page-hero';
import { analyticsServices, businessAnalyticsBenefits } from '@/lib/data/services-data';
import { ServiceConceptBlock } from '@/components/service-concept-block';

export const metadata = generateMetadata({
  title: 'Business Analytics & BI Solutions in Nigeria | Dashboards & Reporting',
  description: 'Transform raw data into actionable insights with our business analytics and BI solutions in Nigeria. We build custom dashboards, data reports, and KPI trackers to fuel data-driven growth and strategic decision-making.',
  keywords: [
    ...KEYWORD_SETS.analytics,
    'business analytics Nigeria',
    'BI solutions Lagos',
    'data analytics Nigeria',
    'custom dashboards',
    'business intelligence Nigeria',
    'data visualization Lagos',
    'KPI tracking',
    'data-driven insights',
  ],
  canonical: 'https://logonai.netlify.app/business-analytics',
});

const analyticsServiceSchema = generateServiceSchema({
  name: 'Business Analytics & BI Solutions',
  description: 'Transform raw data into actionable insights with our business analytics and BI solutions. We build custom dashboards, data reports, and KPI trackers to fuel data-driven growth.',
  url: 'https://logonai.netlify.app/business-analytics',
  provider: 'LOG_ON',
  areaServed: 'Nigeria',
});

export default function BusinessAnalyticsPage() {
  return (
    <div className="bg-background">
      <JsonLd data={analyticsServiceSchema} />
      <PageHero
        title="Business Analytics & Intelligence"
        description="Turn your data into your most valuable asset. We help you move from simply collecting data to actively using it to drive strategy, optimize operations, and uncover new opportunities. Our custom business analytics solutions provide the clarity you need to make confident, data-driven decisions."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="space-y-4 pt-4">
                {businessAnalyticsBenefits.map(benefit => (
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
            <Card className="absolute inset-2 sm:inset-5 bg-background/80 backdrop-blur-lg rotate-2 transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105">
                 <CardHeader>
                    <div className="flex justify-center mb-4">
                        <BarChart3 className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                    </div>
                    <CardTitle className="text-center text-fluid-lg">Actionable Insights</CardTitle>
                    <CardDescription className="text-center">
                        Transforming numbers into narrative.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-fluid-base">
                    <p className="leading-relaxed">We connect to your data sources to build a clear picture of your business performance and potential.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="verdara-section -mx-fluid-sm px-5 py-16">
            <p className="verdara-kicker">Intelligence</p>
            <h2 className="verdara-title mt-2">Business analytics <em>services</em></h2>
            <p className="verdara-lede mt-4">
                    We offer end-to-end analytics services, from data integration to strategic reporting.
            </p>
             <div className="verdara-grid verdara-grid-2 mt-10">
                {analyticsServices.map((service) => (
                <article key={service.title} className="verdara-card">
                    <span className="verdara-tag verdara-tag-coral">Data</span>
                    <h3 className="mt-4">{service.title}</h3>
                    <p className="verdara-lede mt-auto pt-3">{service.description}</p>
                </article>
                ))}
            </div>
        </section>

        <CaseStudyFeature 
            tags={["Analytics", "BI"]}
            title="Data-Driven Success Stories"
            description="See how our business analytics and BI solutions have empowered companies to make smarter decisions and drive strategic growth."
        />

         <section className="text-center mt-fluid-md py-fluid-md bg-background rounded-lg px-fluid-sm">
            <h2 className="text-fluid-lg font-bold font-headline">Ready to Unlock Your Data's Potential?</h2>
            <p className="mt-4 text-fluid-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Let's discuss how our custom analytics solutions can provide the insights you need to get ahead. Schedule a free consultation today.
            </p>
            <div className="mt-8 flex justify-center">
                <Button asChild size="lg">
                    <Link href="/contact">
                        Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

        <ServiceConceptBlock path="/business-analytics" />

      </div>
    </div>
  );
}
