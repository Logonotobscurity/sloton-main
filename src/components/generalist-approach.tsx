
"use client";

import { Card, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { AdinkraBackground } from './ui/adinkra-background';
import { motion } from 'framer-motion';

const cardContent = [
    {
        title: "Intelligent Automation",
        features: ["AI Chatbots", "RPA", "Workflow Design", "Process Mining"]
    },
    {
        title: "Cloud & DevOps",
        features: ["Cloud Migration", "Infrastructure as Code", "CI/CD Pipelines", "Kubernetes"]
    },
    {
        title: "Data & Analytics",
        features: ["BI Dashboards", "ETL Pipelines", "Data Warehousing", "Predictive Modeling"]
    },
    {
        title: "Custom Development",
        features: ["Web Applications", "Mobile Apps", "API Integration", "Legacy System Modernization"]
    }
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

export function GeneralistApproach() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20 relative">
        <AdinkraBackground />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
                <p className="text-sm font-normal uppercase tracking-widest text-primary">02/ Our Approach</p>
                <h2 className="font-headline text-[clamp(1.8rem,5vw,3rem)] font-bold !leading-snug">
                    We are strategic <span className="text-primary">generalists</span> in a world of hyper-specialization.
                </h2>
                <p className="text-muted-foreground md:text-lg">
                    Specialists see problems through the lens of their expertise. We see your entire business ecosystem. This allows us to connect dots and build integrated solutions that are more robust, efficient, and innovative than a collection of siloed tools.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {cardContent.map((card, i) => (
                    <motion.div
                        key={card.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={cardVariants}
                    >
                      <Card className="p-6 bg-background/80 backdrop-blur-sm transition-transform duration-300 hover:scale-105 h-full">
                          <CardTitle className="mb-4">{card.title}</CardTitle>
                          <ul className="space-y-2">
                              {card.features.map(feature => (
                                  <li key={feature} className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-primary" />
                                      <span className="text-sm text-muted-foreground">{feature}</span>
                                  </li>
                              ))}
                          </ul>
                      </Card>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
