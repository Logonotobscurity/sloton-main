
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cog } from 'lucide-react';

import SolutionRecommendationForm from '@/components/solution-recommendation-form';
import { TaskAutomationForm } from '@/components/task-automation-form';
import { InteractiveCard } from './strategic-partner/interactive-card';
import { staggerContainerCustom, staggerItem } from '@/lib/animation-variants';

    
const interactiveCards = [
    {
        icon: <BrainCircuit className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
        title: "Free Business Assessment",
        description: "Our AI will analyze your business and generate a custom report outlining your best opportunities for automation and digital transformation.",
        'aria-label': "Open Free Business Assessment dialog",
        dialogTitle: "Free Business Assessment",
        dialogDescription: "Get a customized report showing exactly where automation can save you time and money, with specific solutions for your unique needs.",
        dialogContent: <SolutionRecommendationForm />,
    },
    {
        icon: <Cog className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
        title: "Intelligent Automation Designer",
        description: "Describe any workflow in plain English and our AI will design an optimized automation plan, showing you exactly where you'll save time and money.",
        'aria-label': "Open Intelligent Automation Designer dialog",
        dialogTitle: "Intelligent Automation Designer",
        dialogDescription: "Describe a workflow to generate a configured, optimized task design, complete with AI suggestions.",
        dialogContent: <TaskAutomationForm />,
        ctaText: "Try It Free"
    }
];

const StrategicPartnerTextContent = () => (
    <motion.div
        className="space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainerCustom(0.1, 0)}
    >
        <motion.p variants={staggerItem} className="text-sm font-normal uppercase tracking-widest text-primary">What We Do</motion.p>
        <motion.h2 variants={staggerItem} className="font-headline text-fluid-xl font-bold !leading-snug">
            Make an Impact. Do More with Less.
        </motion.h2>
        <motion.p variants={staggerItem} className="text-muted-foreground text-fluid-base">
            Time and money are valuable commodities. Our solutions focus on precise targets and powerful automation, helping your business run leaner and smarter. We turn complexity into a competitive advantage so you can focus on your vision, not your operations.
        </motion.p>
    </motion.div>
);

export default function StrategicPartner() {
    return (
        <section id="strategic-partner" className="py-fluid-lg bg-secondary/20 scroll-mt-20">
            <div className="container mx-auto px-fluid-sm">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <StrategicPartnerTextContent />
                    <div className="space-y-8">
                        {interactiveCards.map((card, index) => (
                            <InteractiveCard
                                key={index}
                                customIndex={index}
                                {...card}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
