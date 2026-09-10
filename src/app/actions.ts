'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/emails/contact-form-email';
import { EnrollmentEmail } from '@/emails/enrollment-email';
import { automateTaskDesign } from '@/ai/flows/automated-task-design';
import { getSolutionRecommendation } from '@/ai/flows/solution-recommendation';
import { askRagAssistant } from '@/ai/flows/rag-assistant';
import { handleError } from '@/lib/error-handler';
import { logger } from '@/lib/logger';
import { assertActionRateLimit, clientSafeMessage } from '@/lib/action-guard';
import { captureServerEvent } from '@/lib/posthog-server';
import {
  contactFormSchema,
  newsletterSchema,
  communityLeadSchema,
  visibilityProfileSchema,
  solutionRecommendationSchema,
  taskAutomationSchema,
  supportBotSchema,
} from '@/schemas/forms';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const toEmail = process.env.TO_EMAIL || 'logonthepage@gmail.com';
const webhookUrl = process.env.THIRD_PARTY_WEBHOOK_URL;

type FormResult<T> = {
  data?: T;
  error?: string;
  success?: boolean;
};

function sanitizeWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

async function sendToWebhook(payload: Record<string, unknown>, submissionType: string) {
  if (!webhookUrl) {
    logger.info('[Actions] No webhook URL configured. Skipping webhook send.');
    return;
  }

  if (!sanitizeWebhookUrl(webhookUrl)) {
    logger.error('[Actions] Invalid webhook URL configuration');
    return;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.WEBHOOK_HMAC_SECRET
          ? { 'X-Webhook-Secret': process.env.WEBHOOK_HMAC_SECRET }
          : {}),
      },
      body: JSON.stringify({
        ...payload,
        submissionType,
        receivedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      logger.error(`[Actions] Webhook failed with status: ${response.status}`, { submissionType });
    } else {
      logger.info('[Actions] Successfully sent data to webhook.', { submissionType });
    }
  } catch (error) {
    handleError(error, 'Actions.sendToWebhook', { logLevel: 'error' });
  }
}

export async function askSupportBot(
  history: { role: 'user' | 'assistant' | 'tool'; content: string }[],
  question: string
) {
  try {
    await assertActionRateLimit('ai');
    const parsed = supportBotSchema.parse({ history, question });
    const result = await askRagAssistant({ history: parsed.history, question: parsed.question });
    return { data: result };
  } catch (error) {
    handleError(error, 'Actions.askSupportBot', { logLevel: 'error' });
    return { error: clientSafeMessage(error, 'Unable to answer right now. Please try again.') };
  }
}

export async function getAutomatedTaskDesign(values: z.infer<typeof taskAutomationSchema>) {
  try {
    await assertActionRateLimit('ai');
    const parsed = taskAutomationSchema.parse(values);
    const result = await automateTaskDesign(parsed);
    return { data: result };
  } catch (error) {
    handleError(error, 'Actions.getAutomatedTaskDesign', { logLevel: 'error' });
    return { error: clientSafeMessage(error, 'Unable to generate a workflow. Please try again.') };
  }
}

export async function getSolutionRecommendationAction(
  values: z.infer<typeof solutionRecommendationSchema>
): Promise<FormResult<Awaited<ReturnType<typeof getSolutionRecommendation>>>> {
  try {
    await assertActionRateLimit('ai');
    const parsed = solutionRecommendationSchema.parse(values);
    const result = await getSolutionRecommendation(parsed);
    return { data: result };
  } catch (error) {
    handleError(error, 'Actions.getSolutionRecommendationAction', { logLevel: 'error' });
    return { error: clientSafeMessage(error, 'Unable to generate a recommendation. Please try again.') };
  }
}

export async function contactFormAction(
  data: z.infer<typeof contactFormSchema>
): Promise<FormResult<null>> {
  try {
    await assertActionRateLimit('form');
    const parsed = contactFormSchema.parse(data);

    if (!resend && !webhookUrl) {
      return { error: 'Contact form is temporarily unavailable. Please email us directly.' };
    }

    if (resend) {
      await resend.emails.send({
        from: 'LOG_ON Website <noreply@logon.com.ng>',
        to: toEmail,
        subject: `New Contact Form Submission: ${parsed.subject.slice(0, 80)}`,
        reply_to: parsed.email,
        react: ContactFormEmail({
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone || 'Not provided',
          subject: parsed.subject,
          message: parsed.message,
        }),
      });
      logger.info('[Actions] Contact form email sent successfully');
    } else {
      logger.warn('[Actions] RESEND_API_KEY is not set. Skipping email sending.');
    }

    await sendToWebhook(parsed as Record<string, unknown>, 'Contact Form');
    await captureServerEvent(parsed.email, 'contact_form_submitted', {
      subject: parsed.subject,
    });
    return { success: true };
  } catch (error) {
    handleError(error, 'Actions.contactFormAction', { logLevel: 'error' });
    return { error: clientSafeMessage(error, 'There was a problem sending your message. Please try again.') };
  }
}

export async function newsletterSignupAction(
  data: z.infer<typeof newsletterSchema>
): Promise<FormResult<null>> {
  try {
    await assertActionRateLimit('form');
    const parsed = newsletterSchema.parse(data);

    if (!resend && !webhookUrl) {
      return {
        error: 'Signup is temporarily unavailable. Email logonthepage@gmail.com to join the letter.',
      };
    }

    if (resend) {
      await resend.emails.send({
        from: 'LOG_ON Website <noreply@logon.com.ng>',
        to: toEmail,
        subject: `Newsletter signup: ${parsed.email}`,
        reply_to: parsed.email,
        text: `New Insights letter signup\nName: ${parsed.name || 'Not provided'}\nEmail: ${parsed.email}`,
      });
    }

    await sendToWebhook(parsed as unknown as Record<string, unknown>, 'Newsletter Signup');
    await captureServerEvent(parsed.email, 'newsletter_signup');
    logger.info('[Actions] Newsletter signup successful');
    return { success: true };
  } catch (error) {
    handleError(error, 'Actions.newsletterSignupAction', { logLevel: 'error' });
    return { error: clientSafeMessage(error, 'Unable to complete signup. Please try again.') };
  }
}

export async function communityLeadAction(
  data: z.infer<typeof communityLeadSchema>
): Promise<FormResult<null>> {
  try {
    await assertActionRateLimit('form');
    const parsed = communityLeadSchema.parse(data);

    if (resend) {
      await resend.emails.send({
        from: 'LOG_ON Community Lead <noreply@logon.com.ng>',
        to: toEmail,
        subject: `New Community/Training Lead: ${parsed.interest || 'General Inquiry'}`,
        reply_to: parsed.email,
        react: EnrollmentEmail({
          name: parsed.name,
          email: parsed.email,
          phone: 'Not provided in this form',
          programName: parsed.interest || 'General Inquiry',
        }),
      });
      logger.info('[Actions] Community lead email sent successfully');
    } else {
      logger.warn('[Actions] RESEND_API_KEY is not set. Skipping enrollment email.');
    }

    await sendToWebhook(
      parsed as unknown as Record<string, unknown>,
      `Lead Form: ${parsed.interest || 'General Inquiry'}`
    );
    await captureServerEvent(parsed.email, 'community_lead_submitted', {
      interest: parsed.interest,
    });
    return { success: true };
  } catch (error) {
    handleError(error, 'Actions.communityLeadAction', { logLevel: 'error' });
    return { error: clientSafeMessage(error, 'Unable to submit your details. Please try again.') };
  }
}

export async function visibilityProfileAction(
  data: z.infer<typeof visibilityProfileSchema>
): Promise<FormResult<null>> {
  try {
    await assertActionRateLimit('form');
    const parsed = visibilityProfileSchema.parse(data);
    const body = [
      'Visibility profile (community give-back)',
      `Name: ${parsed.name}`,
      `Email: ${parsed.email}`,
      `Business: ${parsed.business}`,
      `Services: ${parsed.services || '—'}`,
      `Location: ${parsed.location || '—'}`,
      `Contact: ${parsed.contact || '—'}`,
      `Customers: ${parsed.customers || '—'}`,
      `Proof: ${parsed.proof || '—'}`,
    ].join('\n');

    if (!resend && !webhookUrl) {
      return { error: 'Send is temporarily unavailable. Email logonthepage@gmail.com.' };
    }

    if (resend) {
      await resend.emails.send({
        from: 'LOG_ON Visibility <noreply@logon.com.ng>',
        to: toEmail,
        subject: `Visibility profile: ${parsed.name}`.slice(0, 80),
        reply_to: parsed.email,
        text: body,
      });
    }

    await sendToWebhook(parsed as unknown as Record<string, unknown>, 'Visibility Profile');
    await captureServerEvent(parsed.email, 'visibility_profile_submitted');
    return { success: true };
  } catch (error) {
    handleError(error, 'Actions.visibilityProfileAction', { logLevel: 'error' });
    return { error: clientSafeMessage(error, 'Unable to send your profile. Please try again.') };
  }
}
