# Social Sharing Implementation

This document describes the social sharing functionality implemented for LOG_ON articles and content.

## Features

### ✅ Supported Platforms

1. **Twitter/X** - With brand mention (@logon_ng)
2. **LinkedIn** - Professional sharing
3. **Facebook** - With custom quote text
4. **WhatsApp** - Mobile-optimized sharing
5. **Telegram** - Instant messaging
6. **Email** - Traditional email sharing
7. **Native Share API** - Mobile device native sharing (when available)

### ✅ Key Features

- **Dynamic URLs**: Automatically uses current page URL
- **Brand Integration**: All shares include "LOG_ON - Connecting Advantages" branding
- **Optimized Text**: Platform-specific formatting for best engagement
- **Copy to Clipboard**: Quick link copying with toast notification
- **Popup Windows**: Social shares open in centered popup windows
- **Mobile Support**: Native share API for mobile devices
- **Responsive Design**: Works on all screen sizes

## Implementation

### ShareModal Component

Located at: `src/components/share-modal.tsx`

```tsx
import { ShareModal } from '@/components/share-modal';

// Basic usage
<ShareModal title="Article Title" />

// With description
<ShareModal 
  title="Article Title" 
  description="Article description for better context"
/>

// With hashtags
<ShareModal 
  title="Article Title" 
  description="Description"
  hashtags={['AI', 'Automation', 'Nigeria']}
/>
```

### Social Share Utilities

Located at: `src/lib/social-share.ts`

```typescript
import {
  getAllShareUrls,
  getTwitterShareUrl,
  getLinkedInShareUrl,
  copyToClipboard,
  openSharePopup,
  nativeShare,
} from '@/lib/social-share';

// Generate all share URLs
const urls = getAllShareUrls({
  url: 'https://example.com/article',
  title: 'Article Title',
  description: 'Article description',
  hashtags: ['AI', 'Tech'],
});

// Use native share (mobile)
await nativeShare({
  url: 'https://example.com/article',
  title: 'Article Title',
  description: 'Description',
});
```

## Open Graph Metadata

Enhanced metadata for rich social media cards:

```typescript
// In src/app/insights/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: insight.title,
    description: insight.description,
    openGraph: {
      title: insight.title,
      description: insight.description,
      url: articleUrl,
      siteName: 'LOG_ON - Connecting Advantages',
      images: [{
        url: absoluteImageUrl,
        width: insight.width,
        height: insight.height,
        alt: insight.title,
      }],
      type: 'article',
      publishedTime: insight.date,
      authors: [insight.author],
      tags: insight.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: insight.title,
      description: insight.description,
      images: [absoluteImageUrl],
      creator: '@logon_ng',
      site: '@logon_ng',
    },
  };
}
```

## Environment Variables

Required environment variable:

```env
NEXT_PUBLIC_SITE_URL=https://logonsolutions.netlify.app
```

This is used to generate absolute URLs for social sharing.

## Platform-Specific Formatting

### Twitter/X
- Includes brand mention: `@logon_ng`
- Hashtags support
- Character limit optimized

### LinkedIn
- Professional formatting
- Automatic preview generation

### Facebook
- Custom quote text with description
- Rich preview cards

### WhatsApp
- Mobile-optimized
- Includes full context with brand attribution

### Telegram
- Clean formatting
- Instant sharing

### Email
- Professional email template
- Subject and body pre-filled
- Brand attribution in signature

## Testing

### Manual Testing Checklist

- [ ] Click share button opens modal
- [ ] All 6 social platforms display correctly
- [ ] Copy link button works and shows toast
- [ ] Twitter share includes @logon_ng mention
- [ ] WhatsApp share includes full text
- [ ] Email share has proper formatting
- [ ] Native share button appears on mobile
- [ ] Popup windows open centered
- [ ] Modal closes after native share
- [ ] Brand footer displays correctly

### Browser Testing

- [ ] Chrome/Edge (Desktop & Mobile)
- [ ] Firefox (Desktop & Mobile)
- [ ] Safari (Desktop & Mobile)
- [ ] Mobile browsers (iOS Safari, Chrome)

## Customization

### Changing Brand Information

Edit `src/lib/social-share.ts`:

```typescript
const BRAND_NAME = 'Your Brand Name';
const BRAND_HANDLE = 'your_handle';
```

### Adding New Platforms

1. Add platform to `socialShares` array in `ShareModal`
2. Create URL generator function in `social-share.ts`
3. Add to `getAllShareUrls` function
4. Import appropriate icon from `lucide-react`

### Styling

The ShareModal uses Tailwind CSS classes. Customize colors in the component:

```typescript
color: 'hover:bg-[#YourColor] hover:text-white'
```

## Analytics (Optional)

To track social shares, add event tracking:

```typescript
const handleShare = (url: string, platform: string) => {
  // Track event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: 'article',
      item_id: currentUrl,
    });
  }
  
  openSharePopup(url);
};
```

## Troubleshooting

### Share URLs not working
- Check that `NEXT_PUBLIC_SITE_URL` is set correctly
- Verify URL encoding is working properly
- Test with different browsers

### Native share not appearing
- Native share only works on HTTPS
- Check browser compatibility
- Verify `isWebShareSupported()` returns true

### Copy to clipboard failing
- Requires HTTPS in production
- Check browser permissions
- Fallback to manual selection if needed

## Future Enhancements

Potential improvements:

1. **QR Code Generation**: Generate QR codes for easy mobile sharing
2. **Share Count**: Track and display share counts
3. **Custom OG Images**: Dynamic Open Graph image generation
4. **Pinterest Support**: Add Pinterest sharing for visual content
5. **Reddit Integration**: Add Reddit sharing for tech content
6. **Analytics Dashboard**: Track which platforms drive most traffic

## Resources

- [Twitter Web Intent](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview)
- [Facebook Share Dialog](https://developers.facebook.com/docs/sharing/reference/share-dialog)
- [LinkedIn Share](https://www.linkedin.com/developers/apps)
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
