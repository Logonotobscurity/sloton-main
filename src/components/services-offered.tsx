
"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
    BrainCircuit,
    Zap,
    Code,
    MessageSquare,
    BarChart3,
    Database,
} from "lucide-react";
import React from 'react';
import { AdinkraBackground } from './ui/adinkra-background';

const services = [
  {
    Icon: BrainCircuit,
    name: "Predictive Growth & Insights",
    description: "Stop guessing, start growing. We use custom AI to analyze your market, forecast trends, and identify the most profitable next steps for your business.",
    href: "/ai-solutions",
    cta: "Explore AI Potential",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Zap,
    name: "Time & Cost Savings (Automation)",
    description: "Do more with less time and fewer errors. We use intelligent automation to handle routine tasks like data entry, compliance, and invoicing.",
    href: "/automation",
    cta: "Calculate Your ROI",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Code,
    name: "Scalable Digital Presence",
    description: "Build the platform you need for tomorrow's success. From high-converting e-commerce sites to custom applications, we ensure your digital storefront can handle 5x user growth without breaking.",
    href: "/web-development",
    cta: "Start Your Relaunch",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: MessageSquare,
    name: "24/7 Customer Engagement",
    description: "Instant service, guaranteed. Deploy AI-powered conversational agents that answer customer questions instantly, reduce support tickets, and nurture leads around the clock.",
    href: "/chatbots",
    cta: "See a Chatbot Demo",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BarChart3,
    name: "Actionable Intelligence",
    description: "Turn mountains of data into clear, simple decisions. We design custom business intelligence dashboards that consolidate your data into visual, actionable insights.",
    href: "/business-analytics",
    cta: "Design My Dashboard",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];


export function ServicesOffered() {
    return (
        <section className="py-16 md:py-24 bg-secondary/20 relative">
            <AdinkraBackground />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                     <p className="text-sm font-normal uppercase tracking-widest text-primary">Our Core Solutions</p>
                    <h2 className="font-headline text-[clamp(1.8rem,5vw,3rem)] font-bold !leading-snug mt-2">
                        Empowering Your Growth: Tools for Every Business Goal
                    </h2>
                    <p className="mt-4 text-md md:text-lg text-muted-foreground">
                       We equip your business with the same powerful tools and comprehensive data used by large corporations—without the big budget. Our solutions are designed to deliver maximum impact, efficiency, and scale.
                    </p>
                </div>
                <BentoGrid className="lg:grid-rows-3 mt-16">
                    {services.map((service) => (
                        <BentoCard key={service.name} {...service} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
