"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Bot } from "lucide-react";

export function IdeasLab() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">From the Ideas Lab</h2>
            <p className="mt-4 text-md md:text-lg text-muted-foreground">
                An experimental concept we are testing. Interact with our AI-powered gig economy assistant, GIGPILOT.
            </p>
        </div>
        <div className="max-w-md mx-auto">
            <Card 
              className="group cursor-pointer transition-all duration-300 hover:border-primary hover:-translate-y-2 bg-background/80 flex flex-col h-full"
              onClick={() => {
                // Trigger Botpress webchat to open
                if (typeof window !== 'undefined' && (window as any).botpress) {
                  (window as any).botpress.open();
                }
              }}
            >
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Bot className="h-10 w-10 text-primary" />
                        <div>
                            <CardTitle>GIGPILOT: AI Gig Economy Assistant</CardTitle>
                            <CardDescription>Your AI-powered guide to navigating the gig economy.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button variant="ghost" className="p-0 text-primary group-hover:text-primary/90">
                        Launch Assistant <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
