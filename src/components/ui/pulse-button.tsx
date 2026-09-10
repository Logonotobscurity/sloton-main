"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

interface PulseButtonProps extends ButtonProps {
  pulseColor?: string;
  showPulse?: boolean;
}

/**
 * PulseButton — reusable button style extracted from bottom Pulse tab
 * - 44px min-height, rounded-full, border, gap-2
 * - Left pulsing dot (8px + ping animation) + text
 * - Used across website for primary pulses (e.g., All systems operational, Live, etc.)
 * - Full-width at <640, auto at ≥640 when used with w-full sm:w-auto
 */
export function PulseButton({
  children,
  className,
  pulseColor = "bg-primary",
  showPulse = true,
  ...props
}: PulseButtonProps) {
  return (
    <Button
      variant="default"
      size="lg"
      className={cn(
        "relative rounded-full border border-foreground/10 bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors min-h-[44px] gap-2.5 px-6",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {showPulse && (
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", pulseColor)} />
          <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", pulseColor)} />
        </span>
      )}
      <span className="text-sm font-mono tracking-wide font-semibold">{children}</span>
    </Button>
  );
}

export default PulseButton;
