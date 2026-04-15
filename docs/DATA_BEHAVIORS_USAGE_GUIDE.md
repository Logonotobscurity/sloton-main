# Data Behaviors Usage Guide

Quick reference for using data-attribute behaviors in your components.

---

## Scroll Reveal

### Basic Usage
```tsx
<div data-reveal>
  This content fades in when scrolled into view
</div>
```

### With Delay
```tsx
<div data-reveal data-delay="200">
  Fades in 200ms after entering viewport
</div>
```

### Sequential Cards
```tsx
<div className="grid gap-6">
  {items.map((item, index) => (
    <Card key={item.id} data-reveal data-delay={index * 100}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
    </Card>
  ))}
</div>
```

---

## Counter Animation

### Basic Counter
```tsx
<span data-count="1000">1000</span>
```

### Statistics Section
```tsx
<section className="py-16">
  <div className="grid grid-cols-3 gap-8 text-center">
    <div>
      <div className="text-4xl font-bold text-primary" data-count="500">500</div>
      <p>Projects</p>
    </div>
    <div>
      <div className="text-4xl font-bold text-primary" data-count="1000" data-delay="100">1000</div>
      <p>Clients</p>
    </div>
    <div>
      <div className="text-4xl font-bold text-primary" data-count="50" data-delay="200">50</div>
      <p>Team</p>
    </div>
  </div>
</section>
```

---

## Mobile Folding Footer

### Footer Section Structure
```tsx
<div data-footer-section data-expanded="true">
  <h3 
    data-footer-header
    role="button"
    tabIndex={0}
    aria-expanded="true"
  >
    Section Title
  </h3>
  <ul data-footer-content>
    <li><Link href="/link1">Link 1</Link></li>
    <li><Link href="/link2">Link 2</Link></li>
  </ul>
</div>
```

**Behavior:**
- Mobile: Collapsible with chevron icon
- Desktop: Always expanded

---

## Best Practices

### 1. Use Semantic Delays
```tsx
// Good: Staggered by 100ms
<div data-reveal data-delay="0">First</div>
<div data-reveal data-delay="100">Second</div>
<div data-reveal data-delay="200">Third</div>

// Avoid: Too fast
<div data-reveal data-delay="0">First</div>
<div data-reveal data-delay="10">Second</div>
<div data-reveal data-delay="20">Third</div>
```

### 2. Don't Overuse Animations
```tsx
// Good: Animate key sections
<section data-reveal>
  <h2>Important Section</h2>
  <p>Key content</p>
</section>

// Avoid: Animating everything
<div data-reveal>
  <p data-reveal>Every</p>
  <p data-reveal>Single</p>
  <p data-reveal>Element</p>
</div>
```

### 3. Respect Content Hierarchy
```tsx
// Good: Parent then children
<section data-reveal>
  <h2 data-reveal data-delay="100">Title</h2>
  <p data-reveal data-delay="200">Content</p>
</section>
```

---

## Common Patterns

### Hero Section
```tsx
<section className="hero">
  <h1 data-reveal>Welcome</h1>
  <p data-reveal data-delay="100">Subtitle</p>
  <Button data-reveal data-delay="200">Get Started</Button>
</section>
```

### Feature Grid
```tsx
<div className="grid grid-cols-3 gap-6">
  {features.map((feature, i) => (
    <Card key={feature.id} data-reveal data-delay={i * 100}>
      <CardHeader>
        <CardTitle>{feature.title}</CardTitle>
      </CardHeader>
    </Card>
  ))}
</div>
```

### Stats Section
```tsx
<section className="stats">
  <div className="stat" data-reveal>
    <span data-count="500">500</span>
    <p>Projects</p>
  </div>
</section>
```

---

## Accessibility

### Always Include:
1. **Fallback content** - Content visible without JS
2. **ARIA labels** - For interactive elements
3. **Keyboard support** - Tab navigation
4. **Reduced motion** - Automatically handled

### Example:
```tsx
<div 
  data-footer-section 
  data-expanded="true"
>
  <h3 
    data-footer-header
    role="button"
    tabIndex={0}
    aria-expanded="true"
  >
    Links
  </h3>
  <ul data-footer-content>
    <li><Link href="/about">About</Link></li>
  </ul>
</div>
```

---

## Troubleshooting

### Animation Not Triggering
- Check element is in viewport
- Verify data attribute spelling
- Check browser console for errors

### Counter Not Animating
- Ensure `data-count` value is a number
- Check element visibility
- Verify Intersection Observer support

### Footer Not Collapsing
- Check viewport width (< 768px)
- Verify all data attributes present
- Inspect `data-expanded` attribute

---

**Last Updated:** April 14, 2026
