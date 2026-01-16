
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, TestTube } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-sections/page-hero';
import { labValues, submissionProcess, activePilots } from '@/lib/data/ab-testing-data';

export const metadata: Metadata = {
  title: 'A/B Testing & Innovation Lab for Workplace AI',
  description: 'Join our Ideas Lab to test workplace AI concepts. Explore active pilots and submit your product for data-driven analysis of automation and AI agent performance.',
};

export default function ABTestingPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="The Ideas Lab: Where We Test Tomorrow, Together"
        description="We're a relentless idea engine. We test our own bold concepts, and now we're opening our doors to test yours. Explore our active pilots and submit your product for rigorous, data-driven validation."
        icon={<TestTube className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg space-y-fluid-lg">
        
        <section>
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-fluid-lg font-bold font-headline">The Ideas Lab Manifesto</h2>
                <p className="mt-4 text-fluid-base text-muted-foreground">
                    We connect technological dots to build robust, innovative solutions. The Lab is where we pressure-test these ideas before they become full-scale solutions, guided by three core values.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-fluid-sm">
                {labValues.map(value => (
                    <Card key={value.title} className="text-center p-6 bg-secondary/30">
                        <div className="flex justify-center mb-4"><value.icon className="h-8 w-8 text-primary" /></div>
                        <CardTitle>{value.title}</CardTitle>
                        <CardContent className="p-0 pt-4">
                            <p className="text-muted-foreground">{value.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        <section className="py-fluid-md bg-secondary/50 -mx-fluid-sm px-fluid-sm sm:rounded-2xl">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-fluid-lg font-bold font-headline">Have a Product or Idea We Should Test?</h2>
                        <p className="text-fluid-base text-muted-foreground">
                            Our lab is open for collaboration. We invite brands, startups, and creators to submit their products, websites, or campaigns for data-driven validation.
                        </p>
                         <Button asChild size="lg">
                            <Link href="/contact?subject=Ideas+Lab+Submission">
                                Apply for Product Testing <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {submissionProcess.map(step => (
                            <Card key={step.title} className="bg-background">
                                <CardHeader>
                                    <CardTitle className="text-lg">{step.title}</CardTitle>
                                    <CardDescription>{step.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        
        <section>
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-fluid-lg font-bold font-headline">Live from the Lab: Our Active Pilot Tests</h2>
                <p className="mt-4 text-fluid-base text-muted-foreground">
                    Transparency is key to innovation. Here’s a live look at the experiments currently running in the Ideas Lab and the hypotheses we're validating.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activePilots.map(pilot => (
                     <Card key={pilot.name} className="bg-secondary/30 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">{pilot.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm text-primary">Hypothesis</h4>
                                <p className="text-muted-foreground text-sm">"{pilot.hypothesis}"</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-primary">Test Metric</h4>
                                <p className="text-muted-foreground text-sm">{pilot.metric}</p>
                            </div>
                        </CardContent>
                        <CardContent className="pt-4 mt-auto">
                           <p className={`text-sm font-semibold flex items-center gap-2 text-muted-foreground`}>
                               <pilot.icon className="h-4 w-4 text-primary" />
                               {pilot.status}
                           </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

         <section className="text-center mt-fluid-md py-fluid-sm bg-background rounded-lg px-6">
            <h2 className="text-fluid-lg font-bold font-headline">The Science Behind the Lab</h2>
            <p className="mt-4 text-fluid-base text-muted-foreground max-w-2xl mx-auto">
                Our Ideas Lab is powered by a robust A/B testing methodology. This is the engine that allows us to move from hypothesis to data-proven insight, reducing the risk of launching new features and getting to market faster.
            </p>
         </section>
      </div>
    </div>
  );
}
