"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BrainCircuit,
  Zap,
  Code,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const tags = ["sage", "amber", "sky", "coral", "sage"] as const;

const services = [
  {
    icon: BrainCircuit,
    title: "Predictive Growth & Insights",
    tag: "AI",
    description:
      "Stop guessing, start growing. We use custom AI to analyze your market, forecast trends, and identify the most profitable next steps for your business.",
    href: "/ai-solutions",
  },
  {
    icon: Zap,
    title: "Time & Cost Savings",
    tag: "Ops",
    description:
      "Do more with less time and fewer errors. We use intelligent automation to handle routine tasks like data entry, compliance, and invoicing.",
    href: "/automation",
  },
  {
    icon: Code,
    title: "Scalable Digital Presence",
    tag: "Build",
    description:
      "Build the platform you need for tomorrow's success. From high-converting e-commerce sites to custom applications that handle 5x user growth.",
    href: "/web-development",
  },
  {
    icon: MessageSquare,
    title: "24/7 Customer Engagement",
    tag: "Support",
    description:
      "Instant service, guaranteed. Deploy AI-powered conversational agents that answer customer questions instantly and reduce support tickets.",
    href: "/chatbots",
  },
  {
    icon: BarChart3,
    title: "Actionable Intelligence",
    tag: "Data",
    description:
      "Turn mountains of data into clear, simple decisions. We design custom business intelligence dashboards that consolidate your data into visual insights.",
    href: "/business-analytics",
  },
];

export function ServicesOffered() {
  return (
    <section className="verdara-section py-16 lg:py-20">
      <div className="container mx-auto px-5 lg:px-10">
        <div className="max-w-3xl">
          <p className="verdara-kicker">Our core solutions</p>
          <h2 className="verdara-title mt-3 text-[36px] lg:text-[46px]">
            Tools for every <em>business</em> goal
          </h2>
          <p className="verdara-lede mt-4 max-w-[60ch]">
            We equip your business with the same powerful tools and comprehensive data used by large corporations—without the big budget.
          </p>
        </div>

        <div className="verdara-grid verdara-grid-3 mt-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href={service.href} className="verdara-card group">
                <span className={`verdara-tag verdara-tag-${tags[i]}`}>{service.tag}</span>
                <Icon className="mt-5 h-5 w-5 text-verdara-ink" aria-hidden />
                <h3 className="mt-3">{service.title}</h3>
                <p className="verdara-lede mt-auto pt-3">{service.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link href="/use-cases">Explore All Solutions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
