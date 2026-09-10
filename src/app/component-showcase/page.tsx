/**
 * Component Library Showcase
 * 
 * This page demonstrates all spec-compliant components
 * Use this as a reference for implementation
 */

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Component Library Showcase | LOG_ON',
  description: 'Internal component reference. Not indexed.',
  robots: { index: false, follow: false },
};

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-fluid-xl border-b">
        <div className="container-spec text-center">
          <h1 className="text-fluid-xl font-headline mb-6">
            Component Library Showcase
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our spec-compliant component library with consistent styling, 
            accessibility features, and smooth animations.
          </p>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="py-fluid-xl border-b">
        <div className="container-spec">
          <h2 className="text-fluid-lg font-headline mb-8">Buttons</h2>
          
          <div className="space-y-8">
            {/* Primary Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Primary Buttons</h3>
              <p className="text-muted-foreground mb-4">
                Green background, black text, hover lift + glow effect
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="large">
                  Large Primary CTA
                </Button>
                <Button variant="primary" size="default">
                  Default Primary
                </Button>
                <Button variant="primary" size="sm">
                  Small Primary
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Outline Buttons</h3>
              <p className="text-muted-foreground mb-4">
                Transparent with border, green text on hover
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="large">
                  Large Outline
                </Button>
                <Button variant="outline" size="default">
                  Default Outline
                </Button>
                <Button variant="outline" size="sm">
                  Small Outline
                </Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Outline Pill Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Outline Pill Buttons</h3>
              <p className="text-muted-foreground mb-4">
                Rounded pill style with border, perfect for filters and tags
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline-pill" size="large">
                  Large Pill
                </Button>
                <Button variant="outline-pill" size="default">
                  Default Pill
                </Button>
                <Button variant="outline-pill" size="sm">
                  Small Pill
                </Button>
                <Button variant="outline-pill" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Ghost Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Ghost Buttons</h3>
              <p className="text-muted-foreground mb-4">
                No border, subtle hover background
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" size="large">
                  Large Ghost
                </Button>
                <Button variant="ghost" size="default">
                  Default Ghost
                </Button>
                <Button variant="ghost" size="sm">
                  Small Ghost
                </Button>
                <Button variant="ghost" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Legacy Buttons (Backward Compatibility) */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Legacy Variants (Still Supported)</h3>
              <p className="text-muted-foreground mb-4">
                Original button styles for backward compatibility
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-fluid-xl border-b">
        <div className="container-spec">
          <h2 className="text-fluid-lg font-headline mb-8">Cards</h2>
          <p className="text-muted-foreground mb-8">
            Hover over cards to see lift animation, border color change, and green underline
          </p>
          
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <Card>
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Feature Card</CardTitle>
                <CardDescription>
                  This card has hover effects enabled by default
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hover to see the lift animation and green underline appear from the left.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>
                  Cards work great for feature showcases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The border color changes and the card lifts up on hover for a premium feel.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Accessible Card</CardTitle>
                <CardDescription>
                  Respects reduced motion preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All animations are disabled for users who prefer reduced motion.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card disableHoverEffect>
              <CardHeader>
                <CardTitle>Static Card</CardTitle>
                <CardDescription>
                  Hover effects disabled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use <code className="text-xs bg-muted px-1 py-0.5 rounded">disableHoverEffect</code> prop 
                  when hover animations aren't needed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-fluid-xl border-b">
        <div className="container-spec max-w-2xl">
          <h2 className="text-fluid-lg font-headline mb-8">Form Elements</h2>
          <p className="text-muted-foreground mb-8">
            All form elements have consistent focus states with 2px green ring
          </p>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tell us about your project..."
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="flex gap-4">
              <Button variant="primary" size="large" className="flex-1">
                Submit Form
              </Button>
              <Button variant="outline" size="large">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-fluid-xl border-b">
        <div className="container-spec max-w-3xl">
          <h2 className="text-fluid-lg font-headline mb-8">Accordion (FAQ)</h2>
          <p className="text-muted-foreground mb-8">
            Click to expand/collapse. The + icon rotates to × when open.
          </p>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What makes this component library special?</AccordionTrigger>
              <AccordionContent>
                Our component library follows a comprehensive specification with consistent styling, 
                accessibility features, and smooth animations. All components respect user preferences 
                like reduced motion and work seamlessly across devices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Are these components accessible?</AccordionTrigger>
              <AccordionContent>
                Yes! All components include proper ARIA labels, visible focus indicators, keyboard 
                navigation support, and respect user preferences like prefers-reduced-motion. We follow 
                WCAG guidelines for color contrast and interactive element sizing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I customize the components?</AccordionTrigger>
              <AccordionContent>
                Absolutely! All components accept className props for custom styling. You can also 
                modify the CSS variables in globals.css to change colors, spacing, and other design 
                tokens across the entire library.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Is this backward compatible?</AccordionTrigger>
              <AccordionContent>
                Yes! We've taken an additive approach. All existing button variants (default, secondary, 
                destructive) still work. New spec-compliant variants (primary, outline, ghost) are 
                available alongside them. No breaking changes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Grid Patterns Section */}
      <section className="py-fluid-xl border-b">
        <div className="container-spec">
          <h2 className="text-fluid-lg font-headline mb-8">Grid Patterns</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Two-Column Grid</h3>
              <p className="text-muted-foreground mb-6">
                Collapses to single column on mobile (&lt;760px)
              </p>
              <div className="grid-2">
                <Card disableHoverEffect>
                  <CardHeader>
                    <CardTitle>Column 1</CardTitle>
                    <CardDescription>First column content</CardDescription>
                  </CardHeader>
                </Card>
                <Card disableHoverEffect>
                  <CardHeader>
                    <CardTitle>Column 2</CardTitle>
                    <CardDescription>Second column content</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Four-Column Grid</h3>
              <p className="text-muted-foreground mb-6">
                Collapses to 2 columns on tablet, 1 column on mobile
              </p>
              <div className="grid-4">
                {[1, 2, 3, 4].map((num) => (
                  <Card key={num} disableHoverEffect>
                    <CardHeader>
                      <CardTitle>Item {num}</CardTitle>
                      <CardDescription>Grid item {num}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Auto-Fit Grid</h3>
              <p className="text-muted-foreground mb-6">
                Automatically adjusts columns based on available space (min 280px per card)
              </p>
              <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Card key={num} disableHoverEffect>
                    <CardHeader>
                      <CardTitle>Card {num}</CardTitle>
                      <CardDescription>Responsive card</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-fluid-xl">
        <div className="container-spec text-center">
          <h2 className="text-fluid-xl font-headline mb-6">
            Ready to Use These Components?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            All components are production-ready with full accessibility support, 
            smooth animations, and backward compatibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="large">
              View Documentation
            </Button>
            <Button variant="outline" size="large">
              Browse Components
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
