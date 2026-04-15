# Component Library Usage Guide

Quick reference for using the spec-compliant component library.

---

## Buttons

### Primary Button (CTA)
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="large">
  Get Your Free Assessment
</Button>
```

**Features:**
- Green background with black text
- Hover: Lifts up with glow effect
- Best for: Primary CTAs, main actions

---

### Outline Button (Secondary)
```tsx
<Button variant="outline" size="default">
  Learn More
</Button>
```

**Features:**
- Transparent with green border
- Hover: Text turns green
- Best for: Secondary actions, alternative options

---

### Outline Pill Button (Rounded)
```tsx
<Button variant="outline-pill" size="default">
  Filter
</Button>
```

**Features:**
- Rounded pill shape (fully rounded borders)
- Transparent with green border
- Hover: Text turns green with subtle background
- Best for: Filters, tags, category selectors

---

### Ghost Button (Tertiary)
```tsx
<Button variant="ghost" size="sm">
  Cancel
</Button>
```

**Features:**
- No border, subtle background on hover
- Best for: Tertiary actions, cancel buttons

---

### Size Options
```tsx
<Button size="large">Large CTA</Button>      // 14px height, 32px padding
<Button size="lg">Large</Button>             // 12px height, 32px padding
<Button size="default">Default</Button>      // 10px height, 16px padding
<Button size="sm">Small</Button>             // 9px height, 12px padding
<Button size="icon">Icon</Button>            // Square button for icons
```

---

## Cards

### Basic Card with Hover Effects
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Brief description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

**Features:**
- Hover: Lifts up 5px
- Hover: Border color changes
- Hover: Green underline animates from left
- Respects reduced motion preferences

---

### Card Without Hover Effects
```tsx
<Card disableHoverEffect>
  <CardHeader>
    <CardTitle>Static Card</CardTitle>
  </CardHeader>
  <CardContent>
    No hover animations
  </CardContent>
</Card>
```

**Use when:**
- Card is not clickable
- Inside another interactive element
- Hover effects would be distracting

---

## Accordion (FAQ)

### Basic Accordion
```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is your refund policy?</AccordionTrigger>
    <AccordionContent>
      We offer a 30-day money-back guarantee...
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-2">
    <AccordionTrigger>How long does delivery take?</AccordionTrigger>
    <AccordionContent>
      Delivery typically takes 3-5 business days...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Features:**
- + icon rotates to × when open
- Smooth expand/collapse animation
- Keyboard accessible
- ARIA labels for screen readers

---

### Multiple Items Open
```tsx
<Accordion type="multiple">
  {/* Multiple items can be open simultaneously */}
</Accordion>
```

---

## Forms

### Input Fields
```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div>
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="you@example.com"
  />
</div>
```

**Features:**
- 2px green focus ring
- Proper ARIA labels
- Disabled state styling

---

### Textarea
```tsx
import { Textarea } from '@/components/ui/textarea';

<div>
  <Label htmlFor="message">Message</Label>
  <Textarea 
    id="message" 
    placeholder="Your message here..."
    rows={4}
  />
</div>
```

---

### Select Dropdown
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

---

## Layout

### Container
```tsx
<div className="container-spec">
  {/* Max-width 1280px, fluid padding */}
  <h1>Page Content</h1>
</div>
```

**Or use Tailwind's container:**
```tsx
<div className="container">
  {/* Uses CSS variable padding */}
</div>
```

---

### Grid Patterns

#### Two-Column Grid
```tsx
<div className="grid-2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```
- Desktop: 2 columns
- Mobile (<760px): 1 column

---

#### Four-Column Grid
```tsx
<div className="grid-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column

---

#### Auto-Fit Grid (Responsive Cards)
```tsx
<div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>
```

---

## Spacing

### Using Spacing Variables

```tsx
// CSS
.my-section {
  gap: var(--g-md);           /* 24px */
  padding: var(--g-lg);       /* 48px */
  margin-bottom: var(--g-xl); /* 80px */
}

// Tailwind classes
<div className="space-y-fluid-md">  {/* Fluid spacing */}
<div className="gap-6">             {/* 24px gap */}
```

### Available Spacing Tokens

| Variable | Value | Use Case |
|----------|-------|----------|
| `--g-xs` | 8px | Tight spacing, icon gaps |
| `--g-sm` | 16px | Small gaps, list items |
| `--g-md` | 24px | Default spacing, card gaps |
| `--g-lg` | 48px | Section padding, large gaps |
| `--g-xl` | 80px | Major section spacing |
| `--section-gap` | clamp(60px, 10vh, 120px) | Between major sections |

---

## Theme Toggle

### Already Implemented
```tsx
import { ThemeToggle } from '@/components/theme-toggle';

<ThemeToggle />
```

**Features:**
- Switches between light/dark/system
- Icon updates (☀️ / 🌙)
- Proper ARIA labels
- Dropdown menu for selection

---

## Accessibility Best Practices

### Focus Indicators
All interactive elements automatically have focus rings:
```tsx
// Automatically applied
<Button>Accessible Button</Button>
<Input />
<Card>Clickable Card</Card>
```

### Reduced Motion
Animations automatically disabled for users who prefer reduced motion:
```css
/* Automatically handled by globals.css */
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
}
```

### Touch Devices
Cursor effects automatically disabled on touch devices:
```css
/* Automatically handled by globals.css */
@media (hover: none) and (pointer: coarse) {
  /* Cursor effects disabled */
}
```

### ARIA Labels
Always include ARIA labels for interactive elements:
```tsx
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

<Accordion>
  {/* ARIA labels automatically included */}
</Accordion>
```

---

## Migration from Old Components

### Button Migration

**Before:**
```tsx
<Button variant="default">Click Me</Button>
<Button variant="outline">Secondary</Button>
```

**After (Spec-Compliant):**
```tsx
<Button variant="primary" size="large">Click Me</Button>
<Button variant="outline">Secondary</Button>
```

**Note:** Old variants still work! No need to migrate immediately.

---

### Card Migration

**Before:**
```tsx
<Card className="hover:shadow-lg">
  <CardHeader>...</CardHeader>
</Card>
```

**After (Spec-Compliant):**
```tsx
<Card>
  {/* Hover effects built-in */}
  <CardHeader>...</CardHeader>
</Card>
```

**To disable hover effects:**
```tsx
<Card disableHoverEffect>
  <CardHeader>...</CardHeader>
</Card>
```

---

## CSS Variables Reference

### Colors
```css
--green: var(--primary)      /* Primary green color */
--border: 195 12% 78%        /* Default border */
--border2: 195 12% 68%       /* Hover border */
```

### Spacing
```css
--g-xs: 8px
--g-sm: 16px
--g-md: 24px
--g-lg: 48px
--g-xl: 80px
--section-gap: clamp(60px, 10vh, 120px)
--pad: clamp(16px, 4vw, 72px)
```

### Border Radius
```css
--radius: 0.5rem             /* Default radius */
--radius-lg: 12px            /* Large radius */
```

---

## Common Patterns

### CTA Section
```tsx
<section className="py-fluid-xl">
  <div className="container-spec text-center">
    <h2 className="text-fluid-xl font-headline mb-6">
      Ready to Get Started?
    </h2>
    <p className="text-lg text-muted-foreground mb-8">
      Join thousands of satisfied customers
    </p>
    <div className="flex gap-4 justify-center">
      <Button variant="primary" size="large">
        Start Free Trial
      </Button>
      <Button variant="outline" size="large">
        Learn More
      </Button>
    </div>
  </div>
</section>
```

---

### Feature Cards Grid
```tsx
<div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
  {features.map((feature) => (
    <Card key={feature.id}>
      <CardHeader>
        <feature.icon className="h-8 w-8 text-primary mb-4" />
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" className="w-full">
          Learn More →
        </Button>
      </CardContent>
    </Card>
  ))}
</div>
```

---

### FAQ Section
```tsx
<section className="py-fluid-xl">
  <div className="container-spec max-w-3xl">
    <h2 className="text-fluid-xl font-headline text-center mb-12">
      Frequently Asked Questions
    </h2>
    <Accordion type="single" collapsible>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</section>
```

---

## Tips & Best Practices

### 1. Use Semantic Variants
- `variant="primary"` for main CTAs
- `variant="outline"` for secondary actions
- `variant="ghost"` for tertiary/cancel actions

### 2. Consistent Spacing
- Use spacing variables (`--g-md`, `--g-lg`) instead of arbitrary values
- Use `gap-6` (24px) for card grids
- Use `py-fluid-xl` for section padding

### 3. Accessibility First
- Always include `aria-label` for icon-only buttons
- Use proper heading hierarchy (H1 → H2 → H3)
- Test keyboard navigation
- Verify focus indicators are visible

### 4. Responsive Design
- Use fluid spacing (`py-fluid-lg`) for responsive padding
- Use auto-fit grids for responsive card layouts
- Test on mobile, tablet, and desktop

### 5. Performance
- Card hover effects use CSS transforms (GPU-accelerated)
- Animations respect `prefers-reduced-motion`
- No JavaScript required for hover effects

---

## Support

For questions or issues:
1. Check this guide first
2. Review `COMPONENT_LIBRARY_IMPLEMENTATION.md` for technical details
3. Check component source code in `src/components/ui/`
4. Refer to the original specification document

---

**Last Updated:** April 14, 2026  
**Version:** 1.0.0
