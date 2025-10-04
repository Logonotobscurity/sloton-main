
'use server';

/**
 * @fileOverview Recommends IT solutions and automation strategies based on user's business needs.
 *
 * - solutionRecommendation - A function that handles the solution recommendation process.
 * - SolutionRecommendationInput - The input type for the solutionRecommendation function.
 * - SolutionRecommendationOutput - The return type for the solutionRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolutionRecommendationInputSchema = z.object({
  businessNeeds: z
    .string()
    .describe('A more detailed, free-text description of the business needs and challenges.'),
  companySize: z
    .string()
    .describe('The size of the company (e.g., small, medium, large).'),
  industry: z.string().describe('The industry of the company.'),
  budget: z
    .string()
    .describe('The budget allocated for IT solutions and automation.'),
  name: z.string().optional().describe("The user's name."),
  email: z.string().optional().describe("The user's email address."),
  phone: z.string().optional().describe("The user's phone number."),
});
export type SolutionRecommendationInput = z.infer<typeof SolutionRecommendationInputSchema>;

const SolutionRecommendationOutputSchema = z.object({
  executiveSummary: z.object({
      overview: z.string().describe("A 2-3 sentence overview of the user's situation and the strategic direction recommended."),
      primaryOpportunity: z.string().describe("The single most significant opportunity identified that will provide the highest impact."),
      expectedRoiTimeframe: z.string().describe("A realistic, estimated timeframe for seeing a return on investment (e.g., '3-6 months', 'Within the first year').")
  }).describe("A high-level summary of the strategic recommendation."),

  recommendedSolutionPath: z.object({
      coreTechnology: z.object({
          solutionName: z.string().describe("A clear, descriptive name for the core technology solution being recommended (e.g., 'AI-Powered Customer Support Automation', 'Automated Financial Reporting System')."),
          justification: z.string().describe("A paragraph explaining why this specific technology is the right fit, directly tying it to the user's stated needs and goals.")
      }),
      expectedOutcomes: z.array(z.object({
          metric: z.string().describe("The specific business metric that will be improved (e.g., 'Customer Support Tickets', 'Manual Data Entry Time')."),
          currentState: z.string().describe("The current state of the metric, if provided or can be inferred (e.g., '100 tickets/day', '15 hours/week'). If not known, state 'Not specified'."),
          projectedImprovement: z.string().describe("A specific, quantifiable projected improvement (e.g., 'Reduced by 30-40%', 'Eliminated')."),
          timeframe: z.string().describe("The estimated time to achieve this outcome (e.g., 'First 30 days', 'Within 3 months').")
      })).describe("A list of 2-3 concrete, measurable outcomes the user can expect.")
  }).describe("The detailed, recommended solution and its expected impact."),

  nextSteps: z.array(z.object({
      actionItem: z.string().describe("A specific action item for the next step."),
      owner: z.string().describe("Who is responsible for this action (e.g., 'Client', 'LOG_ON')."),
      deadline: z.string().describe("A suggested deadline or timeframe for this action (e.g., 'Within 24 hours', 'Next 3 business days').")
  })).describe("A list of 2-3 clear, actionable next steps to move forward."),
});
export type SolutionRecommendationOutput = z.infer<typeof SolutionRecommendationOutputSchema>;


export async function solutionRecommendation(input: SolutionRecommendationInput): Promise<SolutionRecommendationOutput> {
  // In a real application, you would save the lead (name, email, needs) to a CRM here.
  console.log("Lead captured:", input);
  return solutionRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solutionRecommendationPrompt',
  input: {schema: SolutionRecommendationInputSchema},
  output: {schema: SolutionRecommendationOutputSchema},
  prompt: `You are an expert Solutions Architect for LOG_ON, a technology consulting firm. Your goal is to provide a high-value, actionable technology roadmap based on a prospective client's inputs. This report must be professional, data-driven, and clearly tied to their stated goals and challenges.

The user has provided the following information:
- Name: {{{name}}}
- Company Size: {{{companySize}}}
- Industry: {{{industry}}}
- Detailed Needs: {{{businessNeeds}}}
- Budget: {{{budget}}}

Your task is to generate a personalized Technology Assessment Report. You MUST follow this structure EXACTLY and adhere to these instructions:

**Report Generation Instructions:**

1.  **Analyze the Inputs:** Carefully review all the user's inputs. Connect their goals to their challenges and business needs. Use the company size, industry, and budget to tailor the scope and scale of your recommendations.

2.  **Executive Summary:**
    *   Write a concise overview summarizing the user's situation and your proposed path forward.
    *   Identify and articulate the single most impactful opportunity for the client.
    *   Provide a realistic estimated timeframe for Return on Investment (ROI).

3.  **Recommended Solution Path:**
    *   **Core Technology:**
        *   Provide a clear, descriptive name for the core solution.
        *   Write a detailed justification explaining *why* this technology is the best fit for their specific problems.
    *   **Expected Outcomes (Generate 2-3):**
        *   For each outcome, define the specific business **Metric** that will be improved.
        *   Describe the **Current State** of that metric (if known, otherwise state 'Not specified').
        *   Provide a concrete, quantifiable **Projected Improvement** (e.g., "reduce by X%", "increase by Y%").
        *   State the **Timeframe** to achieve this improvement.

4.  **Next Steps (Generate 2-3):**
    *   Provide a list of clear, simple next steps to keep the conversation moving.
    *   Assign an **Owner** ('LOG_ON' or 'Client') and a **Deadline** for each action.

**Tone and Style:**
*   **Expert & Confident:** Use the language of a seasoned solutions architect. Be direct, clear, and professional.
*   **Value-Oriented:** Frame everything in terms of business value, ROI, and solving problems.
*   **Action-Oriented:** The entire report should feel like a clear, actionable plan.

Generate the report now based on the user's information.
`,
});

const solutionRecommendationFlow = ai.defineFlow(
  {
    name: 'solutionRecommendationFlow',
    inputSchema: SolutionRecommendationInputSchema,
    outputSchema: SolutionRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
