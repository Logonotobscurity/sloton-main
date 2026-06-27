
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GlowingCard } from "@/components/ui/glowing-card";
import { GridBackground } from "@/components/ui/grid-background";
import { GraduationCap, Users, Heart, Lightbulb, Award, Globe } from "lucide-react";

const communityFeatures = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Practical AI Training",
    description: "Learn actionable skills you can implement immediately. From AI fundamentals to advanced automation strategies for real business impact.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Developer Community",
    description: "Join a growing network of Nigerian developers, entrepreneurs, and innovators building the future of AI in Africa.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Mental Health Support",
    description: "Making mental health resources more accessible through AI-powered tools that understand local context and cultural nuances.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Innovation Projects",
    description: "Collaborate on open-source projects that solve real problems in Nigerian communities, from healthcare to education.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Certification Programs",
    description: "Earn industry-recognized certifications in AI, automation, and digital transformation to advance your career.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Cultural AI Development",
    description: "Building AI systems that understand and respect diverse Nigerian cultures, languages, and traditions.",
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

export function TrainingCTA() {
  return (
    <section className="py-fluid-lg bg-background relative overflow-hidden">
      <div className="container mx-auto px-fluid-sm">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-normal uppercase tracking-widest text-primary">04/ Community & Learning</p>
          <h2 className="text-fluid-xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium font-headline mt-2">
            Building <span className="text-primary">Skills</span> for Practical Impact
          </h2>
          <p className="text-fluid-base max-w-2xl my-4 mx-auto text-muted-foreground text-center font-normal">
            We believe in building more than just technology. We're dedicated to building skills, fostering leadership, and making a positive community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {communityFeatures.map((feature, i) => (
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
            <Link href="/training">Explore Training Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
