"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, Cpu, Code2, Workflow, Shield, Zap, FileCode, GitBranch, Terminal, Sparkles } from 'lucide-react';
import { createFadeIn, scaleIn } from '@/lib/animation-variants';

type VisualType = 
  | 'agent-code' 
  | 'code-review' 
  | 'performance' 
  | 'document-ai' 
  | 'workflow' 
  | 'agent-skills'
  | 'tutorial'
  | 'diagrams'
  | 'default';

interface ArticleCodeVisualProps {
  type: VisualType;
  className?: string;
  animated?: boolean;
}

const visualConfigs: Record<VisualType, {
  icon: React.ElementType;
  lines: string[];
  accent: string;
  title: string;
}> = {
  'agent-code': {
    icon: Bot,
    title: 'agent.ts',
    accent: 'primary',
    lines: [
      'const agent = new AIAgent({',
      '  model: "gemini-pro",',
      '  capabilities: ["code", "review"],',
      '  memory: true,',
      '});',
      '',
      'await agent.execute(task);',
    ],
  },
  'code-review': {
    icon: GitBranch,
    title: 'review.ts',
    accent: 'accent',
    lines: [
      '// Agentic Code Review',
      'const review = await agent.review({',
      '  files: changedFiles,',
      '  context: pullRequest,',
      '  rules: codeStandards,',
      '});',
      '',
      'return review.suggestions;',
    ],
  },
  'performance': {
    icon: Zap,
    title: 'benchmark.ts',
    accent: 'primary',
    lines: [
      '// 3x Faster with Gemini Flash',
      'const results = await benchmark({',
      '  model: "gemini-3-flash",',
      '  iterations: 1000,',
      '});',
      '',
      'console.log(`Speed: ${results.ms}ms`);',
    ],
  },
  'document-ai': {
    icon: FileCode,
    title: 'analyze.ts',
    accent: 'accent',
    lines: [
      'const doc = await vision.analyze({',
      '  file: uploadedPDF,',
      '  extractText: true,',
      '  summarize: true,',
      '});',
      '',
      'return doc.insights;',
    ],
  },
  'workflow': {
    icon: Workflow,
    title: 'workflow.ts',
    accent: 'primary',
    lines: [
      'const workflow = createWorkflow({',
      '  threads: threadManager,',
      '  labels: ["urgent", "review"],',
      '  autoAssign: true,',
      '});',
      '',
      'workflow.onComplete(notify);',
    ],
  },
  'agent-skills': {
    icon: Sparkles,
    title: 'AGENTS.md',
    accent: 'accent',
    lines: [
      '# Agent Skills',
      '',
      '## Code Generation',
      '- TypeScript, Python, Go',
      '- Test generation',
      '- Documentation',
      '',
      '## Review & Analysis',
    ],
  },
  'tutorial': {
    icon: Terminal,
    title: 'tutorial.ts',
    accent: 'primary',
    lines: [
      '// Step 1: Initialize Agent',
      'import { Agent } from "@logon/ai";',
      '',
      'const myAgent = new Agent({',
      '  name: "CodeAssistant",',
      '  tools: [codeGen, review],',
      '});',
    ],
  },
  'diagrams': {
    icon: Code2,
    title: 'diagram.mmd',
    accent: 'accent',
    lines: [
      'graph TD',
      '  A[User Request] --> B{Agent}',
      '  B --> C[Code Gen]',
      '  B --> D[Review]',
      '  C --> E[Output]',
      '  D --> E',
    ],
  },
  'default': {
    icon: Cpu,
    title: 'index.ts',
    accent: 'primary',
    lines: [
      'import { AI } from "@logon/core";',
      '',
      'const ai = new AI({',
      '  provider: "google",',
      '  model: "gemini-pro",',
      '});',
      '',
      'export default ai;',
    ],
  },
};

export function ArticleCodeVisual({ type, className, animated = true }: ArticleCodeVisualProps) {
  const config = visualConfigs[type] || visualConfigs.default;
  const Icon = config.icon;

  // Create line animation variant
  const lineVariant = (index: number) => createFadeIn(0.2, index * 0.03, 0, -5);

  return (
    <div className={cn(
      "relative bg-card border border-border rounded-xl overflow-hidden group",
      className
    )}>
      {/* Gradient Overlay */}
      <div className={cn(
        "absolute inset-0 opacity-10",
        config.accent === 'primary' ? 'bg-gradient-to-br from-primary to-transparent' : 'bg-gradient-to-br from-accent to-transparent'
      )} />

      {/* Terminal Header */}
      <div className="relative flex items-center gap-2 px-3 py-2 bg-secondary/30 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
        </div>
        <span className="text-[10px] text-muted-foreground ml-1">{config.title}</span>
        <Icon className={cn(
          "w-3.5 h-3.5 ml-auto",
          config.accent === 'primary' ? 'text-primary' : 'text-accent'
        )} />
      </div>

      {/* Code Content */}
      <pre className="relative p-3 text-[10px] md:text-xs font-mono leading-relaxed overflow-hidden">
        {config.lines.map((line, i) => (
          <motion.div
            key={i}
            variants={animated ? lineVariant(i) : undefined}
            initial={animated ? "hidden" : false}
            animate="visible"
            className="text-foreground/70"
          >
            {highlightSyntax(line, config.accent as 'primary' | 'accent')}
          </motion.div>
        ))}
      </pre>

      {/* Floating Icon */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className={cn(
          "absolute bottom-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center",
          config.accent === 'primary' ? 'bg-primary/20' : 'bg-accent/20'
        )}
      >
        <Icon className={cn(
          "w-4 h-4",
          config.accent === 'primary' ? 'text-primary' : 'text-accent'
        )} />
      </motion.div>
    </div>
  );
}

function highlightSyntax(line: string, accent: 'primary' | 'accent') {
  const keywords = ['const', 'await', 'import', 'export', 'from', 'new', 'return', 'async', 'function'];
  const accentClass = accent === 'primary' ? 'text-primary' : 'text-accent';
  
  let result = line;
  
  // Highlight comments
  if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
    return <span className="text-muted-foreground/50 italic">{line}</span>;
  }
  
  // Highlight strings
  result = result.replace(/"([^"]*)"/g, `<span class="${accentClass}">"$1"</span>`);
  
  // Highlight keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    result = result.replace(regex, `<span class="text-primary/80 font-medium">${keyword}</span>`);
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}
