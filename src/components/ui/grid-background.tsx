import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div 
        className="absolute inset-0 bg-grid-light dark:bg-grid-dark bg-[size:32px_32px] opacity-20"
        style={{
            maskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
        }}
      />
    </div>
  );
}
