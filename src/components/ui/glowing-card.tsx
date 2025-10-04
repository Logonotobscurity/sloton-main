
"use client"
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
}

export const GlowingCard = ({ children, className }: GlowingCardProps) => {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-xl bg-background text-foreground shadow-md transition-shadow duration-300 hover:shadow-2xl",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <div 
          role="presentation"
          className="absolute inset-0 bg-grid-light dark:bg-grid-dark bg-[size:24px_24px] opacity-20"
        />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.1),transparent)]"></div>
      </div>

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
