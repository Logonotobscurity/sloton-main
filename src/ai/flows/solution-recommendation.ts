
"use server";

import { ai } from "@/ai/genkit";
import { z } from "zod";

const SolutionRecommendationInputSchema = z.object({
  industry: z.string().min(3, "Please specify your industry."),
  challenge: z
    .string()
    .min(
      10,
      "Please describe your primary challenge in at least 10 characters."
    ),
  goals: z
    .string()
    .min(10, "Please describe your primary goals in at least 10 characters."),
});
export type SolutionRecommendationInput = z.infer<
  typeof SolutionRecommendationInputSchema
>;

const SolutionRecommendationOutputSchema = z.object({
  executiveSummary: z.object({
    overview: z.string().describe("A 1-2 paragraph executive summary of the proposed solution based on the user's challenge."),
    primaryOpportunity: z.string().describe("The single biggest opportunity the solution addresses."),
    expectedRoiTimeframe: z.string().describe("A realistic timeframe for return on investment, e.g., '3-6 months', '1-2 years'."),
  }),
  recommendedSolutionPath: z.object({
    coreTechnology: z.object({
      solutionName: z.string().describe("A clear, descriptive name for the core recommended technology or solution path."),
      justification: z.string().describe("Why this specific technology is the best fit for the user's problem."),
    }),
    expectedOutcomes: z.array(z.object({
      metric: z.string().describe("A specific, measurable metric that will be improved, e.g., 'Customer Support Costs', 'Cart Abandonment Rate'."),
      projectedImprovement: z.string().describe("The projected percentage or value improvement for the metric, e.g., '-25%', '+10%'."),
      timeframe: z.string().describe("The expected timeframe to see this outcome, e.g., '3 months'."),
    })).describe("A list of 2-3 specific, measurable outcomes."),
  }),
  nextSteps: z.array(z.object({
    actionItem: z.string().describe("A clear, actionable next step."),
    owner: z.string().describe("Who is responsible for this action item, e.g., 'Client', 'Development Team', 'Sales Team'."),
    deadline: z.string().describe("A suggested deadline for the action item, e.g., '1 week', '2 weeks'."),
  })).describe("A list of 3-4 immediate next steps for the client."),
});

export type SolutionRecommendationOutput = z.infer<
  typeof SolutionRecommendationOutputSchema
>;

const solutionRecommendationPrompt = ai.definePrompt({
  name: "solutionRecommendationPrompt",
  input: { schema: SolutionRecommendationInputSchema },
  output: { schema: SolutionRecommendationOutputSchema },
  prompt: `You are an expert technology consultant for a company called LOG_ON. Your task is to analyze a potential client's business needs and generate a concise, high-level, and actionable solution recommendation.

The client will provide their industry, a primary business challenge, and their main goals.

Based on this input, generate a structured recommendation that includes:
1.  **Executive Summary**: A brief overview of the problem and the proposed solution's value.
2.  **Recommended Solution Path**: The core technology to use and the expected measurable outcomes.
3.  **Next Steps**: A clear, actionable plan to move forward.

Client Input:
- Industry: {{{industry}}}
- Primary Challenge: {{{challenge}}}
- Goals: {{{goals}}}

Generate a realistic and compelling recommendation that addresses their specific situation. Focus on tangible business value.
`,
});

const solutionRecommendationFlow = ai.defineFlow(
  {
    name: "solutionRecommendationFlow",
    inputSchema: SolutionRecommendationInputSchema,
    outputSchema: SolutionRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await solutionRecommendationPrompt(input);
    return output!;
  }
);

export async function getSolutionRecommendation(input: SolutionRecommendationInput): Promise<SolutionRecommendationOutput> {
  return await solutionRecommendationFlow(input);
}
