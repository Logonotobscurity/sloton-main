
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { Briefcase, HeartPulse, Server, ShoppingCart, Building, Cog } from "lucide-react";
import { GlowingCard } from "./ui/glowing-card";

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <GlowingCard className={cn(`relative overflow-hidden`, className)}>
      {children}
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
    <p
      className={cn(
        "text-sm text-muted-foreground mt-2",
      )}
    >
      {children}
    </p>
  );
};

const features = [
    {
      title: "Finance & Banking",
      description: "Stop fraud faster and automate compliance tasks that consume valuable resources.",
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      className: "lg:col-span-2",
    },
    {
      title: "Healthcare",
      description: "Secure systems that protect patient data while reducing administrative overhead.",
      icon: <HeartPulse className="w-8 h-8 text-primary" />,
      className: "lg:col-span-1",
    },
     {
      title: "IT Consulting",
      description: "Automation strategy, custom AI model development, and cloud optimization.",
      icon: <Cog className="w-8 h-8 text-primary" />,
      className: "lg:col-span-1",
    },
    {
      title: "E-Commerce",
      description: "AI that recommends products customers want to buy, plus automated support that never sleeps.",
      icon: <ShoppingCart className="w-8 h-8 text-primary" />,
      className: "lg:col-span-1",
    },
    {
      title: "IT & Logistics",
      description: "Intelligent automation for route planning, warehouse management, and shipment tracking.",
      icon: <Server className="w-8 h-8 text-primary" />,
      className: "lg:col-span-2",
    },
     {
      title: "Real Estate",
      description: "AI assistants that qualify leads and handle inquiries 24/7, maximizing conversion opportunities.",
      icon: <Building className="w-8 h-8 text-primary" />,
      className: "lg:col-span-1",
    },
];

export function IndustriesBento() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div 
          role="presentation"
          className="absolute inset-0 -z-10 bg-grid-light dark:bg-grid-dark bg-[size:32px_32px] opacity-20"
        />
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium font-headline">
            Solutions For Your Industry
          </h2>
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-muted-foreground text-center font-normal">
            We combine deep industry knowledge with technological expertise to build solutions that address the unique challenges of your sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} className={cn(feature.className, "border-t border-border/50",
                i === 0 ? "md:border-l-0" : "md:border-l",
                i === 1 ? "md:border-l-0" : "",
                i % 2 !== 0 ? "md:border-l-0" : "md:border-l",
                "lg:border-l"
            )}>
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
            <Link href="/use-cases">Explore All Use Cases</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
