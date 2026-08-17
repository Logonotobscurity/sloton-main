"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RotatingOrbProps {
  text?: string;
  className?: string;
  size?: number;
}

/**
 * RotatingOrb — SVG textPath orb with animated waveform bars
 * - Circular textPath rotates slowly (20s linear)
 * - Center waveform bars animate with staggered heights
 * - Respects prefers-reduced-motion
 * - Scales: fits 280px at 375, 340px at 768, 420px at 1280
 */
export function RotatingOrb({
  text = "LOG_ON  •  CONNECTING ADVANTAGES  •  AI AUTOMATION  •  ",
  className,
  size = 320,
}: RotatingOrbProps) {
  const repeated = (text + " ").repeat(3);
  return (
    <div
      className={cn("relative flex items-center justify-center select-none", className)}
      style={{ width: `min(100%, ${size}px)`, aspectRatio: "1" }}
      aria-hidden="true"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />

      {/* SVG Orb */}
      <svg
        viewBox="0 0 200 200"
        className="relative w-full h-full"
        role="img"
        aria-label="Rotating LOG_ON orb"
      >
        <defs>
          <path id="orb-circle" d="M 100, 100 m -70, 0 a 70,70 0 1,0 140,0 a 70,70 0 1,0 -140,0" />
        </defs>

        {/* Rotating textPath */}
        <g className="motion-safe:animate-[spin_20s_linear_infinite] origin-center">
          <text
            fill="hsl(var(--muted-foreground))"
            fontSize="7.5"
            fontFamily="var(--font-mono)"
            letterSpacing="1.2"
            opacity="0.9"
          >
            <textPath href="#orb-circle" startOffset="0%">
              {repeated}
            </textPath>
          </text>
        </g>

        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="72"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="0.7"
          opacity="0.7"
        />
        {/* Inner accent ring */}
        <circle
          cx="100"
          cy="100"
          r="58"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.9"
          opacity="0.25"
          strokeDasharray="3 4"
        />
      </svg>

      {/* Center waveform bars — animated */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-end gap-[3px] h-16">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className="w-[5px] bg-primary rounded-full motion-safe:animate-[wave_1s_ease-in-out_infinite] motion-reduce:animate-none"
              style={{
                height: `${14 + Math.abs(3 - i) * 6}px`,
                animationDelay: `${i * 110}ms`,
                opacity: 0.9 - i * 0.07,
              }}
            />
          ))}
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />

      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1.3); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[spin_20s_linear_infinite\\],
          .motion-safe\\:animate-\\[wave_1s_ease-in-out_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default RotatingOrb;
