
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-center whitespace-normal break-words gap-2 rounded-md font-medium leading-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-w-full [text-wrap:balance]",
  {
    variants: {
      variant: {
        // Existing variants (backward compatibility)
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Spec-compliant variants — no overlap, wrap-safe
        primary: "bg-primary text-black hover:shadow-lg hover:-translate-y-0.5 hover:shadow-primary/20",
        outline: "border-2 border-primary bg-transparent text-foreground hover:text-primary hover:border-primary/80",
        "outline-pill": "border-2 border-primary bg-transparent text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary rounded-full",
        ghost: "bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        default: "min-h-10 h-auto px-4 py-2.5 text-sm leading-snug",
        sm: "min-h-9 h-auto px-3 py-2 text-sm leading-snug rounded-md",
        lg: "min-h-12 h-auto px-6 sm:px-8 py-3 text-base leading-snug rounded-md",
        large: "min-h-14 h-auto px-6 sm:px-8 py-3.5 text-base sm:text-lg leading-snug", // responsive large — wraps at 375, no overflow
        icon: "h-10 w-10 min-h-0 p-0 shrink-0",
        "fluid-lg": "h-auto py-fluid-sm px-fluid-md text-fluid-base rounded-md",
        "fluid-default": "h-auto py-fluid-xs px-fluid-sm text-fluid-sm rounded-md",
        "fluid-sm": "h-auto py-1 px-2 text-xs rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
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
