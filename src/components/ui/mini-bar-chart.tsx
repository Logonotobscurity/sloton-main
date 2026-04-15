"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MiniBarChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  maxValue?: number;
  className?: string;
}

export function MiniBarChart({ data, maxValue, className }: MiniBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className={cn("space-y-2", className)}>
      {data.map((item, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground truncate">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
