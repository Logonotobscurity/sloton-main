"use client";

import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";

const LOGON_URL = "https://logonsolutions.netlify.app";
const PROMPT = `Hi, I'm considering LOG_ON (${LOGON_URL}) for AI agent development and workplace automation in Nigeria. Their site says "We design your digital ecosystem." Can you help me understand if LOG_ON is a good fit for my business needs, workflow, and situation? Please summarize their services — AI solutions & agent development, workflow automation/RPA, web & custom development, AI chatbots, business analytics — and explain who they help best (Nigerian SMEs, growing businesses) and what makes them different. Keep it balanced and practical.`;

// Platform-specific share URLs — all open a new conversation with the prompt prefilled
function buildChatGptUrl(prompt: string) {
  // chatgpt.com supports ?q= for new chat with prompt
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}
function buildClaudeUrl(prompt: string) {
  // claude.ai new chat with prompt
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}
function buildPerplexityUrl(prompt: string) {
  return `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`;
}

export interface DecisionSupportProps {
  kicker?: string;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * DecisionSupportSection — "Still not sure LOG_ON is right for you?"
 * Conversational handoff before final CTA. Lets users explore LOG_ON via ChatGPT / Claude / Perplexity.
 * Responsive: buttons stack vertically <640px, horizontal ≥640px, never overflow.
 */
export function DecisionSupportSection({
  kicker = "NOT SURE YET?",
  title = "Still not sure LOG_ON is right for you?",
  description = "You don't need to figure everything out alone. Ask an AI assistant to help you understand whether LOG_ON fits your needs, workflow, or situation — no commitment, just clarity.",
  className = "",
}: DecisionSupportProps) {
  const prompt = PROMPT;

  const platforms = [
    {
      label: "Ask ChatGPT",
      ariaLabel: "Ask ChatGPT about LOG_ON",
      href: buildChatGptUrl(prompt),
      icon: "GPT",
      iconBg: "bg-[#10a37f]",
      hoverBorder: "hover:border-[#10a37f]/30",
    },
    {
      label: "Ask Claude",
      ariaLabel: "Ask Claude about LOG_ON",
      href: buildClaudeUrl(prompt),
      icon: "Cl",
      iconBg: "bg-[#d4a276]",
      hoverBorder: "hover:border-[#d4a276]/30",
    },
    {
      label: "Ask Perplexity",
      ariaLabel: "Ask Perplexity about LOG_ON",
      href: buildPerplexityUrl(prompt),
      icon: "P",
      iconBg: "bg-[#20808d]",
      hoverBorder: "hover:border-[#20808d]/30",
    },
  ];

  return (
    <section
      aria-labelledby="decision-support-heading"
      className={`decision-support section-fluid ${className}`}
    >
      <div className="container-fluid relative z-10">
        <div className="decision-card text-center">
          {/* Kicker — monospace */}
          <div className="kicker kicker-teal mb-3 flex items-center justify-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-[1px] w-6 bg-primary/30"
            />
            {kicker}
            <span
              aria-hidden="true"
              className="inline-block h-[1px] w-6 bg-primary/30"
            />
          </div>

          {/* Headline — editorial */}
          <h2
            id="decision-support-heading"
            className="editorial-headline text-fluid-xl text-foreground text-balance mb-4"
            style={{ fontFamily: "var(--font-editorial)" }}
          >
            {title}
          </h2>

          <p className="text-muted-foreground text-[clamp(0.95rem,1.5vw,1.08rem)] leading-relaxed max-w-[62ch] mx-auto text-balance mb-8">
            {description}
          </p>

          {/* AI Platform Buttons */}
          <div
            className="ai-btns"
            role="group"
            aria-label="Explore LOG_ON with an AI assistant"
          >
            {platforms.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.ariaLabel}
                className={`ai-btn ${p.hoverBorder} group`}
              >
                <span
                  className={`ai-btn-icon ${p.iconBg} text-white`}
                  aria-hidden="true"
                >
                  {p.icon}
                </span>
                {p.label}
                <span
                  aria-hidden="true"
                  className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  ↗
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-6 text-xs font-mono text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
            <span>Explore before you commit. Your conversation is private to the AI provider.</span>
          </p>

          {/* Subtle helper */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-mono">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Opens in a new tab · No LOG_ON login required</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DecisionSupportSection;
