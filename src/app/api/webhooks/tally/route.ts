import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/emails/contact-form-email';
import { logger } from '@/lib/logger';
import { captureServerEvent } from '@/lib/posthog-server';

export const runtime = 'nodejs';

type TallyField = {
  key?: string;
  label?: string;
  type?: string;
  value?: unknown;
};

function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const digest = crypto.createHmac('sha256', secret).update(rawBody).digest('base64');
  const a = Buffer.from(digest);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function fieldValue(fields: TallyField[], matchers: string[]): string {
  const hit = fields.find((f) => {
    const label = (f.label || f.key || '').toLowerCase();
    return matchers.some((m) => label.includes(m));
  });
  if (!hit) return '';
  const v = hit.value;
  if (Array.isArray(v)) return v.map(String).filter(Boolean).join(', ');
  if (v == null) return '';
  return String(v);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signingSecret = process.env.TALLY_SIGNING_SECRET;
  const headerSecret = process.env.TALLY_WEBHOOK_HEADER_SECRET || process.env.WEBHOOK_HMAC_SECRET;

  if (process.env.NODE_ENV === 'production' && !signingSecret && !headerSecret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  if (signingSecret) {
    const signature = request.headers.get('tally-signature') || request.headers.get('Tally-Signature');
    if (!verifySignature(rawBody, signature, signingSecret)) {
      logger.warn('[Tally] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  if (headerSecret) {
    const provided = request.headers.get('x-logon-webhook-key');
    if (provided !== headerSecret) {
      logger.warn('[Tally] Invalid custom header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  let payload: { eventType?: string; data?: { fields?: TallyField[]; formName?: string; responseId?: string } };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (payload.eventType && payload.eventType !== 'FORM_RESPONSE') {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const fields = payload.data?.fields ?? [];
  const name = fieldValue(fields, ['name']);
  const email = fieldValue(fields, ['email']);
  const phone = fieldValue(fields, ['phone']);
  const need = fieldValue(fields, ['need', 'help with', 'what do you']);
  const subject = fieldValue(fields, ['subject']) || need || 'Website inquiry';
  const message = fieldValue(fields, ['message', 'project', 'goals']);

  if (email) {
    await captureServerEvent(email, 'tally_form_submitted', {
      subject,
      need,
      formName: payload.data?.formName,
      responseId: payload.data?.responseId,
    });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.TO_EMAIL || 'logonthepage@gmail.com';
  if (resendKey && email) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: 'LOG_ON Website <noreply@logon.com.ng>',
        to: toEmail,
        subject: `Tally inquiry: ${subject.slice(0, 80)}`,
        reply_to: email,
        react: ContactFormEmail({
          name: name || 'Unknown',
          email,
          phone: phone || 'Not provided',
          subject,
          message: [need && `Need: ${need}`, message].filter(Boolean).join('\n\n') || 'No message',
        }),
      });
    } catch (error) {
      logger.error('[Tally] Email send failed', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const forwardUrl = process.env.THIRD_PARTY_WEBHOOK_URL;
  if (forwardUrl) {
    try {
      await fetch(forwardUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: 'Tally Contact Form',
          name,
          email,
          phone,
          need,
          subject,
          message,
          receivedAt: new Date().toISOString(),
        }),
      });
    } catch (error) {
      logger.error('[Tally] Forward webhook failed', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return NextResponse.json({ ok: true });
}
