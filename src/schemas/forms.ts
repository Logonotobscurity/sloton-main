import { z } from 'zod';

const trimmed = (min: number, max: number, message: string) =>
  z.string().trim().min(min, { message }).max(max, { message: `Must be at most ${max} characters.` });

export const contactFormSchema = z.object({
  name: trimmed(2, 120, 'Name must be at least 2 characters.'),
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }).max(254),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: trimmed(5, 200, 'Subject must be at least 5 characters.'),
  message: trimmed(10, 5000, 'Message must be at least 10 characters.'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const solutionRecommendationSchema = z.object({
  industry: trimmed(2, 120, 'Please select your industry.'),
  challenge: trimmed(10, 4000, 'Please describe your challenges (minimum 10 characters).'),
  goals: trimmed(10, 4000, 'Please describe your goals (minimum 10 characters).'),
});

export type SolutionRecommendationData = z.infer<typeof solutionRecommendationSchema>;

export const taskAutomationSchema = z.object({
  workflowDescription: trimmed(10, 8000, 'Please describe the workflow (minimum 10 characters).'),
  optimizationSuggestions: z.string().trim().max(4000).optional(),
});

export type TaskAutomationData = z.infer<typeof taskAutomationSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }).max(254),
  name: z.string().trim().min(2).max(120).optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

export const communityLeadSchema = z.object({
  name: trimmed(2, 120, 'Name must be at least 2 characters.'),
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }).max(254),
  interest: z.string().trim().max(200).optional(),
  date: z.coerce.date().optional(),
});

export type CommunityLeadData = z.infer<typeof communityLeadSchema>;

export const visibilityProfileSchema = z.object({
  name: trimmed(2, 120, "Name must be at least 2 characters."),
  email: z.string().trim().email({ message: "Please enter a valid email address." }).max(254),
  business: trimmed(8, 4000, "Tell us what you do."),
  services: z.string().trim().max(4000).optional().or(z.literal("")),
  location: z.string().trim().max(400).optional().or(z.literal("")),
  contact: z.string().trim().max(400).optional().or(z.literal("")),
  customers: z.string().trim().max(4000).optional().or(z.literal("")),
  proof: z.string().trim().max(4000).optional().or(z.literal("")),
});

export type VisibilityProfileData = z.infer<typeof visibilityProfileSchema>;

export const supportBotSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'tool']),
        content: z.string().max(4000),
      })
    )
    .max(20)
    .optional()
    .default([]),
  question: trimmed(1, 2000, 'Please enter a question.'),
});
