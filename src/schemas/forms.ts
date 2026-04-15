import { z } from 'zod';

/**
 * Contact Form Schema
 * Used for general contact inquiries
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Solution Recommendation Form Schema
 * Used for AI-powered solution recommendations
 */
export const solutionRecommendationSchema = z.object({
  industry: z.string().min(2, { message: 'Please select your industry.' }),
  companySize: z.string().min(1, { message: 'Please select company size.' }),
  challenges: z.string().min(20, { message: 'Please describe your challenges (minimum 20 characters).' }),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});

export type SolutionRecommendationData = z.infer<typeof solutionRecommendationSchema>;

/**
 * Task Automation Form Schema
 * Used for automated task design requests
 */
export const taskAutomationSchema = z.object({
  taskName: z.string().min(3, { message: 'Task name must be at least 3 characters.' }),
  taskDescription: z.string().min(20, { message: 'Please provide a detailed description (minimum 20 characters).' }),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'on-demand'], {
    errorMap: () => ({ message: 'Please select task frequency.' }),
  }),
  currentProcess: z.string().min(10, { message: 'Please describe your current process (minimum 10 characters).' }),
  desiredOutcome: z.string().min(10, { message: 'Please describe the desired outcome (minimum 10 characters).' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});

export type TaskAutomationData = z.infer<typeof taskAutomationSchema>;

/**
 * Newsletter Subscription Schema
 */
export const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
