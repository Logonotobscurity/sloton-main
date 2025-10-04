
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LifeBuoy, Book, Users, MessageSquare, Search, ArrowRight, Lightbulb, Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq } from '@/components/faq';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Support Center | LOG_ON',
  description: 'Welcome to the LOG_ON Support Center. Find help articles, product documentation, get in touch with our support team, and explore community resources.',
};

const supportCategories = [
  {
    icon: <Book className="h-8 w-8 text-primary" />,
    title: 'Knowledge Base',
    description: 'Find detailed articles, how-to guides, and product documentation to get the most out of our platform.',
    href: '/insights',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Community Forums',
    description: 'Connect with other LOG_ON users, ask questions, and share best practices and solutions.',
    href: '#',
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: 'Submit a Ticket',
    description: 'Can\'t find what you\'re looking for? Our support team is here to help. Submit a ticket for personalized assistance.',
    href: '/contact',
  },
   {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Training & Certification',
    description: 'Advance your skills with our expert-led training programs and become a certified LOG_ON professional.',
    href: '/training',
  },
];

export default function SupportPage() {
  return (
    <div className="bg-background">
      <PageHero 
        title="LOG_ON Support Center"
        description="Welcome! We're here to help you succeed. Find answers, connect with the community, or get in touch with our expert support team."
        icon={<LifeBuoy className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
      >
        <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search our knowledge base..."
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-secondary/50 border-border/50 shadow-sm"
            />
        </div>
      </PageHero>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="py-16 md:py-24">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {supportCategories.map((category) => (
                <GlowingCard key={category.title}>
                    <Link href={category.href} className="block h-full">
                        <div className="p-6 h-full flex flex-col">
                            <CardHeader className="p-0">
                                {category.icon}
                                <CardTitle className="pt-4 text-lg md:text-xl">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 pt-4 flex-grow">
                                <p className="text-muted-foreground text-sm md:text-base">{category.description}</p>
                            </CardContent>
                             <CardContent className="p-0 pt-4 mt-auto">
                                <div className="text-primary font-semibold flex items-center group-hover:text-accent-gold transition-colors">
                                    Go to {category.title} <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </CardContent>
                        </div>
                    </Link>
                </GlowingCard>
                ))}
            </div>
        </section>
        
        <section className="grid md:grid-cols-2 gap-8 items-start">
             <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Email Us</h3>
                        <p className="text-muted-foreground">For general inquiries, support questions, or project details, our inbox is always open.</p>
                        <a href="mailto:logonthepage@gmail.com" className="text-primary hover:underline break-all">
                            logonthepage@gmail.com
                        </a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Call Us</h3>
                        <p className="text-muted-foreground">Give us a call to discuss your needs directly with a technology consultant.</p>
                        <a href="tel:+2348143066320" className="text-primary hover:underline">
                            +234 814 306 6320
                        </a>
                    </div>
                </div>
            </div>
            <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle>Can't find an answer?</CardTitle>
                  <CardDescription>Our team is ready to help. Submit a ticket and we'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/contact">
                      Submit a Support Ticket
                    </Link>
                  </Button>
                </CardContent>
              </Card>
        </section>

        <div className="mt-16">
            <Faq />
        </div>

      </div>
    </div>
  );
}
