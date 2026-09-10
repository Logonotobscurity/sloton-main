"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const communityFeatures = [
  { title: "Practical AI Training", description: "Learn actionable skills you can implement immediately. From AI fundamentals to advanced automation strategies for real business impact.", tag: "Learn" },
  { title: "Developer Community", description: "Join a growing network of Nigerian developers, entrepreneurs, and innovators building the future of AI in Africa.", tag: "People" },
  { title: "Mental Health Support", description: "Making mental health resources more accessible through AI-powered tools that understand local context and cultural nuances.", tag: "Care" },
  { title: "Innovation Projects", description: "Collaborate on open-source projects that solve real problems in Nigerian communities, from healthcare to education.", tag: "Build" },
  { title: "Certification Programs", description: "Earn industry-recognized certifications in AI, automation, and digital transformation to advance your career.", tag: "Proof" },
  { title: "Cultural AI Development", description: "Building AI systems that understand and respect diverse Nigerian cultures, languages, and traditions.", tag: "Place" },
];

const tags = ["sage", "amber", "sky", "coral", "sage", "amber"] as const;

export function TrainingCTA() {
  return (
    <section className="verdara-section py-16 lg:py-20">
      <div className="container mx-auto px-5 lg:px-10">
        <p className="verdara-kicker">Community & learning</p>
        <h2 className="verdara-title mt-2">Building <em>skills</em> and connecting advantages</h2>
        <p className="verdara-lede mt-4">
          We believe in building more than just technology. We're dedicated to building skills, fostering leadership, and making a positive community impact.
        </p>
        <div className="verdara-grid verdara-grid-3 mt-10">
          {communityFeatures.map((feature, i) => (
            <article key={feature.title} className="verdara-card">
              <span className={`verdara-tag verdara-tag-${tags[i]}`}>{feature.tag}</span>
              <h3 className="mt-4">{feature.title}</h3>
              <p className="verdara-lede mt-auto pt-3">{feature.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-12">
          <Button asChild size="lg">
            <Link href="/training">Explore Training Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
