"use client";

import { AnimatedCodeBackground } from "@/components/ui/animated-code-background";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlowingCard } from "@/components/ui/glowing-card";
import { GridBackground } from "@/components/ui/grid-background";
import { analystReports, overallRating } from "@/lib/data/analyst-reports";
import { Download, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const ReportCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <GlowingCard className={cn(`relative overflow-hidden`, className)}>
      <GridBackground />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </GlowingCard>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < fullStars
              ? "fill-yellow-500 text-yellow-500"
              : i === fullStars && hasHalfStar
              ? "fill-yellow-500/50 text-yellow-500"
              : "text-muted-foreground/30"
          )}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

export function AnalystReportsSection() {
  return (
    <section className="py-fluid-lg bg-background relative overflow-hidden">
      <AnimatedCodeBackground variant="insights" density="low" />
      <div className="container mx-auto px-fluid-sm">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-fluid-xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium font-headline">
              Industry Analyst Reports
            </h1>
            <p className="text-fluid-base max-w-2xl my-4 mx-auto text-muted-foreground text-center font-normal">
              Comprehensive analysis of our market position, innovation leadership, and delivery excellence across multiple dimensions.
            </p>
          </motion.div>
        </div>

        {/* Overall Rating Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <ReportCard className="border border-border/50">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Overall Composite Rating
                  </h3>
                  <StarRating rating={overallRating.composite} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                  {overallRating.dimensions.slice(0, 4).map((dim) => (
                    <div key={dim.name} className="text-center">
                      <div className="text-2xl font-bold text-primary">{dim.score.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">{dim.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ReportCard>
        </motion.div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {analystReports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <ReportCard
                className={cn(
                  "border-t border-border/50 h-full",
                  i === 0 ? "md:border-l-0" : "md:border-l",
                  i % 2 !== 0 ? "md:border-l-0" : "md:border-l"
                )}
              >
                <div className="flex flex-col h-full p-6">
                  {/* Report Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                      "inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br text-white font-bold",
                      report.color
                    )}>
                      {report.number}
                    </div>
                    <StarRating rating={report.rating} />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {report.subtitle}
                    </p>
                  </div>

                  {/* Analyst Firm */}
                  <div className="mb-4 pb-4 border-b border-border/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Analyst Firm
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {report.analystFirm}
                    </p>
                  </div>

                  {/* Focus Area */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      Focus Area
                    </p>
                    <p className="text-sm text-foreground">
                      {report.focus}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      Key Highlights
                    </p>
                    <ul className="space-y-1">
                      {report.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                          <TrendingUp className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Metrics */}
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                      Key Metrics
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {report.keyMetrics.map((metric, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-3">
                          <div className="text-lg font-bold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-auto">
                    <Button
                      asChild
                      className="w-full"
                      variant="default"
                    >
                      <a
                        href={report.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        View Report
                      </a>
                    </Button>
                  </div>
                </div>
              </ReportCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Want to learn more about our solutions and capabilities?
          </p>
          <Button asChild size="lg">
            <a href="/contact">Get in Touch</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
