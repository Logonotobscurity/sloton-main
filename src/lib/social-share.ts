/**
 * Social Media Share Utilities
 * Generates properly formatted share URLs for various social platforms
 */

import { logger } from '@/lib/logger';

export interface ShareData {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  via?: string;
}

const BRAND_NAME = 'LOG_ON';
const BRAND_HANDLE = 'logon_ng';

/**
 * Generate Twitter/X share URL
 */
export function getTwitterShareUrl(data: ShareData): string {
  const params = new URLSearchParams();
  params.append('url', data.url);
  
  // Add title with brand mention
  const text = data.via 
    ? `${data.title}\n\nvia @${data.via}` 
    : `${data.title}\n\nvia @${BRAND_HANDLE}`;
  params.append('text', text);
  
  if (data.hashtags && data.hashtags.length > 0) {
    params.append('hashtags', data.hashtags.join(','));
  }
  
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * Generate LinkedIn share URL
 */
export function getLinkedInShareUrl(data: ShareData): string {
  const params = new URLSearchParams();
  params.append('url', data.url);
  
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

/**
 * Generate Facebook share URL
 */
export function getFacebookShareUrl(data: ShareData): string {
  const params = new URLSearchParams();
  params.append('u', data.url);
  
  if (data.description) {
    params.append('quote', `${data.title}\n\n${data.description}`);
  }
  
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

/**
 * Generate WhatsApp share URL
 */
export function getWhatsAppShareUrl(data: ShareData): string {
  const text = data.description
    ? `${data.title}\n\n${data.description}\n\n${data.url}\n\nvia ${BRAND_NAME}`
    : `${data.title}\n\n${data.url}\n\nvia ${BRAND_NAME}`;
  
  const params = new URLSearchParams();
  params.append('text', text);
  
  return `https://api.whatsapp.com/send?${params.toString()}`;
}

/**
 * Generate Telegram share URL
 */
export function getTelegramShareUrl(data: ShareData): string {
  const params = new URLSearchParams();
  params.append('url', data.url);
  
  const text = data.description
    ? `${data.title}\n\n${data.description}`
    : data.title;
  params.append('text', text);
  
  return `https://t.me/share/url?${params.toString()}`;
}

/**
 * Generate Email share URL
 */
export function getEmailShareUrl(data: ShareData): string {
  const subject = encodeURIComponent(data.title);
  
  const body = data.description
    ? `${data.title}\n\n${data.description}\n\nRead more: ${data.url}\n\nShared from ${BRAND_NAME}`
    : `${data.title}\n\nRead more: ${data.url}\n\nShared from ${BRAND_NAME}`;
  
  return `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
}

/**
 * Generate Reddit share URL
 */
export function getRedditShareUrl(data: ShareData): string {
  const params = new URLSearchParams();
  params.append('url', data.url);
  params.append('title', data.title);
  
  return `https://reddit.com/submit?${params.toString()}`;
}

/**
 * Generate all social share URLs
 */
export function getAllShareUrls(data: ShareData) {
  return {
    twitter: getTwitterShareUrl(data),
    linkedin: getLinkedInShareUrl(data),
    facebook: getFacebookShareUrl(data),
    whatsapp: getWhatsAppShareUrl(data),
    telegram: getTelegramShareUrl(data),
    email: getEmailShareUrl(data),
    reddit: getRedditShareUrl(data),
  };
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    logger.error('Failed to copy to clipboard', { error: err });
    return false;
  }
}

/**
 * Open share URL in popup window
 */
export function openSharePopup(url: string, width = 600, height = 600): void {
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  
  window.open(
    url,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`
  );
}

/**
 * Check if Web Share API is available
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

/**
 * Use native Web Share API if available
 */
export async function nativeShare(data: ShareData): Promise<boolean> {
  if (!isWebShareSupported()) {
    return false;
  }
  
  try {
    await navigator.share({
      title: data.title,
      text: data.description,
      url: data.url,
    });
    return true;
  } catch (err) {
    // User cancelled or share failed
    logger.warn('Native share failed', { error: err });
    return false;
  }
}
