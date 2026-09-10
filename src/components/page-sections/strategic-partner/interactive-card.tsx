"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const MotionCard = motion.create(Card);

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

export const InteractiveCard = ({ icon, title, description, dialogTitle, dialogDescription, dialogContent, customIndex, 'aria-label': ariaLabel, ctaText }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    dialogTitle: string;
    dialogDescription: string;
    dialogContent: React.ReactNode;
    customIndex: number;
    'aria-label': string;
    ctaText?: string;
}) => (
    <Dialog>
        <DialogTrigger asChild>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={createCardVariants(customIndex)}
                className="w-full"
            >
                <button aria-label={ariaLabel} className="w-full text-left">
                    <MotionCard className="group cursor-pointer transition-all duration-300 hover:border-primary hover:-translate-y-2 bg-background/80 flex flex-col h-full">
                        <div className="flex-grow p-6 md:p-8">
                            <div className="p-3 md:p-4 rounded-full bg-primary/10 mb-4 w-fit">
                                {icon}
                            </div>
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription className="mt-2">
                                {description}
                            </CardDescription>
                        </div>
                        <CardFooter className="p-6 md:p-8 pt-0">
                            <span className="p-0 text-primary group-hover:text-primary/90 flex items-center font-semibold">
                                {ctaText || "Get Your Custom Plan"} <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        </CardFooter>
                    </MotionCard>
                </button>
            </motion.div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl md:max-w-2xl bg-background">
            <DialogHeader>
                <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
                <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            {dialogContent}
        </DialogContent>
    </Dialog>
);
