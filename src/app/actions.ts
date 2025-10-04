
'use server';

import { 
  SolutionRecommendationInput, 
  SolutionRecommendationOutput,
  AutomateTaskDesignInput, 
  AutomateTaskDesignOutput,
  AIServiceManager 
} from '@/ai';
import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/emails/contact-form-email';
import { EnrollmentEmail } from '@/emails/enrollment-email';
import { logger } from '@/lib/logger';

import { getConfig } from '@/config';

const config = getConfig();
const resend = config.services.resend.enabled ? new Resend(config.services.resend.apiKey!) : null;
const toEmail = config.services.resend.toEmail;

// Initialize AI service manager with dependency injection
const aiServiceManager = AIServiceManager.createFromEnvironment();

type FormResult<T> = {
  data?: T;
  error?: string;
  success?: boolean;
};

// Solution Recommendation Action
export async function getSolutionRecommendation(
  input: SolutionRecommendationInput
): Promise<FormResult<SolutionRecommendationOutput>> {
  try {
    logger.info('Processing solution recommendation request', { input });
    const result = await aiServiceManager.getSolutionRecommendation(input);
    logger.info('Solution recommendation generated successfully');
    return { data: result };
  } catch (e: any) {
    logger.error('Error in getSolutionRecommendation:', e);
    return { error: e.message || 'An unknown error occurred while generating solution recommendation.' };
  }
}

// Automated Task Design Action
export async function getAutomatedTaskDesign(
  input: AutomateTaskDesignInput
): Promise<FormResult<AutomateTaskDesignOutput>> {
  try {
    logger.info('Processing automated task design request', { input });
    const result = await aiServiceManager.getAutomatedTaskDesign(input);
    logger.info('Automated task design generated successfully');
    return { data: result };
  } catch (e: any) {
    logger.error('Error in getAutomatedTaskDesign:', e);
    return { error: e.message || 'An unknown error occurred while generating automated task design.' };
  }
}

// Contact Form Action
const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string(),
});
export async function contactFormAction(data: z.infer<typeof contactFormSchema>): Promise<FormResult<null>> {
  if (!resend) {
      console.warn("RESEND_API_KEY is not set. Skipping email sending.");
      return { success: true }; // Pretend it worked to not show user an error
  }
  try {
    await resend.emails.send({
      from: 'LOG_ON Website <noreply@logon.com.ng>',
      to: toEmail,
      subject: `New Contact Form Submission: ${data.subject}`,
      reply_to: data.email,
      react: ContactFormEmail({
        name: data.name,
        email: data.email,
        phone: data.phone || 'Not provided',
        subject: data.subject,
        message: data.message,
      }),
    });
    return { success: true };
  } catch (e: any) {
    console.error('Error in contactFormAction:', e);
    return { error: e.message || 'An unknown error occurred.' };
  }
}

// Enrollment / Community Lead Form Action
const communityLeadSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  interest: z.string().optional(),
  date: z.date().optional(),
});
export async function communityLeadAction(data: z.infer<typeof communityLeadSchema>): Promise<FormResult<null>> {
   if (!resend) {
      console.warn("RESEND_API_KEY is not set. Skipping enrollment email.");
      return { success: true };
   }
   try {
    await resend.emails.send({
      from: 'LOG_ON Community Lead <noreply@logon.com.ng>',
      to: toEmail,
      subject: `New Community/Training Lead: ${data.interest || 'General Inquiry'}`,
      reply_to: data.email,
      react: EnrollmentEmail({
        name: data.name,
        email: data.email,
        phone: 'Not provided in this form',
        programName: data.interest || 'General Inquiry',
      }),
    });
    return { success: true };
  } catch (e: any) {
    console.error('Error in communityLeadAction:', e);
    return { error: e.message || 'An unknown error occurred.' };
  }
}
