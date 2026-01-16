
import {
  ArrowRight,
  CheckCircle,
  Search,
} from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BottomCta } from "@/components/page-sections/bottom-cta";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SolutionRecommendationForm from "@/components/solution-recommendation-form";
import { services, industryApplications } from "@/lib/data/solutions-data";


export const metadata: Metadata = {
  title: "Technology Solutions | Custom AI, Automation & Development",
  description:
    "Explore LOG_ON's comprehensive suite of technology solutions, including custom AI, process automation, web development, and business analytics, designed to drive efficiency and growth.",
};

export default function SolutionsPage() {
  return (
    <div className="bg-background">
      <PageHero 
        title="Turn Your Biggest Challenges into Growth Opportunities"
        description="We don't just build solutions; we architect results. Discover how our integrated AI and automation services can transform your business, streamline operations, and unlock new value."
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-8">
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">Get Your Free AI Assessment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl md:max-w-2xl bg-background">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Free AI Business Assessment</DialogTitle>
                        <DialogDescription>
                        Describe your business needs to receive tailored IT solution recommendations from our AI consultant.
                        </DialogDescription>
                    </DialogHeader>
                    <SolutionRecommendationForm />
                </DialogContent>
            </Dialog>
            <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Schedule a Free Consultation</Link>
            </Button>
        </div>
      </PageHero>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-20">
        
        {/* Core Services Section */}
        <div className="space-y-16">
            {services.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <section key={service.id} id={service.id} className="scroll-mt-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        <div className="lg:sticky top-24">
                           <div className="flex items-center gap-4 mb-4">
                                <ServiceIcon className="h-8 w-8 text-primary" />
                                <h2 className="text-3xl md:text-4xl font-bold font-headline">{service.title}</h2>
                           </div>
                           <p className="text-muted-foreground md:text-lg">{service.description}</p>
                           <Button asChild className="mt-6">
                               <Link href={service.cta.href}>
                                   {service.cta.text} <ArrowRight className="ml-2 h-4 w-4"/>
                               </Link>
                           </Button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-primary">Key Capabilities</h3>
                                <ul className="space-y-2">
                                    {service.capabilities.map(cap => (
                                        <li key={cap} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-muted-foreground">{cap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-primary">Business Benefits</h3>
                                <ul className="space-y-2">
                                    {service.benefits.map(benefit => (
                                        <li key={benefit} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-muted-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
              );
            })}
        </div>

        {/* Solutions Audit Section */}
        <section className="py-16 md:py-24 bg-secondary/20 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 sm:rounded-2xl">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                             <Search className="h-8 w-8 text-primary" />
                             <h2 className="text-3xl md:text-4xl font-bold font-headline">The LOG_ON Solutions Audit</h2>
                        </div>
                        <p className="text-muted-foreground md:text-lg">Before we build, we analyze. Our process begins with a comprehensive audit of your existing digital ecosystem—from your main page and sub-pages to your navigation flows. We map out user journeys and data pathways to identify critical opportunities for optimization.</p>
                        <p className="text-muted-foreground md:text-lg">This strategic approach ensures that any solution we implement is perfectly aligned with your business goals and has a clearly defined path to delivering a return on investment. We don't guess; we provide a data-driven roadmap to success.</p>
                    </div>
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle>Your Free AI Business Assessment</CardTitle>
                            <CardDescription>Our audit process starts here. Answer a few questions about your business, and our AI consultant will generate a high-level report identifying your top opportunities for automation and digital transformation.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/contact?subject=AI+Business+Assessment">
                                    Get Your Free Assessment <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
        
        {/* Industry Applications Section */}
        <section>
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Industry-Specific Solutions</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground">We apply our core services to solve the unique challenges of your industry, turning complex problems into growth opportunities.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industryApplications.map(app => {
                  const AppIcon = app.icon;
                  return (
                    <Card key={app.industry} className="bg-background/50 flex flex-col">
                        <CardHeader>
                            <div className="flex items-start gap-4 mb-2">
                                <div className="flex-shrink-0"><AppIcon className="h-8 w-8 text-primary" /></div>
                                <div className="flex-1">
                                    <CardTitle className="text-xl leading-snug">{app.industry}</CardTitle>
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-destructive">{app.challenge}</p>
                        </CardHeader>
                        <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: app.solution.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') }} />
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" size="sm" className="w-full">
                                <Link href={app.cta.href}>{app.cta.text}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                  )
                })}
            </div>
        </section>

      </div>
      <BottomCta />
    </div>
  );
}
