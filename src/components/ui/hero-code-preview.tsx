"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, Sparkles, Play } from 'lucide-react';
import { pulse, createFadeIn, hoverScale, tapScale } from '@/lib/animation-variants';

export function HeroCodePreview({ className }: { className?: string }) {
  const codeLines = [
    { text: '// AI Agent for Workplace Automation', type: 'comment' },
    { text: '', type: 'empty' },
    { text: 'import { Agent } from "@logon/ai";', type: 'import' },
    { text: '', type: 'empty' },
    { text: 'const agent = new Agent({', type: 'code' },
    { text: '  name: "WorkflowAssistant",', type: 'property' },
    { text: '  model: "gemini-pro",', type: 'property' },
    { text: '  capabilities: [', type: 'property' },
    { text: '    "document-processing",', type: 'string' },
    { text: '    "task-automation",', type: 'string' },
    { text: '  ],', type: 'code' },
    { text: '});', type: 'code' },
    { text: '', type: 'empty' },
    { text: 'await agent.run({ task });', type: 'code' },
    { text: 'console.log("✓ Done");', type: 'success' },
  ];

  // Create line animation variant
  const lineVariant = (index: number) => createFadeIn(0.2, index * 0.03, 0, -10);

  return (
    <div className={cn(
      "relative bg-card/90 backdrop-blur-md border border-border rounded-xl overflow-hidden shadow-2xl",
      className
    )}>
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl opacity-50" />
      
      <div className="relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-secondary/40 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">agent.ts</span>
          </div>
          <motion.div
            variants={pulse}
            initial="initial"
            animate="animate"
            className="flex items-center gap-1 text-[10px] text-primary"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">AI Active</span>
          </motion.div>
        </div>

        {/* Code Content */}
        <div className="p-3 md:p-4 font-mono text-[11px] md:text-xs lg:text-sm overflow-x-auto max-h-[280px] lg:max-h-[320px]">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              variants={lineVariant(index)}
              initial="hidden"
              animate="visible"
              className="flex leading-relaxed"
            >
              <span className="w-6 text-right pr-2 text-muted-foreground/30 select-none text-[10px]">
                {index + 1}
              </span>
              <span className={getLineClass(line.type)}>
                {highlightLine(line.text, line.type)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/20 border-t border-border">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Bot className="w-3 h-3 text-primary" />
            <span>LOG_ON</span>
          </div>
          <motion.button
            whileHover={hoverScale}
            whileTap={tapScale}
            className="flex items-center gap-1 px-2 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-[10px] rounded transition-colors"
          >
            <Play className="w-2.5 h-2.5" fill="currentColor" />
            Run
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function getLineClass(type: string): string {
  switch (type) {
    case 'comment':
      return 'text-muted-foreground/60 italic';
    case 'import':
      return 'text-foreground/80';
    case 'property':
      return 'text-foreground/70 pl-4';
    case 'string':
      return 'text-primary/80 pl-8';
    case 'success':
      return 'text-primary';
    case 'empty':
      return 'h-5';
    default:
      return 'text-foreground/80';
  }
}

function highlightLine(text: string, type: string): React.ReactNode {
  if (type === 'empty') return null;
  
  // Highlight keywords
  const keywords = ['import', 'from', 'const', 'new', 'await', 'async'];
  let result = text;
  
  keywords.forEach(keyword => {
    result = result.replace(
      new RegExp(`\\b${keyword}\\b`, 'g'),
      `<span class="text-accent font-medium">${keyword}</span>`
    );
  });
  
  // Highlight strings
  result = result.replace(
    /"([^"]*)"/g,
    '<span class="text-primary">"$1"</span>'
  );
  
  // Highlight function calls
  result = result.replace(
    /(\w+)\(/g,
    '<span class="text-accent/80">$1</span>('
  );

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}
