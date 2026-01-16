# Performance Best Practices

This document outlines the performance optimization patterns implemented in the LOG_ON codebase.

## React Performance Patterns

### 1. React.memo for Expensive Components

Use `React.memo` for components that:
- Receive props that rarely change
- Have expensive render logic
- Are rendered frequently

```tsx
// Example from chart.tsx
const ChartStyle = React.memo(({ id, config }: { id: string; config: ChartConfig }) => {
  // Component logic
});
ChartStyle.displayName = 'ChartStyle';
```

### 2. useMemo for Expensive Calculations

Use `useMemo` for:
- Array filtering/mapping operations
- Complex calculations
- Derived state

```tsx
// Example from NotesColumn.tsx
const notes = React.useMemo(() => {
  return insights.filter(i => 
    i.tags.some(t => ['Training', 'Strategy'].includes(t))
  ).slice(0, 6);
}, []);

// Example with dependencies
const featuredStudies = React.useMemo(() => {
  return allCaseStudies.filter(study => 
    tags.some(tag => study.tags.includes(tag))
  );
}, [tags]);
```

### 3. useCallback for Event Handlers

Use `useCallback` when passing callbacks to memoized child components:

```tsx
const handleClick = React.useCallback((id: string) => {
  // Handler logic
}, [dependency]);
```

## Code Splitting & Dynamic Imports

### Dynamic Imports for Heavy Components

Components that don't need to be loaded immediately should use dynamic imports:

```tsx
// Example from layout.tsx
const BotWidget = dynamic(
  () => import('@/components/bot-widget').then(mod => ({ default: mod.BotWidget })),
  { ssr: false, loading: () => null }
);
```

Use dynamic imports for:
- Chat widgets and bots
- Modal content
- Below-the-fold components
- Third-party integrations

### SSR Considerations

Set `ssr: false` for components that:
- Use browser-only APIs (window, document)
- Have heavy client-side dependencies
- Don't contribute to SEO

## Animation Performance

### Framer Motion Best Practices

1. **Use variants for complex animations**
   ```tsx
   const fadeIn: Variants = {
     hidden: { opacity: 0 },
     visible: { opacity: 1 }
   };
   ```

2. **Prefer transform properties**
   - Use `x`, `y`, `scale`, `rotate` instead of `left`, `top`, `width`, `height`
   - Transform properties are GPU-accelerated

3. **Use `layoutId` for shared element transitions**
   ```tsx
   <motion.div layoutId="shared-element">
   ```

4. **Disable animations when not visible**
   ```tsx
   <motion.div
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true }}
   />
   ```

### Animation Constants

Use centralized animation constants from `@/lib/animation-variants`:

```tsx
import { AnimationDuration, fadeIn, staggerContainer } from '@/lib/animation-variants';
```

## Image Optimization

### Next.js Image Component

Always use the optimized image utilities:

```tsx
import { OptimizedImage, FillImage } from '@/lib/image-utils';

<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={isAboveFold}
/>
```

### Image Loading Strategies

- Use `priority` for above-the-fold images
- Use `loading="lazy"` for below-the-fold images
- Provide appropriate `sizes` attribute for responsive images

## Data Fetching

### Server Components

Prefer Server Components for data fetching when possible:
- No client-side JavaScript for static content
- Better SEO
- Faster initial page load

### Client-Side Caching

For client-side data, consider:
- React Query / SWR for caching
- Zustand for global state
- Local state for component-specific data

## Bundle Size

### Import Optimization

1. **Named imports over default imports**
   ```tsx
   // Good
   import { Button } from '@/components/ui/button';
   
   // Avoid (if tree-shaking is needed)
   import * as Components from '@/components/ui';
   ```

2. **Lazy load heavy dependencies**
   ```tsx
   const HeavyChart = dynamic(() => import('recharts').then(mod => mod.LineChart));
   ```

## Monitoring

### Key Metrics to Track

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)

### Tools

- Chrome DevTools Performance tab
- Lighthouse audits
- Next.js Analytics
- Web Vitals reporting
