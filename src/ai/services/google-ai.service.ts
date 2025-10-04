/**
 * Google AI service implementation using Genkit
 */

'use server';

import { IAIService } from './ai-service.interface';
import { SolutionRecommendationInput, SolutionRecommendationOutput } from '@/ai/flows/solution-recommendation';
import { AutomateTaskDesignInput, AutomateTaskDesignOutput } from '@/ai/flows/automated-task-design';
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Import existing flow schemas
const SolutionRecommendationInputSchema = z.object({
  businessNeeds: z.string().describe('A more detailed, free-text description of the business needs and challenges.'),
  companySize: z.string().describe('The size of the company (e.g., small, medium, large).'),
  industry: z.string().describe('The industry of the company.'),
  budget: z.string().describe('The budget allocated for IT solutions and automation.'),
  name: z.string().optional().describe("The user's name."),
  email: z.string().optional().describe("The user's email address."),
  phone: z.string().optional().describe("The user's phone number."),
});

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

const AutomateTaskDesignInputSchema = z.object({
  workflowDescription: z.string().describe('A description of the IT task workflow to be automated.'),
  optimizationSuggestions: z.string().optional().describe('Optional user-provided optimization suggestions.'),
});

const AutomateTaskDesignOutputSchema = z.object({
  taskName: z.string().describe("A concise, descriptive name for the automated task."),
  objective: z.string().describe("A one-sentence summary of the automation's primary goal."),
  trigger: z.string().describe("The specific event that initiates the workflow (e.g., 'New user signs up', 'Invoice received in mailbox')."),
  steps: z.array(z.object({
    stepNumber: z.number().describe("The sequence number of the step."),
    action: z.string().describe("The high-level action being performed in this step (e.g., 'Send Welcome Email', 'Extract Invoice Data')."),
    details: z.string().describe("A brief explanation of what happens in this step, including any logic or conditions."),
  })).describe("A step-by-step breakdown of the automation workflow."),
  integrations: z.array(z.string()).describe("A list of systems, applications, or APIs that need to be connected for this automation (e.g., 'Gmail API', 'Salesforce CRM', 'Slack')."),
  optimizations: z.array(z.string()).describe("A list of 2-3 AI-suggested optimizations to improve the workflow's efficiency, reduce costs, or add value."),
  estimatedImpact: z.string().describe("A summary of the expected business benefits, such as 'Saves approx. 5-8 hours per week' or 'Reduces data entry errors by over 95%'."),
});

export class GoogleAIService implements IAIService {
  private static instance: GoogleAIService;

  private constructor() {}

  public static getInstance(): GoogleAIService {
    if (!GoogleAIService.instance) {
      GoogleAIService.instance = new GoogleAIService();
    }
    return GoogleAIService.instance;
  }

  async getSolutionRecommendation(input: SolutionRecommendationInput): Promise<SolutionRecommendationOutput> {
    try {
      const prompt = ai.definePrompt({
        name: 'solutionRecommendationPrompt',
        input: { schema: SolutionRecommendationInputSchema },
        output: { schema: SolutionRecommendationOutputSchema },
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
        *   Write a detailed justification explaining *why* this technology is the best fit, directly tying it to the user's stated needs and goals.
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

      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      console.error('Error in GoogleAIService.getSolutionRecommendation:', error);
      throw new Error('Failed to generate solution recommendation');
    }
  }

  async getAutomatedTaskDesign(input: AutomateTaskDesignInput): Promise<AutomateTaskDesignOutput> {
    try {
      const prompt = ai.definePrompt({
        name: 'automateTaskDesignPrompt',
        input: { schema: AutomateTaskDesignInputSchema },
        output: { schema: AutomateTaskDesignOutputSchema },
        prompt: `You are an expert Automation Architect. Your task is to transform a user's workflow description into a professional, structured automation plan. The plan must be clear, logical, and actionable.

Follow these instructions precisely:
1.  **Analyze the User's Request:** Read the workflow description and any optimization suggestions carefully.
2.  **Structure the Output:** Generate a JSON object that strictly adheres to the provided output schema.
3.  **Task Name and Objective:** Create a clear, professional name for the task and a concise objective.
4.  **Define the Trigger:** Clearly state the single event that starts the workflow.
5.  **Detail the Steps:** Break down the workflow into a logical sequence of steps. Each step must have a clear action and detailed description.
6.  **Identify Integrations:** List all the necessary software, apps, or APIs that need to be connected.
7.  **Suggest Optimizations:** Provide 2-3 concrete, value-adding suggestions to improve the user's initial idea. Think about error handling, notifications, or deeper integration.
8.  **Estimate Impact:** Quantify the potential benefits in terms of time saved, error reduction, or other relevant metrics. Be realistic.

User's Workflow Description:
{{{workflowDescription}}}

User's Optimization Suggestions (if any):
{{{optimizationSuggestions}}}
`,
      });

      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      console.error('Error in GoogleAIService.getAutomatedTaskDesign:', error);
      throw new Error('Failed to generate automated task design');
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Simple health check by trying to access the AI service
      const testInput = {
        workflowDescription: 'Test workflow',
        optimizationSuggestions: 'Test suggestions'
      };
      
      await this.getAutomatedTaskDesign(testInput);
      return true;
    } catch (error) {
      console.error('Google AI service health check failed:', error);
      return false;
    }
  }

  getProviderName(): string {
    return 'Google AI (Gemini)';
  }
}