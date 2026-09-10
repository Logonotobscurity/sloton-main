"use client"

import { caseStudies as allCaseStudies } from "@/lib/data/case-studies";
import { CaseStudiesCarousel } from "@/components/case-studies-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";
import { AnimatedCodeBackground } from "@/components/ui/animated-code-background";

interface CaseStudyFeatureProps {
  tags: string[];
  title: string;
  description: string;
  showDesignProcess?: boolean;
}

export function CaseStudyFeature({ tags, title, description, showDesignProcess = false }: CaseStudyFeatureProps) {
  const featuredStudies = React.useMemo(() => {
    return allCaseStudies.filter(study => 
      tags.some(tag => study.tags.includes(tag))
    );
  }, [tags]);

  if (featuredStudies.length === 0) {
    return null; // Don't render anything if no relevant case studies are found
  }

  return (
    <section className="verdara-section py-16 md:py-24 -mx-4 px-4 sm:mx-0 sm:rounded-[26px] sm:px-0">
      <AnimatedCodeBackground variant="default" density="low" />
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto mb-12 md:mb-16">
                <p className="verdara-kicker">Proof</p>
                <h2 className="verdara-title mt-2">{title}</h2>
                <p className="verdara-lede mt-4">
                    {description}
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <CaseStudiesCarousel studies={featuredStudies} showDesignProcess={showDesignProcess} />
            </div>
             <div className="mt-16 text-center">
                <Button asChild>
                    <Link href="/use-cases">
                        Explore All Use Cases <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    </section>
  );
}