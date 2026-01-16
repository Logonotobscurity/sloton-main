"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cog, ArrowRight } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TaskAutomationForm } from '@/components/task-automation-form';
import { createScaleAnimation } from '@/lib/animation-variants';

const MotionCard = motion(Card);

// Create custom scale animation with delay based on index
const createCardVariants = (index: number) => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.2,
      duration: 0.5
    }
  }
});

export function DesignerCard({ customIndex = 0, isGlow = false }: { customIndex?: number; isGlow?: boolean }) {
  const cardContent = (
    <div className="p-6 md:p-8 flex flex-col h-full">
      <div className="p-3 md:p-4 rounded-full bg-primary/10 mb-4 w-fit">
          <Cog className="h-8 w-8 md:h-10 md:w-10 text-primary" />
      </div>
      <CardTitle className="text-xl">Intelligent Automation Designer</CardTitle>
      <CardDescription className="mt-2 flex-grow">
          Describe any workflow in plain English and our AI will design an optimized automation plan, showing you exactly where you'll save time and money.
      </CardDescription>
      <div className="pt-4 mt-auto">
        <span className="p-0 text-primary group-hover:text-primary/90 flex items-center font-semibold">
            Try It Free <ArrowRight className="ml-2 h-4 w-4" />
        </span>
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={createCardVariants(customIndex)}
        >
          <MotionCard className="group cursor-pointer transition-all duration-300 hover:border-primary hover:-translate-y-2 bg-background/80 flex flex-col h-full">
            {cardContent}
          </MotionCard>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2"><Cog className="h-6 w-6 text-primary" /> Automation Task Designer</DialogTitle>
          <DialogDescription>
            Describe a workflow to generate a configured, optimized task design, complete with AI suggestions.
          </DialogDescription>
        </DialogHeader>
        <TaskAutomationForm />
      </DialogContent>
    </Dialog>
  );
}
