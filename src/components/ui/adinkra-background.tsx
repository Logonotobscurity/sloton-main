import { cn } from "@/lib/utils";
import React from "react";

/** Intentionally empty — no patterned / grid background. */
export function AdinkraBackground({ className }: { className?: string }) {
  return <div className={cn("hidden", className)} aria-hidden="true" />;
}
