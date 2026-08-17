# WhatsApp Integration Documentation

**Date**: January 31, 2026  
**Status**: Centralized & Implemented

---

## Overview

All WhatsApp redirects across the application now use a centralized utility (`src/lib/whatsapp.ts`) that generates properly formatted WhatsApp URLs with pre-filled messages.

## WhatsApp Contact Details

- **Phone Number**: +234 814 306 6320
- **WhatsApp Link**: https://wa.me/2348143066320

---

## Implementation

### Centralized Utility

**File**: `src/lib/whatsapp.ts`

```typescript
import { getWhatsAppUrl, openWhatsApp, getWhatsAppContactLink } from '@/lib/whatsapp';

// Generate URL with pre-filled message
const url = getWhatsAppUrl({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'I want to learn more about your services',
  source: 'Contact Page'
});

// Open WhatsApp in new window
openWhatsApp({
  name: 'Jane Smith',
  interest: 'AI Automation',
  source: 'Services Page'
});

// Get contact link
const link = getWhatsAppContactLink(); // https://wa.me/2348143066320
```

### Message Data Interface

```typescript
interface WhatsAppMessageData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  interest?: string;
  programName?: string;
}
```

---

## Updated Files

### 1. Configuration
- ✅ `src/config/app.config.ts` - Updated WhatsApp link to use phone number

### 2. Forms
- ✅ `src/components/community-lead-form.tsx` - Uses `getWhatsAppUrl()`
- ✅ `src/components/enrollment-form.tsx` - Uses `getWhatsAppUrl()`
- ✅ `src/components/gated-feature-modal.tsx` - References WhatsApp

### 3. AI Assistant
- ✅ `src/ai/flows/rag-assistant.ts` - Uses direct phone number link

### 4. Pages
- ✅ `src/app/support/page.tsx` - Phone number link
- ✅ `src/app/contact/page.tsx` - Phone number link
- ✅ `src/app/chatbots/page.tsx` - WhatsApp mention
- ✅ `src/app/automation/[slug]/page.tsx` - WhatsApp mention

### 5. New Components
- ✅ `src/components/page-sections/analyst-reports-bento.tsx` - Uses `getWhatsAppUrl()`

---

## Benefits

### 1. Consistency
- Single source of truth for WhatsApp contact details
- Consistent message formatting across all forms

### 2. Tracking
- All messages include source tracking
- Easy to identify where leads come from

### 3. Maintainability
- Change phone number in one place
- Update message format globally

### 4. User Experience
- Pre-filled messages save user time
- Context-aware messages improve conversion

---

## Message Format

### Example Generated Message

```
Hi, I'm John Doe
I'm interested in: AI Automation
Program: Enterprise AI Training

john@example.com
Phone: +234 123 456 7890

(Source: Enrollment Form)
```

### Format Rules

1. **Greeting**: Uses name if provided, otherwise "Hi there!"
2. **Interest**: Included if specified
3. **Program**: Included if specified
4. **Custom Message**: Appended with line break
5. **Contact Info**: Email and phone on separate lines
6. **Source**: Tracking info in parentheses

---

## Usage Examples

### Basic Link
```typescript
const url = getWhatsAppUrl();
// https://wa.me/2348143066320
```

### With Name and Interest
```typescript
const url = getWhatsAppUrl({
  name: 'Sarah Johnson',
  interest: 'Chatbot Development'
});
// https://wa.me/2348143066320?text=Hi%2C%20I'm%20Sarah%20Johnson%0AI'm%20interested%20in%3A%20Chatbot%20Development
```

### Full Form Data
```typescript
const url = getWhatsAppUrl({
  name: 'Michael Chen',
  email: 'michael@company.com',
  phone: '+234 800 000 0000',
  interest: 'AI Workflow Automation',
  message: 'I need help automating our customer support',
  source: 'Services Page'
});
```

### Open in New Window
```typescript
import { openWhatsApp } from '@/lib/whatsapp';

// In a button click handler
const handleWhatsAppClick = () => {
  openWhatsApp({
    name: formData.name,
    email: formData.email,
    interest: 'Demo Request',
    source: 'Landing Page CTA'
  });
};
```

---

## Integration Points

### 1. Contact Forms
All contact forms now use `getWhatsAppUrl()` to generate WhatsApp links with form data.

### 2. CTA Buttons
Call-to-action buttons can use `openWhatsApp()` to open WhatsApp with pre-filled context.

### 3. AI Assistant
The RAG assistant provides WhatsApp links with conversation context.

### 4. Gated Features
Feature modals redirect to WhatsApp with feature interest pre-filled.

---

## Environment Variables

### Optional Configuration

```env
# .env.local
WHATSAPP_LINK=https://wa.me/2348143066320
```

If set, this overrides the default WhatsApp link in `app.config.ts`.

---

## Testing

### Manual Testing Checklist

- [ ] Community lead form redirects correctly
- [ ] Enrollment form includes program name
- [ ] Gated feature modal includes feature name
- [ ] AI assistant provides correct link
- [ ] Contact page phone number is correct
- [ ] Support page phone number is correct
- [ ] Analyst reports CTA works

### Test URLs

```bash
# Basic link
https://wa.me/2348143066320

# With message
https://wa.me/2348143066320?text=Hi%20there!

# Full example
https://wa.me/2348143066320?text=Hi%2C%20I'm%20John%0AI'm%20interested%20in%3A%20AI%20Services%0A%0Ajohn%40example.com
```

---

## Future Enhancements

### Potential Improvements

1. **Analytics Integration**
   - Track WhatsApp click events
   - Measure conversion rates by source

2. **A/B Testing**
   - Test different message formats
   - Optimize pre-filled text

3. **Multi-language Support**
   - Generate messages in user's language
   - Support for Nigerian languages

4. **Business API Integration**
   - Use WhatsApp Business API
   - Automated responses
   - Message templates

---

## Troubleshooting

### Common Issues

**Issue**: WhatsApp link doesn't open
- **Solution**: Ensure phone number format is correct (+2348143066320)

**Issue**: Message not pre-filled
- **Solution**: Check URL encoding of message text

**Issue**: Opens web WhatsApp instead of app
- **Solution**: This is browser/device dependent, expected behavior

---

## Support

For questions or issues with WhatsApp integration:
- Email: logonthepage@gmail.com
- Phone: +234 814 306 6320
- WhatsApp: https://wa.me/2348143066320

---

**Last Updated**: January 31, 2026  
**Maintained By**: LOG_ON AI Solutions Team
