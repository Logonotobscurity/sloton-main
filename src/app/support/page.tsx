
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LifeBuoy, Search, ArrowRight, Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq } from '@/components/faq';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-sections/page-hero';
import { supportCategories } from '@/lib/data/support-data';

export const metadata: Metadata = {
  title: 'Support Center',
  description: 'Welcome to the LOG_ON Support Center. Find help for our AI agent and workplace automation solutions, or get in touch with our expert support team in Nigeria.',
};

export default function SupportPage() {
  return (
    <div className="bg-background">
      <PageHero 
        title="LOG_ON Support Center"
        description="Welcome! We're here to help you succeed. Find answers, connect with the community, or get in touch with our expert support team."
        icon={<LifeBuoy className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        <section className="py-fluid-lg">
             <div className="verdara-grid verdara-grid-4">
                {supportCategories.map((category) => (
                    <Link key={category.title} href={category.href} className="verdara-card">
                                <h3>{category.title}</h3>
                                <p className="verdara-lede mt-auto pt-3">{category.description}</p>
                    </Link>
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

      </div>
    </div>
  );
}
