
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, BarChart3, LineChart, Target, Table } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseStudyFeature } from '@/components/case-study-feature';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Business Analytics & BI Solutions | Dashboards & Reporting',
  description: 'Transform raw data into actionable insights with our business analytics and BI solutions. We build custom dashboards, data reports, and KPI trackers to fuel data-driven growth.',
};

const analyticsServices = [
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'Custom Interactive Dashboards',
    description: 'We move beyond static reports to build dynamic, interactive dashboards (e.g., using Power BI or Tableau) that allow you to explore your data in real-time. Filter, drill down, and uncover the trends that matter most to your business in a user-friendly visual interface.',
  },
  {
    icon: <Table className="h-8 w-8 text-primary" />,
    title: 'Business Intelligence (BI) Reporting',
    description: 'From sales performance to operational efficiency, we create automated, comprehensive BI reports that deliver the right information to the right people at the right time. We help you establish a "single source of truth" for your data, ensuring consistency and accuracy across your organization.',
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Key Performance Indicator (KPI) Tracking',
    description: 'We work with you to identify the metrics that are most critical to your success. We then build systems to track these KPIs automatically, providing you with a clear, at-a-glance view of your business health and progress towards your strategic goals.',
  },
  {
    icon: <LineChart className="h-8 w-8 text-primary" />,
    title: 'Data-driven Strategic Insights',
    description: 'Our service goes beyond just presenting data; we help you interpret it. We provide analysis and insights that help you understand customer behavior, identify market opportunities, and make confident, evidence-based decisions that drive growth.',
  },
];

const benefits = [
    "Make smarter, faster business decisions",
    "Gain a complete and accurate view of your operations",
    "Identify new market opportunities and customer trends",
    "Improve operational efficiency and reduce costs",
    "Foster a data-driven culture within your organization"
]

export default function BusinessAnalyticsPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="Business Analytics & Intelligence"
        description="Turn your data into your most valuable asset. We help you move from simply collecting data to actively using it to drive strategy, optimize operations, and uncover new opportunities. Our custom business analytics solutions provide the clarity you need to make confident, data-driven decisions."
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="space-y-4 pt-4">
                {benefits.map(benefit => (
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
                    <CardTitle className="text-center text-2xl md:text-3xl">Actionable Insights</CardTitle>
                    <CardDescription className="text-center">
                        Transforming numbers into narrative.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm md:text-base">
                    <p className="leading-relaxed">We connect to your data sources to build a clear picture of your business performance and potential.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-bold font-headline">Our Business Analytics Services</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground leading-relaxed">
                    We offer end-to-end analytics services, from data integration to strategic reporting.
                </p>
            </div>
             <div className="grid md:grid-cols-2 gap-8">
                {analyticsServices.map((service) => (
                <Card key={service.title} className="bg-secondary/50 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {service.icon}
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

         <section className="text-center mt-16 md:mt-24 py-12 md:py-16 bg-background rounded-lg px-4">
            <h2 className="text-2xl md:text-4xl font-bold font-headline">Ready to Unlock Your Data's Potential?</h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
