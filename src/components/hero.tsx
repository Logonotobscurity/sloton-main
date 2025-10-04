
"use client";

import React from "react";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SolutionRecommendationForm } from "./solution-recommendation-form";
import { AdinkraBackground } from "./ui/adinkra-background";
 
export function Hero() {

  return (
    <div className="relative min-h-[90vh] w-full flex items-center overflow-hidden">
        <AdinkraBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-20">
             <div className="absolute -bottom-1/3 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -top-1/3 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-3xl" />
            <div className="max-w-4xl mx-auto text-center animate-[fade-in_1s_ease-in-out]">
                <p className="text-sm font-normal uppercase tracking-widest text-primary">
                    Connecting Advantages. Delivering Results.
                </p>
                <h1 className="font-headline text-[clamp(2.5rem,8vw,5rem)] !leading-tight my-4">
                    Do More with Less: <span className="text-primary">Smart Automation</span> for Growing Businesses.
                </h1>
                <p className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Stop wasting time on disconnected tools. Get a clear roadmap to integrated systems that save time and drive revenue growth.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-8">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg">Get Your Free Efficiency Assessment</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl md:max-w-2xl bg-background">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Free AI Business Assessment</DialogTitle>
                                <DialogDescription>
                                Describe your business needs to receive tailored IT solution recommendations from our AI consultant.
                                </DialogDescription>
                            </DialogHeader>
                            <SolutionRecommendationForm />
                        </DialogContent>
                    </Dialog>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/solutions">See How We Drive Growth</Link>
                    </Button>
                </div>
            </div>
      </div>
    </div>
  );
}
