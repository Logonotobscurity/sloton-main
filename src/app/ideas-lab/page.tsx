
import { PageHero } from '@/components/page-sections/page-hero';
import { Lightbulb, Copy } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
export const metadata: Metadata = {
  title: 'Ideas Lab | AI Experiments & Prompt Engineering for Automation',
  description: 'A space for experimental concepts in workplace AI. See the prompts used to build AI agent development features and automation solutions.',
};

const companyReportPrompt = `
# PROMPT: Generate a Full-Stack Company Report Application

## 1. Core Objective
Create a complete, production-ready, full-stack Next.js application that allows users to generate a detailed company report based on a company name. The application should have a professional, modern, and clean user interface using ShadCN UI components and Tailwind CSS.

## 2. Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI (pre-installed in the project)
- **AI/Backend:** Genkit with Google AI (Gemini)
- **Icons:** lucide-react

## 3. Application Structure & Pages

### 3.1. Main Page (\`/src/app/page.tsx\`)
- **Layout:** A single-page interface, centered on the screen.
- **Header:** A clean, bold title like "AI Company Report Generator".
- **Input Form:**
    - A form built with ShadCN's \`Form\`, \`Input\`, and \`Button\` components.
    - Three input fields:
        1.  'Full Name' (text input)
        2.  'Phone Number' (tel input)
        3.  'Company Name' (text input) - This is the primary input for the report.
    - All fields must be required and include basic validation (e.g., name length, valid phone format, company name not empty).
- **Submit Button:** A prominent button labeled "Generate Report". It should show a loading spinner/state while the report is being generated.
- **Report Display Area:**
    - Initially, this area should be empty or show a placeholder message like "Your company report will appear here."
    - After generation, the report should be displayed here in a well-structured and styled format.

### 3.2. Genkit AI Flow (\`/src/ai/flows/company-report-flow.ts\`)
- This file will contain the core AI logic. It should be a Next.js Server Action file ('use server').
- **Input Schema (Zod):**
    - \`name: z.string()\`
    - \`phone: z.string()\`
    - \`companyName: z.string()\`
- **Output Schema (Zod):**
    - The schema must define the structure of the entire company report. Be comprehensive.
    - \`companyProfile\`:
        - \`name: z.string()\`
        - \`summary: z.string().describe("A 1-2 paragraph executive summary of the company.")\`
        - \`industry: z.string()\`
        - \`foundedDate: z.string()\`
        - \`keyExecutives: z.array(z.object({ name: z.string(), title: z.string() }))\`
    - \`swotAnalysis\`:
        - \`strengths: z.array(z.string()).describe("A list of 3-4 key strengths.")\`
        - \`weaknesses: z.array(z.string()).describe("A list of 3-4 key weaknesses.")\`
        - \`opportunities: z.array(zstring()).describe("A list of 3-4 key opportunities.")\`
        - \`threats: z.array(z.string()).describe("A list of 3-4 key threats.")\`
    - \`marketPresence\`:
        - \`keyCompetitors: z.array(z.string()).describe("A list of 3-5 main competitors.")\`
        - \`marketPosition: z.string().describe("A summary of their position in the market (e.g., Leader, Challenger, Niche).")\`
    - \`recentNews\`:
        - \`articles: z.array(z.object({ title: z.string(), summary: z.string(), source: z.string() })).describe("A list of 2-3 recent, relevant news articles.")\`
- **Genkit Prompt:**
    - Use \`ai.definePrompt\`.
    - The prompt should clearly instruct the AI model (Gemini) to act as an expert business analyst.
    - It must use the user-provided \`companyName\` as the subject.
    - The prompt should instruct the model to search for public information and generate a comprehensive report that STRICTLY adheres to the defined output schema.

### 3.3. Server Action (\`/src/app/actions.ts\`)
- Create a new exported async function \`getCompanyReport(input: CompanyReportInput): Promise<CompanyReportOutput>\`.
- This function will call the Genkit flow created in the previous step.
- It should include robust error handling (try/catch block) and return a structured object indicating success or failure.

## 4. User Experience & UI Details
- **Loading State:** When the "Generate Report" button is clicked, it should become disabled, and a loading spinner (e.g., \`<Loader2 className="animate-spin" />\`) should appear.
- **Report Display:**
    - Use ShadCN \`Card\` components to structure the report.
    - The main sections (Company Profile, SWOT Analysis, etc.) should be distinct cards or sections within a larger card.
    - Use \`CardHeader\`, \`CardTitle\`, \`CardDescription\`, and \`CardContent\`.
    - Use lists (\`<ul>\`, \`<li>\`) for arrays like Strengths, Weaknesses, Competitors, etc. Use a \`<Check />\` icon from lucide-react for each list item for better visual appeal.
- **Responsiveness:** The layout must be fully responsive, stacking cleanly on mobile devices.

## 5. Final Implementation Steps
1.  Create the main page UI in \`/src/app/page.tsx\`.
2.  Implement the Genkit flow with Zod schemas in \`/src/ai/flows/company-report-flow.ts\`.
3.  Create the server action wrapper in \`/src/app/actions.ts\`.
4.  Connect the front-end form to the server action, handle the loading state, and render the resulting report data.
5.  Ensure all styling is clean, modern, and consistent with the ShadCN design system.
`;


export default function IdeasLabPage() {
  return (
    <div>
      <PageHero
        title="Ideas Lab"
        description="A space for experimental concepts, AI generation prompts, and new approaches we are testing at LOG_ON. Here, we document the prompts and architectural decisions used to build our features, providing transparency and a blueprint for future innovation."
        icon={<Lightbulb className="h-12 w-12 md:h-16 md:w-16 text-primary" />}
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg space-y-12">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">App Idea: Company Report Generator</CardTitle>
                <CardDescription>A full-stack application that takes a company name and generates a detailed business report using AI.</CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold text-lg mb-2">Generation Prompt</h3>
                <p className="text-muted-foreground mb-4">
                    The following prompt was designed to be given to a large language model with coding capabilities to generate the application described.
                </p>
                <div className="relative p-4 bg-secondary/50 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono overflow-x-auto">
                        <code>{companyReportPrompt.trim()}</code>
                    </pre>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
