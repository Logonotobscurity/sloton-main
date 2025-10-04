
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, CheckCircle, ArrowRight, MessageSquare, Repeat, Users } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseStudyFeature } from '@/components/case-study-feature';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'AI Chatbot Development Services | LOG_ON',
  description: 'Engage customers 24/7 with intelligent, AI-powered chatbots for your website and WhatsApp. We build and develop chatbot solutions that automate support and generate leads.',
};

const chatbotServices = [
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: 'Website & App Integration',
    description: 'We deploy intelligent chatbots directly onto your website or mobile app, providing instant answers to user questions, guiding them through your services, and capturing leads before they leave your site.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'WhatsApp & Social Media Bots',
    description: 'Meet your customers where they are. We build and integrate conversational AI agents for WhatsApp, Facebook Messenger, and other social platforms to automate sales, support, and marketing interactions.',
  },
  {
    icon: <Repeat className="h-8 w-8 text-primary" />,
    title: 'Backend System Integration',
    description: 'Our chatbots do more than just talk. We integrate them with your CRM, databases, and other backend systems to perform actions like checking order statuses, booking appointments, and retrieving customer data.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Automated Lead Qualification',
    description: 'Use chatbots to automatically qualify leads by asking targeted questions. Your sales team receives only the most promising prospects, complete with all the information they need to close the deal.',
  },
];

const benefits = [
    "Increase lead generation by engaging every website visitor",
    "Reduce customer support costs by up to 30%",
    "Improve customer satisfaction with 24/7 instant responses",
    "Automate sales and booking processes",
    "Free up your human agents for high-value interactions"
]

export default function ChatbotsPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="AI Chatbots & Virtual Assistants"
        description="Engage every customer, 24/7. We design and build intelligent, AI-powered chatbots that integrate seamlessly with your website, WhatsApp, and other platforms. Automate customer service, qualify leads, and drive sales while your team focuses on what matters most."
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="space-y-3 pt-4">
                {benefits.map(benefit => (
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
            <Card className="absolute inset-2 sm:inset-5 bg-background/80 backdrop-blur-lg rotate-2 transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105">
                 <CardHeader>
                    <div className="flex justify-center mb-4">
                        <Bot className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                    </div>
                    <CardTitle className="text-center text-2xl md:text-3xl">Conversational AI</CardTitle>
                    <CardDescription className="text-center">
                        Your new, AI-powered team member that never sleeps.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm md:text-base">
                    <p>We build chatbots that understand context, show empathy, and solve real problems for your customers.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-bold font-headline">Our Chatbot Development Services</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground">
                    From simple FAQ bots to complex, integrated virtual assistants, we offer end-to-end development.
                </p>
            </div>
             <div className="grid md:grid-cols-2 gap-8">
                {chatbotServices.map((service) => (
                <Card key={service.title} className="bg-secondary/50 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 md:p-6">
                        {service.icon}
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

         <section className="text-center mt-16 md:mt-24 py-12 md:py-16 bg-background rounded-lg px-4">
            <h2 className="text-2xl md:text-4xl font-bold font-headline">Ready to Automate Your Conversations?</h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
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
