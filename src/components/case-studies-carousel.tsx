
"use client";

import * as React from "react";
import Image from "next/image";
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
import { caseStudies as allCaseStudies } from "@/lib/case-studies";
import { CaseStudy } from "@/lib/case-studies";
import { getConfig } from "@/config";

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
          delay: getConfig().ui.carouselDelay,
          stopOnInteraction: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {caseStudies.map((study, index) => (
          <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
            <div className="p-1">
              <Card className="overflow-hidden bg-background/80 group">
                <div className="overflow-hidden rounded-t-xl" >
                    <div data-ai-hint={study.dataAiHint}>
                      <Image
                      src={study.image}
                      alt={study.title}
                      width={study.width}
                      height={study.height}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                </div>
                <CardHeader>
                  <CardDescription>{study.client}</CardDescription>
                  <CardTitle className="text-lg md:text-xl">{study.title}</CardTitle>
                </CardHeader>
                <CardContent>
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
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
