"use client";

import { AnimatedCodeBackground } from "@/components/ui/animated-code-background";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GlowingCard } from '@/components/ui/glowing-card';
import { GridBackground } from '@/components/ui/grid-background';
import { Cog, Zap, Clock, TrendingUp, Shield } from 'lucide-react';

const platformFeatures = [
    {
        icon: <Cog className="h-8 w-8 text-primary" />,
        title: "AI-Powered Workflow Designer",
        description: "Describe any business process in plain English. Get a complete, optimized automation plan in seconds with cost and time savings analysis.",
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Instant Deployment",
        description: "From concept to production in days, not months. Our platform handles the complexity so you can focus on results.",
    },
    {
        icon: <Clock className="h-8 w-8 text-primary" />,
        title: "Real-Time Monitoring",
        description: "Track performance, identify bottlenecks, and optimize workflows with live dashboards and intelligent alerts.",
    },
    {
        icon: <TrendingUp className="h-8 w-8 text-primary" />,
        title: "Continuous Optimization",
        description: "Our AI learns from your workflows and suggests improvements to maximize efficiency and reduce costs over time.",
    },
    {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: "Enterprise Security",
        description: "Bank-level encryption, compliance-ready architecture, and complete data sovereignty for your peace of mind.",
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

export function SmarterAutomation() {
  return (
    <section className="py-fluid-lg bg-background relative overflow-hidden">
      <AnimatedCodeBackground variant="automation" density="medium" />
      <div className="container mx-auto px-fluid-sm">
        <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-normal uppercase tracking-widest text-primary">03/ Our Platform</p>
            <h2 className="text-fluid-xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium font-headline mt-2">
              The Fastest Path to Automation
            </h2>
            <p className="text-fluid-base max-w-2xl my-4 mx-auto text-muted-foreground text-center font-normal">
              Describe any business process in plain English. Get a complete, optimized automation plan in seconds—showing exactly how to reduce costs and save time.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {platformFeatures.map((feature, i) => (
                <FeatureCard 
                    key={feature.title} 
                    className={cn(
                        "border-t border-border/50",
                        i === 0 ? "md:border-l-0" : "md:border-l",
                        i === 1 ? "md:border-l-0" : "",
                        i % 2 !== 0 ? "md:border-l-0" : "md:border-l",
                        "lg:border-l"
                    )}
                >
                    <div className="flex flex-col h-full p-6">
                        {feature.icon}
                        <div className="mt-4">
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                        </div>
                    </div>
                </FeatureCard>
            ))}
        </div>

        <div className="mt-16 text-center">
            <Button asChild size="lg">
                <Link href="/automation">Explore All Templates</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}