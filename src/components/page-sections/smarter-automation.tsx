"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cog, Zap, Clock, TrendingUp, Shield } from "lucide-react";

const platformFeatures = [
  { title: "AI-Powered Workflow Designer", description: "Describe any business process in plain English. Get a complete, optimized automation plan in seconds with cost and time savings analysis.", tag: "Design" },
  { title: "Instant Deployment", description: "From concept to production in days, not months. Our platform handles the complexity so you can focus on results.", tag: "Ship" },
  { title: "Real-Time Monitoring", description: "Track performance, identify bottlenecks, and optimize workflows with live dashboards and intelligent alerts.", tag: "Ops" },
  { title: "Continuous Optimization", description: "Our AI learns from your workflows and suggests improvements to maximize efficiency and reduce costs over time.", tag: "Learn" },
  { title: "Enterprise Security", description: "Bank-level encryption, compliance-ready architecture, and complete data sovereignty for your peace of mind.", tag: "Trust" },
];

const tags = ["sage", "amber", "sky", "coral", "sage"] as const;

export function SmarterAutomation() {
  return (
    <section className="verdara-section py-16 lg:py-20">
      <div className="container mx-auto px-5 lg:px-10">
        <p className="verdara-kicker">Our platform</p>
        <h2 className="verdara-title mt-2">The fastest path to <em>automation</em></h2>
        <p className="verdara-lede mt-4">
          Describe any business process in plain English. Get a complete, optimized automation plan in seconds.
        </p>
        <div className="verdara-grid verdara-grid-3 mt-10">
          {platformFeatures.map((feature, i) => (
            <article key={feature.title} className="verdara-card">
              <span className={`verdara-tag verdara-tag-${tags[i]}`}>{feature.tag}</span>
              <h3 className="mt-4">{feature.title}</h3>
              <p className="verdara-lede mt-auto pt-3">{feature.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <Button asChild size="lg">
            <Link href="/automation">Explore All Templates</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
