"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowIconProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "right" | "left" | "up" | "down";
  size?: number;
}

export function ArrowIcon({ direction = "right", size = 16, className, ...props }: ArrowIconProps) {
  const rotationMap = {
    right: "rotate-0",
    up: "-rotate-90",
    left: "rotate-180",
    down: "rotate-90",
  };

  return (
    <div className={cn("inline-flex items-center justify-center", rotationMap[direction], className)} {...props}>
      <ArrowRight size={size} />
    </div>
  );
}

export default ArrowIcon;
