'use server';

/**
 * @fileOverview This file defines a Genkit flow for visually designing and configuring automated IT tasks based on provided workflows.
 *
 * - automateTaskDesign - A function that handles the task automation design process.
 * - AutomateTaskDesignInput - The input type for the automateTaskDesign function.
 * - AutomateTaskDesignOutput - The return type for the automateTaskDesign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateTaskDesignInputSchema = z.object({
  workflowDescription: z
    .string()
    .describe('A description of the IT task workflow to be automated.'),
  optimizationSuggestions: z.string().optional().describe('Optional user-provided optimization suggestions.'),
});
export type AutomateTaskDesignInput = z.infer<typeof AutomateTaskDesignInputSchema>;

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
export type AutomateTaskDesignOutput = z.infer<typeof AutomateTaskDesignOutputSchema>;


export async function automateTaskDesign(input: AutomateTaskDesignInput): Promise<AutomateTaskDesignOutput> {
  return automateTaskDesignFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automateTaskDesignPrompt',
  input: {schema: AutomateTaskDesignInputSchema},
  output: {schema: AutomateTaskDesignOutputSchema},
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

const automateTaskDesignFlow = ai.defineFlow(
  {
    name: 'automateTaskDesignFlow',
    inputSchema: AutomateTaskDesignInputSchema,
    outputSchema: AutomateTaskDesignOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
