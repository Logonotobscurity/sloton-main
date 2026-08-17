
"use client";

import React from "react";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import SolutionRecommendationForm from "@/components/solution-recommendation-form";
import { motion } from "framer-motion";
import { AdinkraBackground } from "@/components/ui/adinkra-background";
import { TypeAnimation } from "react-type-animation";
import { HeroCodePreview } from "@/components/ui/hero-code-preview";
import { staggerContainerCustom, staggerItem, createFadeIn } from "@/lib/animation-variants";
 
export function Hero() {
  const containerVariants = staggerContainerCustom(0.2, 0.2);
  const itemVariants = staggerItem;

  const animationSequence = [
    'Smart Automation',
    2000,
    'AI Agents',
    2000,
    'Actionable Intelligence',
    2000,
  ];
  const longestPhrase = 'Actionable Intelligence';

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      <AdinkraBackground />
      <div className="relative z-10 container px-fluid-sm py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-sm font-normal uppercase tracking-widest text-primary">
              Connecting Advantages. Delivering Results.
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="font-headline text-fluid-hero font-bold !leading-tight my-4"
            >
              <div className="flex flex-col lg:items-start items-center">
                <span>Do More with Less:</span>
                <div className="relative inline-block text-primary text-fluid-lg">
                  <span className="invisible whitespace-nowrap">{longestPhrase}</span>
                  <span className="absolute inset-0 flex items-center lg:justify-start justify-center whitespace-nowrap">
                      <TypeAnimation
                          sequence={animationSequence}
                          wrapper="span"
                          cursor={false}
                          repeat={Infinity}
                      />
                  </span>
                </div>
                <br className="md:hidden" />
                <span className="text-[clamp(2rem,4vw,3.5rem)] md:whitespace-nowrap">for Growing Businesses.</span>
              </div>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mt-4"
            >
              We build AI agents and automation systems that transform how Nigerian businesses operate. Less manual work, more growth.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full max-w-md sm:max-w-none mx-auto lg:mx-0"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="primary" size="large" className="w-full sm:w-auto max-w-full">Get Your Free Efficiency Assessment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl md:max-w-2xl bg-background">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Free AI Business Assessment</DialogTitle>
                    <DialogDescription>
                      Describe your business needs to receive tailored IT solution recommendations from our AI consultant.
                    </DialogDescription>
                  </DialogHeader>
                  <SolutionRecommendationForm />
                </DialogContent>
              </Dialog>
              <Button size="large" variant="outline" asChild className="w-full sm:w-auto max-w-full">
                <Link href="/solutions" aria-label="Explore our AI and Automation Solutions" className="w-full text-center leading-tight">Explore Our AI & Automation Solutions</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:flex lg:justify-end"
          >
            <HeroCodePreview className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
