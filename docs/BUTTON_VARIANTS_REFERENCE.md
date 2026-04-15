# Button Variants Quick Reference

Visual guide to all available button variants.

---

## Primary Buttons

### `variant="primary"`
```tsx
<Button variant="primary" size="large">Get Started</Button>
```
**Style:** Green background, black text  
**Hover:** Lifts up with glow effect  
**Use:** Main CTAs, primary actions

---

## Outline Buttons

### `variant="outline"`
```tsx
<Button variant="outline">Learn More</Button>
```
**Style:** Transparent, green border, rounded corners  
**Hover:** Green text, border darkens  
**Use:** Secondary actions, alternative options

### `variant="outline-pill"` ⭐ NEW
```tsx
<Button variant="outline-pill">Filter</Button>
```
**Style:** Transparent, green border, fully rounded (pill shape)  
**Hover:** Green text, subtle background tint  
**Use:** Filters, tags, categories, compact actions

---

## Ghost Buttons

### `variant="ghost"`
```tsx
<Button variant="ghost">Cancel</Button>
```
**Style:** Transparent, no border  
**Hover:** Subtle background  
**Use:** Tertiary actions, cancel buttons

---

## Legacy Variants (Backward Compatible)

### `variant="default"`
```tsx
<Button variant="default">Click Me</Button>
```
**Style:** Original primary style  
**Use:** Existing code (still works)

### `variant="secondary"`
```tsx
<Button variant="secondary">Secondary</Button>
```
**Style:** Secondary color background  
**Use:** Existing code (still works)

### `variant="destructive"`
```tsx
<Button variant="destructive">Delete</Button>
```
**Style:** Red background  
**Use:** Destructive actions

### `variant="link"`
```tsx
<Button variant="link">Link Style</Button>
```
**Style:** Underlined text  
**Use:** Link-style buttons

---

## Size Options

All variants support these sizes:

```tsx
<Button size="large">Large (56px)</Button>
<Button size="lg">Large (48px)</Button>
<Button size="default">Default (40px)</Button>
<Button size="sm">Small (36px)</Button>
<Button size="icon">Icon (40x40px)</Button>
```

---

## Combining Variants

### Pill + Size
```tsx
<Button variant="outline-pill" size="sm">Small Pill</Button>
<Button variant="outline-pill" size="default">Default Pill</Button>
<Button variant="outline-pill" size="large">Large Pill</Button>
```

### Custom Classes
```tsx
<Button variant="outline-pill" className="w-full">
  Full Width Pill
</Button>
```

---

## Common Patterns

### CTA Group
```tsx
<div className="flex gap-4">
  <Button variant="primary" size="large">
    Get Started
  </Button>
  <Button variant="outline" size="large">
    Learn More
  </Button>
</div>
```

### Filter Bar
```tsx
<div className="flex flex-wrap gap-2">
  <Button variant="outline-pill">All</Button>
  <Button variant="outline-pill">Technology</Button>
  <Button variant="outline-pill">Business</Button>
  <Button variant="outline-pill">Design</Button>
</div>
```

### Tag Selection
```tsx
<div className="flex flex-wrap gap-2">
  <Button variant="outline-pill" size="sm">React</Button>
  <Button variant="outline-pill" size="sm">TypeScript</Button>
  <Button variant="outline-pill" size="sm">Next.js</Button>
</div>
```

### Action Group
```tsx
<div className="flex gap-2">
  <Button variant="primary">Save</Button>
  <Button variant="outline">Preview</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

---

## Decision Tree

**Need a primary CTA?**  
→ Use `variant="primary"`

**Need a secondary action?**  
→ Use `variant="outline"`

**Need filters or tags?**  
→ Use `variant="outline-pill"` ⭐

**Need a subtle action?**  
→ Use `variant="ghost"`

**Need to delete something?**  
→ Use `variant="destructive"`

---

## Accessibility

All variants include:
- ✅ Focus ring (2px solid primary)
- ✅ Keyboard navigation
- ✅ Disabled state
- ✅ Proper contrast ratios
- ✅ ARIA support

---

## Browser Support

All variants work in:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

**Last Updated:** April 14, 2026  
**Version:** 1.0.0
