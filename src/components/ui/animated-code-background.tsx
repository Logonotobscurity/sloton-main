"use client";

import { motion } from "framer-motion";

type Variant = "hero" | "services" | "automation" | "partnership" | "training" | "statement" | "industries" | "tech" | "insights" | "studio" | "default";

interface AnimatedCodeBackgroundProps {
  variant?: Variant;
  className?: string;
  density?: "low" | "medium" | "high";
}

const snippets: Record<Variant, string[]> = {
  hero: [
    `const innovate = () => {\n  return ideas\n    .filter(viable)\n    .map(build)\n    .reduce(impact);\n};`,
    `// AI-Powered Innovation\nclass IdeasLab {\n  async launch(p) {\n    await this.validate();\n    return this.deploy();\n  }\n}`,
    `export const portfolio = {\n  projects: 17,\n  domains: 7,\n  status: 'BUILDING'\n};`,
    `const pipeline = [\n  'ideate','prototype','build','deploy'\n].map(execute);`,
  ],
  services: [
    `function automate(task) {\n  return task\n    .extract()\n    .validate()\n    .post();\n}`,
    `// Services as code\nconst services = [\n  'AI','automation','web','chatbot'\n];`,
    `type Service = {\n  name: string;\n  impact: number;\n};`,
    `await services.map(s => deploy(s));`,
  ],
  automation: [
    `class Workflow {\n  async run() {\n    await this.extract();\n    await this.transform();\n    return this.load();\n  }\n}`,
    `// Smarter automation\nconst flow = {\n  trigger: 'invoice.uploaded',\n  steps: ['extract','validate']\n};`,
    `pipeline.on('complete', () => notify());`,
    `while (manual) { automate(); }`,
  ],
  partnership: [
    `// Partnership\nconst partner = {\n  trust: 100,\n  scale: 'global'\n};`,
    `function coBuild(a, b) {\n  return a.ideas + b.execution;\n}`,
    `export const allies = [\n  'design','build','scale'\n];`,
    `if (aligned) launch();`,
  ],
  training: [
    `// Training\nclass Cohort {\n  learn() { return this.build(); }\n}`,
    `const skills = [\n  'AI','automation','data'\n];`,
    `skills.forEach(s => master(s));`,
    `for (const learner of cohort) {\n  learner.grow();\n}`,
  ],
  statement: [
    `// Statement\nconst vision = "Automate the mundane";`,
    `export const mission = {\n  less: 'manual',\n  more: 'growth'\n};`,
    `if (vision) execute();`,
    `// We design ecosystems`,
  ],
  industries: [
    `type Industry = \n  | 'finance'\n  | 'health'\n  | 'retail';`,
    `// Bento\nconst grid = {\n  cols: 3,\n  gap: 16\n};`,
    `industries.map(i => render(i));`,
    `// Scale per vertical`,
  ],
  tech: [
    `// Tech stack\nconst stack = [\n  'Next.js','Python','AWS'\n];`,
    `import { tech } from '@/lib/data';\ntech.forEach(t => use(t));`,
    `npm install --save innovation`,
    `<TechStack />`,
  ],
  insights: [
    `// Insights\nconst post = {\n  title: 'AI trends',\n  read: true\n};`,
    `export function Insight() {\n  return <Article />;\n}`,
    `insights.filter(p => p.featured)`,
    `// Share knowledge`,
  ],
  studio: [
    `// Studio\nconst studio = {\n  discoverable: true,\n  recommendable: true\n};`,
    `import { seo } from '@/lib/seo';\nawait seo.audit(domain);`,
    `type Visibility = {\n  AEO: number;\n  GEO: number;\n};`,
    `studio.quote();`,
  ],
  default: [
    `const logon = () => {\n  return automate();\n};`,
    `// LOG_ON\n function scale() {\n  return growth;\n}`,
    `export default logon;`,
    `// Connecting advantages`,
  ],
};

const symbols = ["{ }", "[ ]", "< >", "( )", "=>", "...", "++", "&&", "||", "==="];

export function AnimatedCodeBackground({
  variant = "default",
  className = "",
  density = "medium",
}: AnimatedCodeBackgroundProps) {
  const codes = snippets[variant] ?? snippets.default;
  const symbolCount = density === "low" ? 8 : density === "high" ? 20 : 15;

  return (
    <div className={`absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Floating code blocks - 4 per section, varied positions per variant */}
      <motion.div
        className="absolute top-8 left-6 md:left-10 text-[10px] md:text-xs font-mono text-primary font-semibold max-w-[280px] hidden sm:block"
        animate={{ y: [0, -14, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 7 + (variant.charCodeAt(0) % 3), repeat: Infinity, ease: "easeInOut" }}
      >
        <pre className="leading-relaxed whitespace-pre-wrap break-words">{codes[0]}</pre>
      </motion.div>

      <motion.div
        className="absolute top-24 right-6 md:right-16 text-[10px] md:text-xs font-mono text-accent font-semibold max-w-[280px] hidden md:block"
        animate={{ y: [0, 14, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 9 + (variant.charCodeAt(1) % 3), repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      >
        <pre className="leading-relaxed whitespace-pre-wrap break-words">{codes[1]}</pre>
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-1/4 text-[10px] md:text-xs font-mono text-primary font-semibold max-w-[280px] hidden lg:block"
        animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <pre className="leading-relaxed whitespace-pre-wrap break-words">{codes[2]}</pre>
      </motion.div>

      <motion.div
        className="absolute bottom-24 right-1/4 text-[10px] md:text-xs font-mono text-accent font-semibold max-w-[280px] hidden lg:block"
        animate={{ y: [0, 18, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
      >
        <pre className="leading-relaxed whitespace-pre-wrap break-words">{codes[3] ?? codes[0]}</pre>
      </motion.div>

      {/* Scattered symbols - density varied, positions pseudo-random per variant */}
      {Array.from({ length: symbolCount }).map((_, i) => {
        const seed = variant.charCodeAt(0) + i * 37;
        const top = (seed * 73) % 100;
        const left = (seed * 97) % 100;
        return (
          <motion.div
            key={i}
            className="absolute text-sm md:text-base font-mono text-foreground font-bold select-none"
            style={{ top: `${top}%`, left: `${left}%` }}
            animate={{ opacity: [0.15, 0.45, 0.15], scale: [1, 1.15, 1] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: (i % 5) * 0.4,
            }}
          >
            {symbols[i % symbols.length]}
          </motion.div>
        );
      })}

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.06,
        }}
      />
    </div>
  );
}
