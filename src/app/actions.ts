
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/emails/contact-form-email';
import { EnrollmentEmail } from '@/emails/enrollment-email';
import { automateTaskDesign } from '@/ai/flows/automated-task-design';
import { getSolutionRecommendation } from '@/ai/flows/solution-recommendation';
import { askRagAssistant } from '@/ai/flows/rag-assistant';
import { handleError, AppError, ErrorCode } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const toEmail = process.env.TO_EMAIL || 'logonthepage@gmail.com';
const webhookUrl = process.env.THIRD_PARTY_WEBHOOK_URL;

type FormResult<T> = {
  data?: T;
  error?: string;
  success?: boolean;
};

// --- Webhook Function ---
async function sendToWebhook(payload: Record<string, unknown>, submissionType: string) {
  if (!webhookUrl) {
    logger.info('[Actions] No webhook URL configured. Skipping webhook send.');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        submissionType,
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      logger.error(`[Actions] Webhook failed with status: ${response.status}`, { submissionType });
    } else {
      logger.info('[Actions] Successfully sent data to webhook.', { submissionType });
    }
  } catch (error) {
    handleError(error, 'Actions.sendToWebhook', { logLevel: 'error' });
  }
}

export async function askSupportBot(history: { role: 'user' | 'assistant' | 'tool'; content: string }[], question: string) {
  try {
      const result = await askRagAssistant({ history, question });
      return { data: result };
  } catch (error) {
      const errorResponse = handleError(error, 'Actions.askSupportBot', { logLevel: 'error' });
      return { error: errorResponse.error.message };
  }
}

const automatedTaskSchema = z.object({
    workflowDescription: z.string(),
    optimizationSuggestions: z.string().optional(),
});

export async function getAutomatedTaskDesign(values: z.infer<typeof automatedTaskSchema>) {
    try {
        const result = await automateTaskDesign(values);
        return { data: result };
    } catch (error) {
        const errorResponse = handleError(error, 'Actions.getAutomatedTaskDesign', { logLevel: 'error' });
        return { error: errorResponse.error.message };
    }
}

const solutionRecommendationSchema = z.object({
    industry: z.string(),
    challenge: z.string(),
    goals: z.string(),
});

export async function getSolutionRecommendationAction(values: z.infer<typeof solutionRecommendationSchema>) {
    const result = await getSolutionRecommendation(values);
    return {
        data: result,
    };
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
      logger.warn('[Actions] RESEND_API_KEY is not set. Skipping email sending.');
  } else {
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
        logger.info('[Actions] Contact form email sent successfully', { subject: data.subject });
      } catch (error) {
        const errorResponse = handleError(error, 'Actions.contactFormAction', { logLevel: 'error' });
        return { error: errorResponse.error.message };
      }
  }

  // Send data to webhook
  await sendToWebhook(data as Record<string, unknown>, 'Contact Form');
  
  return { success: true };
}

// Enrollment / Community Lead Form Action
const communityLeadSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  interest: z.string().optional(),
  date: z.date().optional(),
});

const newsletterSignupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export async function newsletterSignupAction(data: z.infer<typeof newsletterSignupSchema>): Promise<FormResult<null>> {
  const parsed = newsletterSignupSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message || 'Please enter a valid email address.' };
  }

  if (!resend) {
    logger.warn('[Actions] RESEND_API_KEY is not set. Skipping newsletter notification email.');
  } else {
    try {
      await resend.emails.send({
        from: 'LOG_ON Newsletter <noreply@logon.com.ng>',
        to: toEmail,
        subject: 'New Newsletter Signup',
        reply_to: parsed.data.email,
        text: `New newsletter signup: ${parsed.data.email}`,
      });
      logger.info('[Actions] Newsletter signup email sent successfully');
    } catch (error) {
      const errorResponse = handleError(error, 'Actions.newsletterSignupAction', { logLevel: 'error' });
      return { error: errorResponse.error.message };
    }
  }

  await sendToWebhook(parsed.data, 'Newsletter Signup');

  return { success: true };
}

export async function communityLeadAction(data: z.infer<typeof communityLeadSchema>): Promise<FormResult<null>> {
   if (!resend) {
      logger.warn('[Actions] RESEND_API_KEY is not set. Skipping enrollment email.');
   } else {
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
        logger.info('[Actions] Community lead email sent successfully', { interest: data.interest });
      } catch (error) {
        const errorResponse = handleError(error, 'Actions.communityLeadAction', { logLevel: 'error' });
        return { error: errorResponse.error.message };
      }
   }

  // Send data to webhook
  await sendToWebhook(data as unknown as Record<string, unknown>, `Lead Form: ${data.interest || 'General Inquiry'}`);

  return { success: true };
}
