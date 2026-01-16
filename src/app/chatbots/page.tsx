
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, CheckCircle, ArrowRight, MessageSquare, Repeat, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseStudyFeature } from '@/components/page-sections/case-study-feature';
import { PageHero } from '@/components/page-sections/page-hero';
import { chatbotServices, chatbotsBenefits } from '@/lib/data/services-data';

export const metadata: Metadata = {
  title: 'AI Agent & Chatbot Development Services',
  description: 'Expert AI agent development for 24/7 engagement. We build intelligent chatbots for websites and WhatsApp to automate support, generate leads, and scale your business in Nigeria.',
};


export default function ChatbotsPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="AI Chatbots & Virtual Assistants"
        description="Engage every customer, 24/7. We design and build intelligent, AI-powered chatbots that integrate seamlessly with your website, WhatsApp, and other platforms. Automate customer service, qualify leads, and drive sales while your team focuses on what matters most."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="space-y-3 pt-4">
                {chatbotsBenefits.map(benefit => (
                    <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{benefit}</span>
                    </div>
                ))}
            </div>
            <Button asChild size="lg" className="mt-4">
              <Link href="/contact">Build Your Chatbot</Link>
            </Button>
          </div>
          <div className="relative h-80 lg:h-96 mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-3 transition-transform duration-300 ease-in-out hover:rotate-0"></div>
            <Card className="absolute inset-2 sm:inset-5 bg-background/80 backdrop-blur-lg rotate-2 transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105 flex flex-col">
                 <CardHeader>
                    <div className="flex justify-center mb-4">
                        <Bot className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                    </div>
                    <CardTitle className="text-center text-fluid-lg">Conversational AI</CardTitle>
                    <CardDescription className="text-center">
                        Your new, AI-powered team member that never sleeps.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-fluid-base">
                    <p>We build chatbots that understand context, show empathy, and solve real problems for your customers.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-fluid-lg">
            <div className="text-center max-w-3xl mx-auto mb-fluid-md">
                <h2 className="text-fluid-xl font-bold font-headline">Our Chatbot Development Services</h2>
                <p className="mt-4 text-fluid-base text-muted-foreground">
                    From simple FAQ bots to complex, integrated virtual assistants, we offer end-to-end development.
                </p>
            </div>
             <div className="grid md:grid-cols-2 gap-8">
                {chatbotServices.map((service) => (
                <Card key={service.title} className="bg-secondary/50 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 md:p-6">
                        <service.icon className="h-8 w-8 text-primary" />
                        <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                        <p className="text-muted-foreground text-sm md:text-base">{service.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>

        <CaseStudyFeature 
            tags={["Chatbot", "AI"]}
            title="Success Stories in Conversational AI"
            description="See how our intelligent chatbots have helped businesses improve customer satisfaction and reduce support overhead."
        />

         <section className="text-center mt-fluid-md py-fluid-md bg-background rounded-lg px-fluid-sm">
            <h2 className="text-fluid-lg font-bold font-headline">Ready to Automate Your Conversations?</h2>
            <p className="mt-4 text-fluid-base text-muted-foreground max-w-2xl mx-auto">
                Let's discuss how a custom chatbot can revolutionize your customer engagement. Schedule a free consultation with our AI experts today.
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
