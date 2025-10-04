
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, PenTool, ShoppingCart, Building, Users } from 'lucide-react';
import type { Metadata } from 'next';
import { CaseStudyFeature } from '@/components/case-study-feature';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Custom Web & Application Development | Next.js Experts',
  description: 'Custom web development for publishers, e-commerce, and corporate clients. We build scalable, secure, and optimized digital platforms using Next.js and React to help your business grow.',
};

const services = [
    {
        icon: <PenTool className="h-8 w-8 text-primary" />,
        title: "Websites for Publishers",
        description: "We partner with online magazines and blogs to deliver robust publishing platforms built for reliability and performance. From relaunches to SEO-driven growth strategies and monetization, we work closely with your editorial teams to fully understand their workflows and expectations. Thanks to VIP hosting and optimization, our clients have supported up to 100k concurrent visitors without disruption. Whether you’re an experienced publisher or just starting, we offer free consultations to make your online publishing more profitable and manageable."
    },
    {
        icon: <ShoppingCart className="h-8 w-8 text-primary" />,
        title: "eCommerce Solutions",
        description: "Selling products online requires more than a simple website—it demands a comprehensive and scalable e-commerce infrastructure. Our team integrates with top payment services like Paystack, Flutterwave, Stripe, PayPal, Mollie, and Klarna, alongside reliable delivery providers such as DHL, UPS, and DPD—covering local and international markets. No existing integration? No problem. We develop custom solutions tailored to your logistics and payment needs, ensuring your store runs smoothly and securely. From product presentation and order management to conversion rate optimization, consider us your trusted e-commerce partner."
    },
    {
        icon: <Building className="h-8 w-8 text-primary" />,
        title: "Corporate Websites",
        description: "Your company's digital presence is essential for telling your story and establishing trust. We build corporate websites that highlight your brand’s history, values, governance, and human resources policies—all while ensuring a seamless online experience. Having helped many brands elevate their profiles, we offer strategic advice on where to invest your digital budget for maximum impact."
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Job Portals, Forums & Listing Platforms",
        description: "Web development has evolved far beyond blogs. As seasoned experts, we create complex portals and directory websites tailored to your unique business needs. From job listing platforms with over 100,000 ads aggregated from multiple sources to community forums and company intranets, we use flexible, scalable technology to support your ambitions."
    }
];

export default function WebDevelopmentPage() {
  return (
    <div className="bg-background">
        <PageHero
            title="Web & Custom Development"
            description="We specialize in crafting custom web projects tailored to your specific business needs. Drawing on our deep experience in IT solutions and AI automation, we build scalable, secure, and optimized digital platforms designed to help you grow."
            icon={<Code className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
        />
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="py-16 md:py-24">
             <div className="grid md:grid-cols-2 gap-8">
                {services.map((service) => (
                <Card key={service.title} className="bg-secondary/50 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {service.icon}
                        <CardTitle className="text-lg md:text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm md:text-base">{service.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>

        <CaseStudyFeature 
            tags={["Web Development", "Next.js", "Publisher"]}
            title="Our Web Development Work"
            description="See how our custom web development solutions have helped businesses launch high-performance platforms that drive revenue and engagement."
        />

         <section className="text-center mt-16 md:mt-24 py-12 md:py-16 bg-background rounded-lg px-4">
            <h2 className="text-2xl md:text-4xl font-bold font-headline">Have a Project in Mind?</h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're an established publisher, a growing e-commerce brand, or a corporation looking to enhance your digital presence, we're here to help.
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
