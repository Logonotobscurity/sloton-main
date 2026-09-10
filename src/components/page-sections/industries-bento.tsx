"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { industryFeaturesAlt } from "@/lib/data/industries";

const tags = ["amber", "sky", "sage", "coral", "amber", "sky"] as const;

export function IndustriesBento() {
  return (
    <section className="verdara-section py-16 lg:py-20">
      <div className="container mx-auto px-5 lg:px-10">
        <div className="max-w-3xl">
          <p className="verdara-kicker">Sectors</p>
          <h2 className="verdara-title mt-3 text-[36px] lg:text-[46px]">
            Solutions for your <em>industry</em>
          </h2>
          <p className="verdara-lede mt-4 max-w-[60ch]">
            We combine deep industry knowledge with technological expertise to build solutions that address the unique challenges of your sector.
          </p>
        </div>

        <div className="verdara-grid verdara-grid-3 mt-12">
          {industryFeaturesAlt.map((feature, i) => (
            <article key={feature.title} className="verdara-card">
              <span className={`verdara-tag verdara-tag-${tags[i % tags.length]}`}>{feature.title.split(" ")[0]}</span>
              <div className="mt-4 text-verdara-ink">{feature.icon}</div>
              <h3 className="mt-3">{feature.title}</h3>
              <p className="verdara-lede mt-auto pt-3">{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link href="/use-cases">Explore All Use Cases</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
