
'use server';
/**
 * @fileOverview A RAG-powered assistant flow that has deep knowledge of the company's services
 * and can use tools to book meetings or provide contact options.
 * This version includes pseudo-vector search, stateful tool coordination, proactive suggestions, and error resilience.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { insights } from '@/lib/data/insights';
import { caseStudies } from '@/lib/data/case-studies';
import { services, industryApplications } from '@/lib/data/solutions-data';
import { trainingPrograms } from '@/lib/data/training-data';
import { handleError, retryWithBackoff, AppError, ErrorCode } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

// 1. ENHANCED KNOWLEDGE BASE
// =================================================================
const knowledge = [
    ...insights.map(i => ({ type: 'Insight', title: i.title, content: i.description, slug: `/insights/${i.slug}`, tags: ['blog', 'article'] })),
    ...caseStudies.map(cs => ({ type: 'Case Study', title: cs.title, content: cs.description, slug: `/use-cases`, tags: ['proof', 'results'] })),
    ...services.map(s => ({ type: 'Service', title: s.title, content: s.description, slug: `/solutions#${s.id}`, tags: ['offering', 'pricing'] })),
    ...industryApplications.map(ia => ({ type: 'Industry Solution', title: ia.industry, content: `${ia.challenge} ${ia.solution}`, slug: `/use-cases#${ia.industry.toLowerCase().replace(/\s/g, '-')}`, tags: ['vertical', 'specialization'] })),
    ...trainingPrograms.map(tp => ({ type: 'Training', title: tp.title, content: tp.description, slug: `/training#programs`, tags: ['education', 'upskilling'] })),
];


// 2. REFINED TOOLS
// =================================================================

const searchKnowledgeBase = ai.defineTool(
    {
        name: 'searchKnowledgeBase',
        description: "Semantic search across LOG_ON's services, AI solutions, case studies, and training. Use this for ANY question about what the company does.",
        inputSchema: z.object({ query: z.string() }),
        outputSchema: z.array(z.object({
            type: z.string(),
            title: z.string(),
            content: z.string(),
            slug: z.string(),
            relevance: z.number()
        })),
    },
    async (input: { query: string }) => {
        // This is a "pseudo-vector" search. It weights title matches higher than content matches.
        const query = input.query.toLowerCase();
        const terms = query.split(' ').filter((t: string) => t.length > 2);
        
        return knowledge.map(doc => {
            let score = 0;
            const title = doc.title.toLowerCase();
            const content = doc.content.toLowerCase();

            if (title.includes(query)) score += 10; // High weight for full query in title
            if (content.includes(query)) score += 5; // Medium weight for full query in content

            terms.forEach(term => {
                if (title.includes(term)) score += 2;
                if (content.includes(term)) score += 1;
            });
            
            return { ...doc, relevance: score };
        })
        .filter(doc => doc.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 4); // Return top 4 results
    }
);

const bookMeeting = ai.defineTool({
    name: "bookMeeting",
    description: "Use this tool when the user expresses interest in a demo, consultation, or wants to discuss a project. It allows the user to book a meeting with the sales team.",
    inputSchema: z.object({
        interest: z.string().describe("The specific topic the user is interested in, e.g., 'AI Solutions', 'Web Development'.")
    }),
    outputSchema: z.object({
        status: z.literal("meeting_booked"),
        interest: z.string(),
    }),
}, async ({ interest }) => {
    return { status: "meeting_booked" as const, interest };
});

const provideContactOptions = ai.defineTool({
    name: "provideContactOptions",
    description: "Use this tool when the user explicitly asks to speak to a person, get contact details, or wants to use WhatsApp.",
    inputSchema: z.object({}),
    outputSchema: z.object({
        status: z.literal("contact_options_provided"),
        phone: z.string(),
        whatsapp: z.string(),
        email: z.string(),
    }),
}, async () => {
    const prefilledMessage = "Hi LOG_ON, I'm interested in learning more about your AI and automation solutions.";
    return {
        status: "contact_options_provided" as const,
        phone: "+234 814 306 6320",
        whatsapp: `https://wa.me/2348143066320?text=${encodeURIComponent(prefilledMessage)}`,
        email: "logonthepage@gmail.com",
    };
});


// 3. DEFINE THE INPUT/OUTPUT SCHEMAS
// =================================================================

const AssistantRequestSchema = z.object({
    history: z.array(z.object({
        role: z.enum(['user', 'assistant', 'tool']),
        content: z.string(),
    })).optional(),
    question: z.string(),
});
export type AssistantRequest = z.infer<typeof AssistantRequestSchema>;

const AssistantResponseSchema = z.object({
    answer: z.string().describe("Friendly, professional response using Markdown for lists/bolding."),
    search_query: z.string().optional().describe("If a search was performed, what was the query?"),
    sources: z.array(z.object({
        slug: z.string(),
        title: z.string(),
    })).optional(),
    suggested_actions: z.array(z.string()).min(2).max(3).describe("Contextual next steps. If user is browsing, suggest a related case study. If a user seems interested, suggest booking a meeting."),
    confidence_score: z.number().optional().describe("0-1 score of how well the search results answered the user.")
});
export type AssistantResponse = z.infer<typeof AssistantResponseSchema>;


// 4. DEFINE THE MAIN PROMPT & FLOW
// =================================================================

const assistantPrompt = ai.definePrompt({
  name: 'ragAssistantPrompt',
  input: { schema: AssistantRequestSchema },
  output: { schema: AssistantResponseSchema },
  tools: [searchKnowledgeBase, bookMeeting, provideContactOptions],
  prompt: `
    System Context:
    You are GIGPILOT, the Lead AI Strategist for LOG_ON (Nigeria's premier AI consultancy).
    
    Personality: 
    - Expert yet accessible. 
    - Use Nigerian English nuances where appropriate (warm, respectful) but maintain global professional standards.
    
    Operational Rules:
    1. ALWAYS check the knowledge base if the user asks "How do you...", "Do you...", or "Tell me about...".
    2. If multiple services are relevant, briefly summarize the top 2.
    3. CITE your sources using [Source Title](slug) format in the text where relevant.
    4. LEAD GEN: If the user asks about ROI, cost, or implementation, immediately offer a free consultation using the suggested_actions.
    5. Always provide at least 2 relevant suggested_actions to keep the conversation flowing.
    
    User Query: {{{question}}}
  `,
});

const ragAssistantFlow = ai.defineFlow(
    {
        name: 'ragAssistantFlow',
        inputSchema: AssistantRequestSchema,
        outputSchema: AssistantResponseSchema,
    },
    async (input) => {
        const { output } = await assistantPrompt(input);
        
        if (!output) {
            throw new Error("No response from AI engine");
        }
        
        // Ensure we always have suggested actions, even if the model fails to generate them.
        if (!output.suggested_actions || output.suggested_actions.length < 2) {
            output.suggested_actions = ["What are your main services?", "Tell me about a case study"];
        }
        
        return output;
    }
);

// Fallback response for error scenarios
const createFallbackResponse = (message: string): AssistantResponse => ({
  answer: message,
  suggested_actions: ["Chat on WhatsApp", "View Services Overview"],
  confidence_score: 0
});

export async function askRagAssistant(input: AssistantRequest): Promise<AssistantResponse> {
  try {
    const result = await retryWithBackoff(
      async () => {
        const response = await ragAssistantFlow(input);
        return response;
      },
      {
        maxRetries: 3,
        initialDelay: 1000,
        maxDelay: 10000,
        backoffMultiplier: 2,
        context: 'RAGAssistant'
      }
    );
    return result;
  } catch (error) {
    // Log the error with context
    handleError(error, 'RAGAssistant.askRagAssistant', { logLevel: 'error' });
    
    // Return graceful fallback response
    return createFallbackResponse(
      "I'm currently having a bit of trouble connecting. Please try again in a moment, or feel free to speak directly with our team via WhatsApp."
    );
  }
}
