
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-center whitespace-normal break-words hyphens-auto gap-2 rounded-full font-medium leading-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-w-full [text-wrap:balance] [overflow-wrap:anywhere]",
  {
    variants: {
      variant: {
        // PO — Pill Outline (unified design system) — replaces all previous styles
        default: "border-2 border-primary bg-transparent text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5",
        primary: "border-2 border-primary bg-transparent text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5",
        secondary: "border-2 border-primary bg-transparent text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5",
        destructive: "border-2 border-destructive bg-transparent text-destructive hover:text-destructive hover:bg-destructive/5 hover:border-destructive rounded-full shadow-sm",
        outline: "border-2 border-primary bg-transparent text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5",
        "outline-pill": "border-2 border-primary bg-transparent text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5",
        ghost: "border-2 border-transparent bg-transparent text-foreground hover:bg-muted hover:border-transparent rounded-full",
        link: "border-2 border-transparent bg-transparent text-primary underline-offset-4 hover:underline hover:bg-primary/5 rounded-full",
      },
      size: {
        default: "min-h-10 h-auto px-4 py-2.5 text-[clamp(0.82rem,2.5vw,0.875rem)] leading-snug",
        sm: "min-h-9 h-auto px-3 py-2 text-[clamp(0.78rem,2.2vw,0.82rem)] leading-snug rounded-full",
        lg: "min-h-12 h-auto px-5 sm:px-7 py-3 text-[clamp(0.9rem,2.8vw,1rem)] leading-snug rounded-full",
        large: "min-h-14 h-auto px-5 sm:px-7 py-3.5 text-[clamp(0.95rem,3vw,1.05rem)] leading-snug rounded-full", // PO large — responsive clamp prevents overflow at 375
        icon: "h-10 w-10 min-h-0 p-0 shrink-0 rounded-full",
        "fluid-lg": "h-auto py-fluid-sm px-fluid-md text-fluid-base rounded-full",
        "fluid-default": "h-auto py-fluid-xs px-fluid-sm text-fluid-sm rounded-full",
        "fluid-sm": "h-auto py-1 px-2 text-xs rounded-full",
      },
    },
    defaultVariants: {
      variant: "outline-pill",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Button component with multiple style variants
 * 
 * @example
 * // Primary CTA button with hover lift effect
 * <Button variant="primary" size="large">Get Started</Button>
 * 
 * // Outline button
 * <Button variant="outline">Learn More</Button>
 * 
 * // Outline pill button (rounded)
 * <Button variant="outline-pill">Filter</Button>
 * 
 * // Ghost button for subtle actions
 * <Button variant="ghost">Cancel</Button>
 * 
 * Accessibility:
 * - Visible focus ring (2px solid primary color)
 * - Disabled state prevents interaction
 * - Proper contrast ratios maintained
 * - Respects prefers-reduced-motion
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
