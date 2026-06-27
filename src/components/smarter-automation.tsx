
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Check, Cog } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TaskAutomationForm } from './task-automation-form';
import { GlowingCard } from './ui/glowing-card';

const popularWorkflows = [
    "Automate Lead Conversion & Follow-up",
    "Streamline Financial Reporting & Compliance",
    "Accelerate Employee Onboarding",
    "Automate Marketing Campaign Execution",
    "Resolve Customer Support Tickets Faster"
]

export function SmarterAutomation() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-normal uppercase tracking-widest text-primary">03/ Our Platform</p>
            <h2 className="font-headline text-[clamp(2rem,5vw,3rem)] font-bold !leading-snug mt-4">
              The Fastest Path to Automation
            </h2>
            <p className="text-muted-foreground text-md md:text-lg mt-4">
              Describe any business process in plain English. Get a complete, optimized automation plan in seconds—showing exactly how to reduce costs and save time.
            </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-stretch mt-12">
            <GlowingCard className="w-full">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="cursor-pointer h-full flex flex-col p-8">
                             <CardHeader className="p-0">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
                                    <Bot className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="pt-4 text-xl">Automation Designer</CardTitle>
                             </CardHeader>
                             <CardContent className="p-0 flex-grow pt-2">
                                <CardDescription>Our AI-powered designer understands your needs and generates custom workflows instantly.</CardDescription>
                             </CardContent>
                             <CardFooter className="p-0 pt-6">
                                <Button className="w-full">
                                    Create a Workflow <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                             </CardFooter>
                        </div>
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
            </GlowingCard>

            <Card className="bg-secondary/20 p-8">
                <CardHeader className="p-0">
                    <CardTitle>Popular Business Solutions</CardTitle>
                    <CardDescription>Explore solutions for every part of your business.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6">
                    <ul className="space-y-3">
                        {popularWorkflows.map(item => (
                            <li key={item} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                 <CardFooter className="p-0 pt-6">
                    <Button asChild variant="outline">
                        <Link href="/automation">
                            Explore All Templates <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>
      </div>
    </section>
  );
}
