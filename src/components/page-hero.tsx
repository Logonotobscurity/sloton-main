
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AdinkraBackground } from "./ui/adinkra-background";

interface PageHeroProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHero({ title, description, icon, children }: PageHeroProps) {
  return (
    <div className="relative py-16 md:py-24 text-center bg-background overflow-hidden">
        <AdinkraBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background z-10" />
        <div className="container px-4 md:px-6 relative z-20 animate-[fade-in_1s_ease-in-out]">
            {icon && <div className="mb-4 flex justify-center">{icon}</div>}
            <div className="max-w-3xl mx-auto">
                <h1
                    className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-headline mb-6"
                >
                    {title}
                </h1>
                <p
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
                >
                    {description}
                </p>
            </div>
            {children && <div className="mt-8 w-full">{children}</div>}
        </div>
    </div>
  );
}
