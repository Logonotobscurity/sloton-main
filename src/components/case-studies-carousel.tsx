
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "./ui/badge";
import { caseStudies as allCaseStudies } from "@/lib/data/case-studies";
import { CaseStudy } from "@/lib/data/case-studies";
import { CardImage } from "@/lib/image-utils";

interface CaseStudiesCarouselProps {
  studies?: CaseStudy[];
}

export function CaseStudiesCarousel({ studies }: CaseStudiesCarouselProps) {
  const caseStudies = studies || allCaseStudies;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      className="w-full"
      aria-label="Case Studies Carousel"
    >
      <CarouselContent>
        {caseStudies.map((study, index) => (
          <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
            <div className="p-1 h-full">
              <Card className="overflow-hidden bg-background/80 group h-full flex flex-col">
                <CardImage
                  src={study.image}
                  alt={study.title}
                  width={study.width}
                  height={study.height}
                  dataAiHint={study.dataAiHint}
                />
                <CardHeader>
                  <CardDescription>{study.client}</CardDescription>
                  <CardTitle className="text-lg md:text-xl">{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{study.description}</p>
                   <div className="flex flex-wrap gap-2">
                    {study.tags.map(tag => <Badge key={tag} variant="outline" className="border-primary text-primary">{tag}</Badge>)}
                   </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" aria-label="Previous study" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" aria-label="Next study" />
    </Carousel>
  );
}
