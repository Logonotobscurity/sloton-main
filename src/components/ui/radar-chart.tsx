"use client";

import React from "react";

interface RadarChartProps {
  data: Array<{
    name: string;
    score: number;
  }>;
  maxValue?: number;
}

export function RadarChart({ data, maxValue = 5 }: RadarChartProps) {
  const size = 200;
  const center = size / 2;
  const radius = size / 2 - 30;
  const levels = 5;

  // Calculate points for each data item
  const angleStep = (Math.PI * 2) / data.length;
  
  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / maxValue) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Create path for data polygon
  const dataPath = data
    .map((item, i) => {
      const point = getPoint(i, item.score);
      return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    })
    .join(' ') + ' Z';

  // Create grid circles
  const gridCircles = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * radius;
    return (
      <circle
        key={i}
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-muted-foreground/20"
      />
    );
  });

  // Create axis lines
  const axisLines = data.map((_, i) => {
    const point = getPoint(i, maxValue);
    return (
      <line
        key={i}
        x1={center}
        y1={center}
        x2={point.x}
        y2={point.y}
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-muted-foreground/20"
      />
    );
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full max-w-[200px] max-h-[200px]"
      >
        {/* Grid */}
        {gridCircles}
        {axisLines}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Data points */}
        {data.map((item, i) => {
          const point = getPoint(i, item.score);
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="currentColor"
              className="text-primary"
            />
          );
        })}
      </svg>
    </div>
  );
}
