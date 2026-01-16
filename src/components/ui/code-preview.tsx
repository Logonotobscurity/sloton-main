"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { createFadeIn } from '@/lib/animation-variants';

interface CodeLine {
  content: string;
  highlights?: { text: string; color: 'primary' | 'accent' | 'muted' | 'default' }[];
}

interface CodePreviewProps {
  lines: CodeLine[];
  className?: string;
  variant?: 'default' | 'compact' | 'hero';
  animated?: boolean;
  title?: string;
  path?: string;
}

const colorMap = {
  primary: 'text-primary font-semibold',
  accent: 'text-accent font-semibold', 
  muted: 'text-muted-foreground/70',
  default: 'text-foreground/90',
};

export function CodePreview({ 
  lines, 
  className, 
  variant = 'default',
  animated = true,
  title,
  path 
}: CodePreviewProps) {
  const sizeClasses = {
    default: 'text-xs md:text-sm',
    compact: 'text-[10px] md:text-xs',
    hero: 'text-[11px] md:text-sm',
  };

  // Create line animation variant
  const lineVariant = (index: number) => createFadeIn(0.3, index * 0.05, 0, -10);

  return (
    <div className={cn(
      "relative bg-card/80 backdrop-blur-sm border border-border rounded-lg overflow-hidden",
      className
    )}>
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
        </div>
        {title && <span className="text-xs text-muted-foreground ml-2">{title}</span>}
        {path && <span className="text-xs text-muted-foreground/50 ml-auto">{path}</span>}
      </div>

      {/* Code Content */}
      <pre className={cn(
        "p-4 overflow-x-auto font-mono",
        sizeClasses[variant]
      )}>
        {lines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            variants={animated ? lineVariant(lineIndex) : undefined}
            initial={animated ? "hidden" : false}
            animate="visible"
            className="leading-relaxed"
          >
            <span className="text-muted-foreground/40 select-none mr-4">
              {String(lineIndex + 1).padStart(2, '0')}
            </span>
            {line.highlights ? (
              renderHighlightedLine(line.content, line.highlights)
            ) : (
              <span className="text-foreground/80">{line.content}</span>
            )}
          </motion.div>
        ))}
      </pre>
    </div>
  );
}

function renderHighlightedLine(
  content: string, 
  highlights: { text: string; color: 'primary' | 'accent' | 'muted' | 'default' }[]
) {
  let result = content;
  const parts: JSX.Element[] = [];
  let lastIndex = 0;

  highlights.forEach((highlight, i) => {
    const index = result.indexOf(highlight.text, lastIndex);
    if (index !== -1) {
      if (index > lastIndex) {
        parts.push(
          <span key={`text-${i}`} className="text-foreground/80">
            {result.slice(lastIndex, index)}
          </span>
        );
      }
      parts.push(
        <span key={`highlight-${i}`} className={colorMap[highlight.color]}>
          {highlight.text}
        </span>
      );
      lastIndex = index + highlight.text.length;
    }
  });

  if (lastIndex < result.length) {
    parts.push(
      <span key="remaining" className="text-foreground/80">
        {result.slice(lastIndex)}
      </span>
    );
  }

  return <>{parts}</>;
}
