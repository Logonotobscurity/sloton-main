"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function AdinkraBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
            <pattern id="enhancedAdinkra" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--primary)/0.2)" strokeWidth="1"/>
                <circle cx="40" cy="40" r="25" fill="none" stroke="hsl(var(--accent)/0.2)" strokeWidth="1"/>
                <circle cx="40" cy="40" r="15" fill="none" stroke="hsl(var(--primary)/0.3)" strokeWidth="1.5"/>
                <circle cx="40" cy="40" r="8" fill="hsl(var(--accent)/0.1)" opacity="0.8"/>
                
                <path d="M40,0 V80 M0,40 H80" stroke="hsl(var(--border)/0.2)" strokeWidth="0.5"/>
                <path d="M11.7,11.7 L68.3,68.3 M68.3,11.7 L11.7,68.3" stroke="hsl(var(--border)/0.2)" strokeWidth="0.5"/>
                
                <circle cx="10" cy="10" r="1.5" fill="hsl(var(--primary)/0.2)"/>
                <circle cx="70" cy="10" r="1.5" fill="hsl(var(--primary)/0.2)"/>
                <circle cx="10" cy="70" r="1.5" fill="hsl(var(--primary)/0.2)"/>
                <circle cx="70" cy="70" r="1.5" fill="hsl(var(--primary)/0.2)"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#enhancedAdinkra)"/>
    </svg>
    </div>
  );
}
