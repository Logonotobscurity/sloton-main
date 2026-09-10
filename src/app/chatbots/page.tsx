
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, CheckCircle, ArrowRight, MessageSquare, Repeat, Users } from 'lucide-react';
import Link from 'next/link';
import { CaseStudyFeature } from '@/components/page-sections/case-study-feature';
import { PageHero } from '@/components/page-sections/page-hero';
import { chatbotServices, chatbotsBenefits } from '@/lib/data/services-data';
import { generateMetadata, KEYWORD_SETS, JsonLd, generateServiceSchema, BreadcrumbSchema } from '@/lib/seo';
import { ServiceConceptBlock } from '@/components/service-concept-block';

export const metadata = generateMetadata({
  title: 'AI Chatbot & WhatsApp Bot Development in Nigeria | 24/7 Automation',
  description: 'Build intelligent AI chatbots and WhatsApp bots for your Nigerian business. LOG_ON designs and deploys conversational AI agents that automate customer support, generate leads, and drive sales around the clock. Based in Lagos, serving all of Nigeria and Africa.',
  keywords: [
    ...KEYWORD_SETS.ai,
    'AI chatbot Nigeria',
    'WhatsApp bot Nigeria',
    'chatbot development Lagos',
    'conversational AI Nigeria',
    'customer support automation',
    'lead generation chatbot',
    'AI virtual assistant Nigeria',
  ],
  canonical: 'https://logonai.netlify.app/chatbots',
});

const chatbotServiceSchema = generateServiceSchema({
  name: 'AI Chatbot & Virtual Assistant Development',
  description: 'We design and build intelligent AI chatbots that integrate with your website, WhatsApp, and other platforms to automate customer service, qualify leads, and drive sales 24/7.',
  url: 'https://logonai.netlify.app/chatbots',
  provider: 'LOG_ON',
  areaServed: 'Nigeria',
});


export default function ChatbotsPage() {
  return (
    <div className="bg-background">
      <JsonLd data={chatbotServiceSchema} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://logonai.netlify.app' },
        { name: 'AI Chatbots', url: 'https://logonai.netlify.app/chatbots' },
      ]} />
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

        <section className="verdara-section -mx-fluid-sm px-5 py-16">
            <p className="verdara-kicker">Conversational</p>
            <h2 className="verdara-title mt-2">Chatbot development <em>services</em></h2>
            <p className="verdara-lede mt-4">
                    From simple FAQ bots to complex, integrated virtual assistants, we offer end-to-end development.
            </p>
             <div className="verdara-grid verdara-grid-2 mt-10">
                {chatbotServices.map((service) => (
                <article key={service.title} className="verdara-card">
                    <span className="verdara-tag verdara-tag-sky">Bot</span>
                    <h3 className="mt-4">{service.title}</h3>
                    <p className="verdara-lede mt-auto pt-3">{service.description}</p>
                </article>
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
                Let's discuss how a custom AI chatbot can transform your customer engagement in Nigeria and beyond. Schedule a free consultation today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                <Button asChild size="lg">
                    <Link href="/contact">
                        Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/ai-solutions">Explore AI Solutions</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/automation">See Automation Services</Link>
                </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
                Read our <Link href="/insights" className="text-primary underline hover:no-underline">AI insights</Link> or explore <Link href="/use-cases" className="text-primary underline hover:no-underline">industry use cases</Link>.
            </p>
        </section>

        <ServiceConceptBlock path="/chatbots" />

      </div>
    </div>
  );
}
