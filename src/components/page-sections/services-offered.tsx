
"use client";

import { AnimatedCodeBackground } from "@/components/ui/animated-code-background";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GlowingCard } from "@/components/ui/glowing-card";
import { GridBackground } from "@/components/ui/grid-background";
import {
    BrainCircuit,
    Zap,
    Code,
    MessageSquare,
    BarChart3,
} from "lucide-react";

const services = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Predictive Growth & Insights",
    description: "Stop guessing, start growing. We use custom AI to analyze your market, forecast trends, and identify the most profitable next steps for your business.",
    href: "/ai-solutions",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Time & Cost Savings",
    description: "Do more with less time and fewer errors. We use intelligent automation to handle routine tasks like data entry, compliance, and invoicing.",
    href: "/automation",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Scalable Digital Presence",
    description: "Build the platform you need for tomorrow's success. From high-converting e-commerce sites to custom applications that handle 5x user growth.",
    href: "/web-development",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "24/7 Customer Engagement",
    description: "Instant service, guaranteed. Deploy AI-powered conversational agents that answer customer questions instantly and reduce support tickets.",
    href: "/chatbots",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Actionable Intelligence",
    description: "Turn mountains of data into clear, simple decisions. We design custom business intelligence dashboards that consolidate your data into visual insights.",
    href: "/business-analytics",
  },
];

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <GlowingCard className={cn(`relative overflow-hidden`, className)}>
      <GridBackground />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </GlowingCard>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <h3 className="text-lg md:text-xl font-semibold text-foreground">
      {children}
    </h3>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className={cn("text-sm text-muted-foreground mt-2")}>
      {children}
    </p>
  );
};

export function ServicesOffered() {
    return (
        <section className="py-fluid-lg bg-background relative overflow-hidden">
      <AnimatedCodeBackground variant="services" density="medium" />
            <div className="container mx-auto px-fluid-sm">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-sm font-normal uppercase tracking-widest text-primary">Our Core Solutions</p>
                    <h2 className="text-fluid-xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium font-headline mt-2">
                        Empowering Your Growth: Tools for Every Business Goal
                    </h2>
                    <p className="text-fluid-base max-w-2xl my-4 mx-auto text-muted-foreground text-center font-normal">
                        We equip your business with the same powerful tools and comprehensive data used by large corporations—without the big budget.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
                    {services.map((service, i) => (
                        <FeatureCard 
                            key={service.title} 
                            className={cn(
                                "border-t border-border/50",
                                i === 0 ? "md:border-l-0" : "md:border-l",
                                i === 1 ? "md:border-l-0" : "",
                                i % 2 !== 0 ? "md:border-l-0" : "md:border-l",
                                "lg:border-l"
                            )}
                        >
                            <div className="flex flex-col h-full p-6">
                                {service.icon}
                                <div className="mt-4">
                                    <FeatureTitle>{service.title}</FeatureTitle>
                                    <FeatureDescription>{service.description}</FeatureDescription>
                                </div>
                            </div>
                        </FeatureCard>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button asChild size="lg">
                        <Link href="/use-cases">Explore All Solutions</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
