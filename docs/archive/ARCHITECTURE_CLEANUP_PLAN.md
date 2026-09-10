# Architecture Cleanup Plan
**Date**: January 31, 2026  
**Status**: In Progress  
**Priority**: Critical

## Executive Summary
Comprehensive audit identified 23 issues across architectural patterns, code quality, performance, and best practices. This document outlines the cleanup strategy with prioritized action items.

---

## Critical Issues (Fix Immediately)

### 1. Relative Imports → Alias Imports (16+ files)
**Impact**: Reduces maintainability, inconsistent with project standards  
**Files**: All components in `src/components/page-sections/`, `src/components/header/`

**Action**:
```bash
# Find all relative imports
grep -r "from '\.\." src/components/

# Replace with @/ alias using sed or manual refactor
```

**ESLint Rule**:
```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": ["../*", "./*"]
    }]
  }
}
```

---

### 2. Dynamic Imports for Layout Widgets
**Impact**: Increases initial bundle size, slows page load  
**File**: `src/app/layout.tsx`

**Current**:
```typescript
import { BotWidget } from '@/components/bot-widget';
import { BotpressWidget } from '@/components/botpress-widget';
```

**Target**:
```typescript
const BotWidget = dynamic(() => import('@/components/bot-widget'), { ssr: false });
const BotpressWidget = dynamic(() => import('@/components/botpress-widget'), { ssr: false });
```

---

### 3. TypeScript Return Types
**Impact**: Reduces type safety, makes refactoring risky  
**Files**: 40+ functions across codebase

**Action**: Add explicit return types to all functions
```typescript
// Before
function useToast() {
  // ...
}

// After
function useToast(): { toast: (props: ToastProps) => void } {
  // ...
}
```

---

### 4. Layout Component Refactoring
**Impact**: Too many responsibilities, difficult to test  
**File**: `src/app/layout.tsx`

**Action**: Extract widget initialization to separate component
```typescript
// Create src/components/layout-widgets.tsx
export function LayoutWidgets() {
  return (
    <>
      <BotWidget />
      <BotpressWidget />
      <BookDemoWidget />
      <BackToTop />
      <NewsletterPopup />
    </>
  );
}
```

---

## High Priority Issues (Fix This Sprint)

### 5. Form Component Separation of Concerns
**Files**: 
- `src/components/contact-form.tsx`
- `src/components/solution-recommendation-form.tsx`
- `src/components/task-automation-form.tsx`

**Action**:
1. Create `src/schemas/forms.ts` for validation schemas
2. Create `src/services/forms.ts` for API calls
3. Refactor components to use extracted logic

---

### 6. Remove `any` Types
**Files**: 
- `src/ai/ai-service-manager.ts`
- `src/data-pipeline/consumer.ts`
- `src/data-pipeline/connectors.ts`

**Action**: Create proper TypeScript interfaces
```typescript
// Create src/types/ai-service.ts
export interface SolutionRecommendationInput {
  industry: string;
  problemDescription: string;
  budget?: number;
}

export interface SolutionRecommendationOutput {
  recommendations: Recommendation[];
  confidence: number;
}
```

---

### 7. Remove Console Statements
**Files**: 15+ files with console.log/error

**Action**: Replace with proper logger
```typescript
// Use existing src/lib/logger.ts
import { logger } from '@/lib/logger';

// Replace console.log
logger.info('Message', { context });

// Replace console.error
logger.error('Error occurred', { error });
```

---

### 8. Standardize Error Handling
**Action**: Use centralized error handler everywhere
```typescript
import { handleError } from '@/lib/error-handler';

try {
  // operation
} catch (error) {
  handleError(error);
}
```

---

## Medium Priority Issues (Fix Next Sprint)

### 9. Remove Unused React Imports (40+ files)
**Action**: Automated cleanup
```bash
# Use ESLint autofix
npx eslint --fix src/**/*.tsx
```

**ESLint Rule**:
```json
{
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

---

### 10. Standardize Component Exports
**Files**: 
- `src/components/page-sections/strategic-partner.tsx`
- `src/components/solution-recommendation-form.tsx`

**Action**: Convert default exports to named exports
```typescript
// Before
export default function StrategicPartner() {}

// After
export function StrategicPartner() {}
```

---

### 11. Create Index Files
**Directories**:
- `src/components/articles/`
- `src/components/page-sections/`
- `src/components/header/`
- `src/components/shared/`
- `src/components/ui/`

**Action**: Create barrel exports
```typescript
// src/components/page-sections/index.ts
export { Hero } from './hero';
export { FeaturedInsights } from './featured-insights';
export { ServicesOffered } from './services-offered';
// ... etc
```

---

### 12. Add React.memo Optimizations
**Files**:
- `src/components/ui/glowing-card.tsx`
- `src/components/ui/bento-grid.tsx`
- `src/components/case-studies-carousel.tsx`

**Action**:
```typescript
import { memo } from 'react';

export const GlowingCard = memo(function GlowingCard({ children, className }: Props) {
  // component logic
});
```

---

### 13. Accessibility Audit
**Action**: Run axe DevTools on all pages
- Add missing `aria-*` attributes
- Ensure keyboard navigation
- Test with screen readers

---

## Low Priority Issues (Backlog)

### 14. Bundle Size Monitoring
**Action**: Add bundle analyzer
```bash
npm install --save-dev @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

---

### 15. Environment Variable Validation
**Action**: Add zod validation
```typescript
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string(),
  // ... etc
});

export const env = envSchema.parse(process.env);
```

---

## Implementation Timeline

### Week 1: Critical Fixes
- [ ] Day 1-2: Convert relative imports to alias imports
- [ ] Day 2-3: Add dynamic imports to layout
- [ ] Day 3-4: Add TypeScript return types
- [ ] Day 4-5: Refactor layout component

### Week 2: High Priority
- [ ] Day 1-2: Extract form validation schemas
- [ ] Day 2-3: Remove `any` types
- [ ] Day 3-4: Replace console statements
- [ ] Day 4-5: Standardize error handling

### Week 3: Medium Priority
- [ ] Day 1: Remove unused React imports
- [ ] Day 2: Standardize component exports
- [ ] Day 3: Create index files
- [ ] Day 4: Add React.memo optimizations
- [ ] Day 5: Accessibility audit

### Week 4: Testing & Validation
- [ ] Run full test suite
- [ ] Performance testing
- [ ] Accessibility testing
- [ ] Code review

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Import Consistency | 84% | 100% |
| Type Safety | 70% | 95% |
| Error Handling | 65% | 90% |
| Performance Score | 75% | 90% |
| Accessibility Score | 80% | 95% |
| Code Quality | 72% | 90% |

---

## ESLint Configuration Updates

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": ["../*", "./*"]
    }],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

---

## Next Steps

1. **Review this plan** with team
2. **Create GitHub issues** for each task
3. **Assign priorities** and owners
4. **Start with Week 1** critical fixes
5. **Monitor progress** with daily standups

---

**Document Owner**: Architecture Team  
**Last Updated**: January 31, 2026  
**Next Review**: February 7, 2026
