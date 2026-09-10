"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  visual?: string;
  kicker?: string;
}

function pickVisual(title: string, visual?: string) {
  if (visual) return visual;
  const t = title.toLowerCase();
  if (/(chatbot|whatsapp|conversational|virtual assistant)/.test(t)) return "/images/marks/hero-chat.svg";
  if (/(automat|rpa|workflow)/.test(t)) return "/images/marks/hero-automation.svg";
  if (/(analytic|dashboard|intelligence|kpi)/.test(t)) return "/images/marks/hero-analytics.svg";
  if (/(database|data management|sql)/.test(t)) return "/images/marks/hero-database.svg";
  if (/(web|next\.js|application development|publisher)/.test(t)) return "/images/marks/hero-web.svg";
  if (/(train|skill|certif|curriculum)/.test(t)) return "/images/marks/hero-training.svg";
  if (/(contact|get in touch|book)/.test(t)) return "/images/marks/hero-contact.svg";
  if (/(agent)/.test(t)) return "/images/marks/hero-agents.svg";
  if (/(search|llmo|geo|seo)/.test(t)) return "/images/marks/hero-search.svg";
  if (/(insight|research|report|news)/.test(t)) return "/images/marks/hero-insights.svg";
  if (/(about|company|leadership|career|partner|location|investor)/.test(t)) return "/images/marks/hero-company.svg";
  if (/(ai |solution)/.test(t)) return "/images/marks/hero-ai.svg";
  return "/images/marks/hero-default.svg";
}

export function PageHero({
  title,
  description,
  icon,
  children,
  visual,
  kicker = "LOG_ON",
}: PageHeroProps) {
  const art = pickVisual(title, visual);
  const isSvg = art.endsWith(".svg");
  const words = title.trim().split(/\s+/);
  const last = words.pop() ?? "";
  const lead = words.join(" ");
  return (
    <section className="verdara-section relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={art} alt="" className="h-full w-full object-cover object-right" />
        ) : (
          <Image src={art} alt="" fill priority className="object-cover" sizes="100vw" />
        )}
      </div>
      <div className="container relative z-20 mx-auto px-5 lg:px-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {icon ? <div className="mb-4 text-primary">{icon}</div> : null}
          <p className="verdara-kicker">{kicker}</p>
          <h1 className="verdara-title mt-3">
            {lead ? `${lead} ` : ""}
            <em>{last}</em>
          </h1>
          <p className="verdara-lede mt-5">{description}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </motion.div>
      </div>
    </section>
  );
}
