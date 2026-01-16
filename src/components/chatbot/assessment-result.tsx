
"use client";

import { SolutionRecommendationOutput } from "@/ai/flows/solution-recommendation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { CheckCircle, Lightbulb, TrendingUp } from "lucide-react";

interface AssessmentResultProps {
  result: SolutionRecommendationOutput;
}

export function AssessmentResult({ result }: AssessmentResultProps) {
  return (
    <div className="space-y-6 text-left">
      <Card className="bg-background/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
            Executive Summary
          </CardTitle>
          <CardDescription>
            {result.executiveSummary.overview}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
            <p><strong className="text-primary">Primary Opportunity:</strong> {result.executiveSummary.primaryOpportunity}</p>
            <p><strong className="text-primary">Expected ROI Timeframe:</strong> {result.executiveSummary.expectedRoiTimeframe}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-background/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recommended Solution & Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">{result.recommendedSolutionPath.coreTechnology.solutionName}</h4>
            <p className="text-sm text-muted-foreground">{result.recommendedSolutionPath.coreTechnology.justification}</p>
          </div>
          <div>
             <h4 className="font-semibold mb-2">Projected Outcomes</h4>
             <ul className="space-y-2">
                {result.recommendedSolutionPath.expectedOutcomes.map((outcome) => (
                    <li key={outcome.metric} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span><strong>{outcome.metric}:</strong> {outcome.projectedImprovement} ({outcome.timeframe})</span>
                    </li>
                ))}
             </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background/50">
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2">
                {result.nextSteps.map((step) => (
                    <li key={step.actionItem} className="text-sm">
                       <strong>{step.actionItem}</strong> ({step.owner} - {step.deadline})
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>

    </div>
  );
}
