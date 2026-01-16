
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { GlowingCard } from "./ui/glowing-card";
import { industryFeatures } from "@/lib/data/industries";

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
          {industryFeatures.map((feature, i) => (
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
