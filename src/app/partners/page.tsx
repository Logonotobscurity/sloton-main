
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Handshake, Network, Scaling, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TechStackCarousel } from '@/components/tech-stack-carousel';
import { GlowingCard } from '@/components/ui/glowing-card';
import Image from 'next/image';
import { PageHero } from '@/components/page-hero';
import { BottomCta } from '@/components/bottom-cta';

export const metadata: Metadata = {
  title: 'LOG_ON Partner Ecosystem',
  description: 'Join the LOG_ON Partner Network. Collaborate with us to deliver innovative AI and automation solutions, drive customer success, and grow your business.',
};

const partnerBenefits = [
  {
    icon: <Scaling className="h-8 w-8 text-primary" />,
    title: 'Expand Your Market Reach',
    description: 'Leverage the LOG_ON brand and our global customer base to tap into new markets and opportunities. Co-market with us to generate leads and increase your visibility.',
  },
  {
    icon: <Network className="h-8 w-8 text-primary" />,
    title: 'Enhance Your Service Offerings',
    description: "Integrate our AI and automation platform into your portfolio to deliver more value to your clients. Get access to our APIs, developer tools, and technical support.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: 'Drive Mutual Growth',
    description: 'Our partner program is built on a foundation of mutual success. We invest in our partners with training, resources, and a dedicated support team to ensure you thrive.',
  },
];

const partners = [
    { name: "Google Cloud Partner", logo: "https://img.icons8.com/color/96/google-cloud.png", dataAiHint: "Google Cloud logo" },
    { name: "AWS Partner", logo: "https://img.icons8.com/color/96/amazon-web-services.png", dataAiHint: "AWS logo" },
    { name: "Microsoft Partner", logo: "https://img.icons8.com/color/96/azure-storage-explorer.png", dataAiHint: "Microsoft Azure logo" },
    { name: "Vercel Partner", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nextjs-icon.svg", dataAiHint: "Vercel logo" },
];

export default function PartnersPage() {
  return (
    <div className="bg-background">
      <PageHero
        title="Join the LOG_ON Partner Network"
        description="At LOG_ON, we believe that collaboration is the key to innovation. Our partner ecosystem brings together technology leaders, solution providers, and system integrators to deliver exceptional value to customers worldwide. By joining our network, you become part of a community dedicated to solving complex challenges with the power of AI and automation."
      />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <h2 className="text-3xl md:text-5xl font-bold font-headline">A Partnership Built for Growth</h2>
            <p className="text-md md:text-lg text-muted-foreground">
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
                    <CardTitle className="text-center text-2xl md:text-3xl">Stronger Together</CardTitle>
                    <CardDescription className="text-center">
                        Driving innovation through strategic alliances.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm md:text-base">
                    <p>Our partners are an extension of our team, integral to our mission of powering business efficiency with smart technology.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-bold font-headline">Why Partner with LOG_ON?</h2>
                <p className="mt-4 text-md md:text-lg text-muted-foreground">
                    We are committed to building mutually beneficial relationships that foster growth, innovation, and customer success.
                </p>
            </div>
             <div className="grid md:grid-cols-3 gap-8">
                {partnerBenefits.map((service) => (
                <GlowingCard key={service.title}>
                  <div className="p-6 h-full text-center">
                    <CardHeader className="p-0 items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {service.icon}
                        </div>
                        <CardTitle className="pt-4 text-lg md:text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                        <p className="text-muted-foreground text-sm md:text-base">{service.description}</p>
                    </CardContent>
                  </div>
                </GlowingCard>
                ))}
            </div>
        </section>
        
        <section className="py-16 md:py-24 bg-secondary/20 -mx-4 px-4 sm:mx-0 sm:px-8 sm:rounded-lg">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold font-headline">Our Technology & Strategic Alliances</h2>
                    <p className="mt-4 text-md md:text-lg text-muted-foreground">We build on and partner with the best-in-class platforms to ensure our solutions are robust, scalable, and secure.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 items-center justify-center">
                    {partners.map(partner => (
                        <div key={partner.name} className="flex flex-col items-center gap-3" title={partner.name}>
                            <div data-ai-hint={partner.dataAiHint}>
                                <Image 
                                    src={partner.logo} 
                                    alt={partner.name}
                                    width={48}
                                    height={48}
                                    className="h-12 w-auto"
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
