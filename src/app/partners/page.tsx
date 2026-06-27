
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Handshake } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PageHero } from '@/components/page-sections/page-hero';
import { BottomCta } from '@/components/page-sections/bottom-cta';
import { partnerBenefits, partners } from '@/lib/data/partners-data';
import { LogoImage } from '@/lib/image-utils';

export const metadata: Metadata = {
  title: 'AI & Automation Partner Ecosystem',
  description: 'Join the LOG_ON Solutions Partner Network. Collaborate with us to deliver innovative AI agent development and workplace automation solutions, drive customer success, and grow your business.',
};

export default function PartnersPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="Join the LOG_ON Solutions Partner Network"
        description="At LOG_ON Solutions, we believe that collaboration is the key to innovation. Our partner ecosystem brings together technology leaders, solution providers, and system integrators to deliver exceptional value to customers worldwide. By joining our network, you become part of a community dedicated to solving complex challenges with the power of AI and automation."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <h2 className="text-fluid-xl font-bold font-headline">A Partnership Built for Growth</h2>
            <p className="text-fluid-base text-muted-foreground">
              Our partner program is designed to be a two-way street. We provide you with the tools, resources, and support you need to succeed, and in turn, your expertise helps us deliver better solutions to our customers.
            </p>
            <Button asChild size="lg">
              <Link href="/contact?subject=Partnership+Inquiry">Become a Partner</Link>
            </Button>
          </div>
          <div className="relative h-80 lg:h-96 mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-3 transition-transform duration-300 ease-in-out hover:rotate-0"></div>
            <Card className="absolute inset-2 sm:inset-5 bg-background/80 backdrop-blur-lg rotate-2 transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105">
                 <CardHeader>
                    <div className="flex justify-center mb-4">
                        <Handshake className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                    </div>
                    <CardTitle className="text-center text-fluid-lg">Stronger Together</CardTitle>
                    <CardDescription className="text-center">
                        Driving innovation through strategic alliances.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-fluid-base">
                    <p>Our partners are an extension of our team, integral to our mission of powering business efficiency with smart technology.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-fluid-lg">
            <div className="text-center max-w-3xl mx-auto mb-fluid-md">
                <h2 className="text-fluid-xl font-bold font-headline">Why Partner with LOG_ON Solutions?</h2>
                <p className="mt-4 text-fluid-base text-muted-foreground">
                    We are committed to building mutually beneficial relationships that foster growth, innovation, and customer success.
                </p>
            </div>
             <div className="grid md:grid-cols-3 gap-8">
                {partnerBenefits.map((benefit) => (
                <GlowingCard key={benefit.title}>
                  <div className="p-6 h-full text-center">
                    <CardHeader className="p-0 items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <benefit.icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="pt-4 text-lg md:text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                        <p className="text-muted-foreground text-sm md:text-base">{benefit.description}</p>
                    </CardContent>
                  </div>
                </GlowingCard>
                ))}
            </div>
        </section>
        
        <section className="py-fluid-lg bg-secondary/20 -mx-fluid-sm px-fluid-sm sm:mx-0 sm:px-8 sm:rounded-lg">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-fluid-xl font-bold font-headline">Our Technology & Strategic Alliances</h2>
                    <p className="mt-4 text-fluid-base text-muted-foreground">We build on and partner with the best-in-class platforms to ensure our solutions are robust, scalable, and secure.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 items-center justify-center">
                    {partners.map(partner => (
                        <div key={partner.name} className="flex flex-col items-center gap-3" title={partner.name}>
                            <div data-ai-hint={partner.dataAiHint}>
                                <LogoImage 
                                    src={partner.logo} 
                                    alt={partner.name}
                                    size="lg"
                                />
                            </div>
                            <span className="text-base font-semibold">{partner.name}</span>
                        </div>
                    ))}
                    <div className="flex flex-col items-center gap-3" title="Cybersecurity & Compliance">
                        <ShieldCheck className="h-12 w-12 text-primary" />
                        <span className="text-base font-semibold">Security & Compliance</span>
                    </div>
                </div>
            </div>
        </section>

      </div>
       <BottomCta />
    </div>
  );
}
