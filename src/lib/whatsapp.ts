/**
 * WhatsApp Integration Utilities
 * Centralized WhatsApp redirect and webhook management
 */

const WHATSAPP_NUMBER = '2348143066320';
const WHATSAPP_BASE_URL = 'https://wa.me';

export interface WhatsAppMessageData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  interest?: string;
  programName?: string;
}

/**
 * Generate WhatsApp redirect URL with pre-filled message
 */
export function getWhatsAppUrl(data?: WhatsAppMessageData): string {
  const baseUrl = `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}`;
  
  if (!data) {
    return baseUrl;
  }

  // Build pre-filled message
  const messageParts: string[] = [];
  
  if (data.name) {
    messageParts.push(`Hi, I'm ${data.name}`);
  } else {
    messageParts.push('Hi there!');
  }

  if (data.interest) {
    messageParts.push(`I'm interested in: ${data.interest}`);
  }

  if (data.programName) {
    messageParts.push(`Program: ${data.programName}`);
  }

  if (data.message) {
    messageParts.push(`\n${data.message}`);
  }

  if (data.email) {
    messageParts.push(`\nEmail: ${data.email}`);
  }

  if (data.phone) {
    messageParts.push(`Phone: ${data.phone}`);
  }

  if (data.source) {
    messageParts.push(`\n(Source: ${data.source})`);
  }

  const text = messageParts.join('\n');
  const encodedText = encodeURIComponent(text);

  return `${baseUrl}?text=${encodedText}`;
}

/**
 * Open WhatsApp in new window with pre-filled message
 */
export function openWhatsApp(data?: WhatsAppMessageData): void {
  const url = getWhatsAppUrl(data);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Get WhatsApp contact link (for display purposes)
 */
export function getWhatsAppContactLink(): string {
  return `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}`;
}

/**
 * Get formatted WhatsApp phone number
 */
export function getWhatsAppPhoneNumber(): string {
  return `+${WHATSAPP_NUMBER}`;
}

/**
 * Get WhatsApp phone number for tel: links
 */
export function getWhatsAppTelLink(): string {
  return `tel:+${WHATSAPP_NUMBER}`;
}
