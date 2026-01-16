
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, Handshake } from 'lucide-react';
import type { Metadata } from 'next';
import { Faq } from '@/components/faq';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/page-sections/page-hero';
import { contactReasons } from '@/lib/data/services-data';

export const metadata: Metadata = {
  title: 'Contact Us | AI Agent Development & Automation in Nigeria',
  description: "Contact LOG_ON to start your project in AI agent development or workplace automation. Our experts in Nigeria are ready to help you put AI to work. Let's talk.",
};

export default function ContactPage() {
  return (
    <div className="bg-background">
        <PageHero 
            title="Get In Touch"
            description="We're here to help you navigate your digital transformation journey. Whether you have a specific project in mind, a question about our services, or just want to explore possibilities, our team is ready to connect. Let's start a conversation and build something great together."
        />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        
        <div className="mt-12 md:mt-16 grid lg:grid-cols-2 gap-12 items-start">
           <div className="space-y-8">
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
               <div className="border-t border-border pt-8">
                 <h3 className="text-xl font-semibold mb-4">Why Get In Touch?</h3>
                 <div className="space-y-4">
                    {contactReasons.map(reason => (
                        <div key={reason.title} className="flex items-start gap-3">
                            <div className="flex-shrink-0 pt-1"><reason.icon /></div>
                            <div>
                                <h4 className="font-semibold">{reason.title}</h4>
                                <p className="text-muted-foreground text-sm">{reason.description}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
           </div>

          <div className="space-y-8">
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <p className="text-muted-foreground">Our inbox is always open for your questions and project details.</p>
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
                    <h3 className="text-xl font-semibold">Phone</h3>
                    <p className="text-muted-foreground">Give us a call to discuss your needs directly with a consultant.</p>
                    <a href="tel:+2348143066320" className="text-primary hover:underline">
                        +234 814 306 6320
                    </a>
                </div>
            </div>
             <Card className="bg-secondary/50">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Handshake className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Partnership Opportunities</CardTitle>
                        <CardDescription>Interested in partnering with LOG_ON? We'd love to hear from you.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <Link href="/contact?subject=Partnership+Inquiry">
                        Contact Partner Team
                    </Link>
                  </Button>
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
