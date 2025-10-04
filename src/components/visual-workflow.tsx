
"use client";

import React from "react";
import { AutomateTaskDesignOutput } from "@/ai/flows/automated-task-design";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Workflow, CheckCircle, Lightbulb, BarChart, ExternalLink, ArrowDown, ArrowRight } from 'lucide-react';
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowIcon } from "./ui/arrow-icon";

interface VisualWorkflowProps {
  result: AutomateTaskDesignOutput;
}

export function VisualWorkflow({ result }: VisualWorkflowProps) {
  return (
    <div className="space-y-8">
      <Card className="bg-background/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{result.taskName}</CardTitle>
          <CardDescription>{result.objective}</CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-primary flex items-center gap-2 mb-2"><Workflow className="h-5 w-5" /> Trigger</h4>
          <Card className="bg-background/50">
            <CardContent className="p-4">
                <p className="font-medium text-foreground">{result.trigger}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>

        <div>
          <h4 className="font-semibold text-primary flex items-center gap-2 mb-2"><Workflow className="h-5 w-5" /> Workflow Steps</h4>
            <div className="space-y-2">
            {result.steps.map((step, index) => (
                <React.Fragment key={step.stepNumber}>
                <Card className="bg-background/50">
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">{step.stepNumber}</div>
                        <div>
                            <CardTitle className="text-base font-semibold">{step.action}</CardTitle>
                            <CardDescription className="text-sm">{step.details}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                 {index < result.steps.length - 1 && (
                    <div className="flex justify-center">
                        <ArrowDown className="h-6 w-6 text-muted-foreground" />
                    </div>
                )}
                </React.Fragment>
            ))}
          </div>
        </div>

         <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-2"><ExternalLink className="h-5 w-5" /> Required Integrations</h4>
                <Card className="bg-background/50">
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-2">
                            {result.integrations.map(integration => (
                                <Badge key={integration} variant="secondary">{integration}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div>
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-2"><BarChart className="h-5 w-5" /> Estimated Impact</h4>
                 <Card className="bg-background/50">
                    <CardContent className="p-4">
                        <p className="font-medium text-foreground">{result.estimatedImpact}</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div>
           <h4 className="font-semibold text-primary flex items-center gap-2 mb-2"><Lightbulb className="h-5 w-5" /> AI-Suggested Optimizations</h4>
            <Card className="bg-background/50">
                <CardContent className="p-4">
                    <ul className="space-y-3">
                        {result.optimizations.map(opt => (
                            <li key={opt} className="flex items-start gap-3 text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                                <span>{opt}</span>
                            </li>
                        ))}
                   </ul>
                </CardContent>
            </Card>
        </div>
      </div>

       <div className="text-center mt-12 pt-8 border-t border-dashed">
            <h3 className="text-2xl font-bold">Ready to bring this automation to life?</h3>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                Our team of experts can help you build, integrate, and manage this workflow to ensure it runs seamlessly within your business operations.
            </p>
            <Button asChild className="group mt-6 flex justify-center gap-2 items-center">
                <Link href="/contact">
                    Start a Project with Us
                    <ArrowIcon className="ml-2" />
                </Link>
            </Button>
        </div>
    </div>
  );
}
