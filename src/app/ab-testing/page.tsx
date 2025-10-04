
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Lightbulb, Bot, TestTube, Target, Puzzle, Handshake, FlaskConical, CircleDot } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'The Ideas Lab | Collaborative A/B Testing & Innovation',
  description: 'Join our Ideas Lab. We use rigorous A/B testing to validate bold concepts. Explore our active pilots and submit your own product for data-driven analysis.',
};

const labValues = [
    {
        icon: <FlaskConical className="h-8 w-8 text-primary" />,
        title: "Relentless Curiosity",
        description: "We are driven by a constant need to ask 'what if.' Every project starts with a bold question and an open mind."
    },
    {
        icon: <Handshake className="h-8 w-8 text-primary" />,
        title: "Open Collaboration",
        description: "Innovation thrives in the open. We partner with brands and creators to test ideas and share insights for mutual growth."
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-primary" />,
        title: "Data-Driven Validation",
        description: "We replace guesswork with evidence. Our rigorous testing methodology provides undeniable proof of what works."
    }
];

const submissionProcess = [
    {
        title: "1. You Submit",
        description: "Tell us about your product, website, or campaign. What's the key question you need to answer?"
    },
    {
        title: "2. We Strategize",
        description: "Our lab team designs a bespoke A/B test to validate your hypothesis and define clear success metrics."
    },
    {
        title: "3. We Test & Analyze",
        description: "We run the experiment on relevant traffic using our robust tools and gather clean, unbiased data."
    },
    {
        title: "4. You Get Insights",
        description: "You receive a comprehensive report with clear, actionable data and strategic recommendations."
    }
];

const activePilots = [
    {
        name: "Pilot: 'Cognitive-Load-Optimized' Checkout Flow",
        hypothesis: "By simplifying the checkout form from 5 fields to 3 with smart autofill, we will increase completion rates by 15%.",
        metric: "Conversion Rate, Bounce Rate",
        status: "Data Collection In Progress",
        statusColor: "text-yellow-500"
    },
    {
        name: "Pilot: AI-Generated vs. Human-Written Headlines",
        hypothesis: "AI-generated headlines tailored to user segments will achieve a higher click-through rate (CTR) than a single, human-written headline.",
        metric: "Click-Through Rate (CTR)",
        status: "Results Pending Analysis",
        statusColor: "text-blue-500"
    },
    {
        name: "Pilot: Value-Based vs. Feature-Based Landing Page",
        hypothesis: "A landing page focused on the emotional benefits of a service will convert better than one focused on listing technical features.",
        metric: "Sign-up Rate",
        status: "Completed - Value-based page showed a 22% uplift.",
        statusColor: "text-green-500"
    }
];


export default function ABTestingPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="The Ideas Lab: Where We Test Tomorrow, Together"
        description="We're a relentless idea engine. We test our own bold concepts, and now we're opening our doors to test yours. Explore our active pilots and submit your product for rigorous, data-driven validation."
        icon={<TestTube className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-16 md:space-y-24">
        
        <section>
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl md:text-4xl font-bold font-headline">The Ideas Lab Manifesto</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground">
                    We connect technological dots to build robust, innovative solutions. The Lab is where we pressure-test these ideas before they become full-scale solutions, guided by three core values.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {labValues.map(value => (
                    <Card key={value.title} className="text-center p-6 bg-secondary/30">
                        <div className="flex justify-center mb-4">{value.icon}</div>
                        <CardTitle>{value.title}</CardTitle>
                        <CardContent className="p-0 pt-4">
                            <p className="text-muted-foreground">{value.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/50 -mx-4 px-4 sm:-mx-6 md:-mx-8 sm:px-6 md:px-8 sm:rounded-2xl">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-4xl font-bold font-headline">Have a Product or Idea We Should Test?</h2>
                        <p className="text-md md:text-lg text-muted-foreground">
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
                <h2 className="text-2xl md:text-4xl font-bold font-headline">Live from the Lab: Our Active Pilot Tests</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground">
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
                           <p className={`text-sm font-semibold flex items-center gap-2 ${pilot.statusColor}`}>
                               <CircleDot className="h-4 w-4" />
                               {pilot.status}
                           </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

         <section className="text-center mt-16 md:mt-24 py-12 md:py-16 bg-background rounded-lg px-6">
            <h2 className="text-2xl md:text-4xl font-bold font-headline">The Science Behind the Lab</h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Our Ideas Lab is powered by a robust A/B testing methodology. This is the engine that allows us to move from hypothesis to data-proven insight, reducing the risk of launching new features and getting undeniable proof of what resonates with your audience.
            </p>
            <div className="mt-8 flex justify-center">
                <Button asChild size="lg" variant="outline">
                    <Link href="/solutions">
                        Explore Our Solutions <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}
