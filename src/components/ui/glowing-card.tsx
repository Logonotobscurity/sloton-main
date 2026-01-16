import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { GridBackground } from "./grid-background";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
}

export const GlowingCard = ({ children, className }: GlowingCardProps) => {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-xl bg-background/30 text-foreground shadow-md transition-shadow duration-300 hover:shadow-2xl border border-border/20",
        className
      )}
    >
      <GridBackground />
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.1),transparent)]"></div>

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
