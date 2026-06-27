import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { generateMetadata, KEYWORD_SETS, JsonLd, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { CaseStudyFeature } from '@/components/page-sections/case-study-feature';
import { PageHero } from '@/components/page-sections/page-hero';
import { analyticsServices, businessAnalyticsBenefits } from '@/lib/data/services-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = generateMetadata({
  title: 'Business Analytics & BI Solutions',
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
  canonical: 'https://logonsolutions.netlify.app/business-analytics',
});

const analyticsServiceSchema = generateServiceSchema({
  name: 'Business Analytics & BI Solutions',
  description: 'Transform raw data into actionable insights with our business analytics and BI solutions. We build custom dashboards, data reports, and KPI trackers to fuel data-driven growth.',
  url: 'https://logonsolutions.netlify.app/business-analytics',
  provider: 'LOG_ON Solutions',
  areaServed: 'Nigeria',
});

const faqs = [
  {
    question: "What are business analytics solutions?",
    answer: "Business analytics solutions are tools and processes used to collect, process, and analyze business data to generate actionable insights. These include BI dashboards, KPI tracking, and predictive modeling."
  },
  {
    question: "How does BI reporting help my business?",
    answer: "BI reporting provides a clear, visual representation of your performance metrics. It allows you to identify trends, spot inefficiencies, and make decisions based on real-time data rather than intuition."
  },
  {
    question: "Can you integrate with my existing data sources?",
    answer: "Yes. We specialize in connecting disparate data sources—including CRMs, ERPs, Excel files, and cloud databases—into a unified, single source of truth for your business intelligence."
  }
];

export default function BusinessAnalyticsPage() {
  return (
    <div className="bg-background">
      <JsonLd data={analyticsServiceSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: 'Home', url: 'https://logonsolutions.netlify.app' },
        { name: 'Business Analytics', url: 'https://logonsolutions.netlify.app/business-analytics' },
      ])} />
      <PageHero
        title="Business Analytics & Intelligence Solutions in Nigeria"
        description="Turn your data into your most valuable asset. We help you move from simply collecting data to actively using it to drive strategy, optimize operations, and uncover new opportunities. Our custom business analytics solutions provide the clarity you need to make confident, data-driven decisions."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">

        {/* Answer Block */}
        <section className="mb-16 bg-secondary/20 p-8 rounded-2xl border border-primary/10">
          <h2 className="text-2xl font-bold mb-4">What are Business Analytics Solutions?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Business analytics solutions in Nigeria involve the systematic exploration of an organization's data with an emphasis on statistical analysis. At LOG_ON Solutions, we build custom BI dashboards and reporting systems that turn raw data into actionable insights, helping businesses track KPIs, optimize workflows, and drive measurable growth through data-driven intelligence.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
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

        {/* Comparison/Decision Table */}
        <section className="mb-24">
          <h2 className="text-fluid-lg font-bold font-headline mb-8 text-center">Dashboards vs. BI Reporting</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead>Standard Dashboards</TableHead>
                  <TableHead className="text-primary font-bold">LOG_ON BI Solutions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Data Freshness</TableCell>
                  <TableCell>Manual/Static updates</TableCell>
                  <TableCell>Real-time / Automated sync</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Connectivity</TableCell>
                  <TableCell>Single source (e.g. Excel)</TableCell>
                  <TableCell>Multi-source ecosystem integration</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Insight Depth</TableCell>
                  <TableCell>Basic charts & totals</TableCell>
                  <TableCell>Drill-down & predictive modeling</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Accessibility</TableCell>
                  <TableCell>Desktop files</TableCell>
                  <TableCell>Secure, mobile-responsive cloud access</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="py-fluid-lg">
            <div className="text-center max-w-3xl mx-auto mb-fluid-md">
                <h2 className="text-fluid-xl font-bold font-headline">Our Business Analytics Services</h2>
                <p className="mt-4 text-fluid-base text-muted-foreground leading-relaxed">
                    We offer end-to-end analytics services, from data integration to strategic reporting.
                </p>
            </div>
             <div className="grid md:grid-cols-2 gap-8">
                {analyticsServices.map((service) => (
                <Card key={service.title} className="bg-secondary/50 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <service.icon className="h-8 w-8 text-primary" />
                        <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{service.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>

        <CaseStudyFeature 
            tags={["Analytics", "BI"]}
            title="Data-Driven Success Stories"
            description="See how our business analytics and BI solutions have empowered companies to make smarter decisions and drive strategic growth."
        />

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

      </div>
    </div>
  );
}
