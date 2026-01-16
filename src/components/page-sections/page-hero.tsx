"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AdinkraBackground } from "../ui/adinkra-background";

interface PageHeroProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHero({ title, description, icon, children }: PageHeroProps) {
  return (
    <div className="relative py-fluid-md text-center bg-background overflow-hidden">
        <AdinkraBackground />
        <div className="container px-fluid-sm relative z-20 animate-[fade-in_1s_ease-in-out]">
            {icon && <div className="mb-4 flex justify-center">{icon}</div>}
            <div className="max-w-3xl mx-auto">
                <h1
                    className="text-fluid-lg font-bold leading-tight tracking-tight font-headline mb-6"
                >
                    {title}
                </h1>
                <p
                    className="text-fluid-base text-muted-foreground leading-relaxed"
                >
                    {description}
                </p>
            </div>
            {children && <div className="mt-8 w-full">{children}</div>}
        </div>
    </div>
  );
}
