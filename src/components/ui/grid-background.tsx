import { cn } from "@/lib/utils";
import React from "react";

/** Intentionally empty — no grid lines on page backgrounds. */
export function GridBackground({ className }: { className?: string }) {
  return <div className={cn("hidden", className)} aria-hidden="true" />;
}
