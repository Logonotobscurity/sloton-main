import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';
import { TallyEmbed } from '@/components/tally-embed';
import { Mail, Phone, Handshake } from 'lucide-react';
import Faq from '@/components/faq';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { generateMetadata, KEYWORD_SETS, LocalBusinessSchema } from '@/lib/seo';
import { PageHero } from '@/components/page-sections/page-hero';
import { contactReasons } from '@/lib/data/services-data';

export const metadata = generateMetadata({
  title: 'Contact LOG_ON | AI Agent Development & Automation Experts in Nigeria',
  description: 'Contact LOG_ON to start your AI agent development or workplace automation project in Nigeria. Our experts in Lagos are ready to help you transform your business with intelligent technology. Schedule a free consultation today.',
  keywords: [
    ...KEYWORD_SETS.ai,
    ...KEYWORD_SETS.automation,
    'contact AI company Nigeria',
    'AI consultation Lagos',
    'automation experts Nigeria',
    'technology consulting Lagos',
    'AI project inquiry',
  ],
  canonical: '/contact',
});

export default function ContactPage() {
  return (
    <div className="relative bg-background min-h-screen">
        <LocalBusinessSchema />
        <PageHero 
            visual="/images/marks/hero-contact.svg"
            kicker="Contact"
            title="Get In Touch"
            description="We're here to help you navigate your digital transformation journey. Whether you have a specific project in mind, a question about our services, or just want to explore possibilities, our team is ready to connect. Let's start a conversation and build something great together."
        />
      <div className="verdara-section">
      <div className="container mx-auto px-5 lg:px-10 py-16">
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
           <div className="space-y-8">
              <article className="verdara-card">
                  <p className="verdara-kicker">Tally</p>
                  <h2 className="verdara-title mt-2 text-[1.75rem]">Book a <em>conversation</em></h2>
                  <p className="verdara-lede mt-2">Primary intake via Tally. We reply from logonthepage@gmail.com.</p>
                  <div className="mt-4">
                  <TallyEmbed />
                  </div>
              </article>
              <details className="verdara-card">
                <summary className="cursor-pointer font-semibold min-h-11 flex items-center">
                  Email fallback — if the hosted form does not load
                </summary>
                <p className="verdara-lede mt-2">
                  Send the same details here. We reply from logonthepage@gmail.com.
                </p>
                <div className="mt-4">
                  <Suspense fallback={<p className="verdara-lede">Loading form…</p>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </details>
               <div>
                 <h3 className="verdara-title text-[1.5rem]">Why get in <em>touch</em>?</h3>
                 <div className="verdara-grid verdara-grid-2 mt-4">
                    {contactReasons.map(reason => (
                        <article key={reason.title} className="verdara-card verdara-card-compact">
                                <h3 className="text-base">{reason.title}</h3>
                                <p className="verdara-lede mt-2">{reason.description}</p>
                        </article>
                    ))}
                 </div>
            </div>
           </div>

          <div className="space-y-4">
             <article className="verdara-card verdara-card-compact">
                    <h3>Email</h3>
                    <p className="verdara-lede mt-2">Our inbox is always open for your questions and project details.</p>
                    <a href="mailto:logonthepage@gmail.com" className="mt-2 inline-block font-semibold underline-offset-4 hover:underline break-all">
                        logonthepage@gmail.com
                    </a>
             </article>
             <article className="verdara-card verdara-card-compact">
                    <h3>Phone</h3>
                    <p className="verdara-lede mt-2">Give us a call to discuss your needs directly with a consultant.</p>
                    <a href="tel:+2348143066320" className="mt-2 inline-block font-semibold underline-offset-4 hover:underline">
                        +234 814 306 6320
                    </a>
             </article>
             <article className="verdara-card">
                        <h3>Partnership opportunities</h3>
                        <p className="verdara-lede mt-2">Interested in partnering with LOG_ON? We'd love to hear from you.</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/contact?subject=Partnership+Inquiry">
                        Contact Partner Team
                    </Link>
                  </Button>
              </article>
          </div>
        </div>
      </div>
      </div>
      <Faq />
    </div>
  );
}
