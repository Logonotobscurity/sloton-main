import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const outlineCut =
  "rounded-full border border-foreground/25 bg-transparent text-foreground hover:border-foreground transition-colors duration-150 ease-quiet"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-center whitespace-normal break-words hyphens-auto gap-2 font-medium leading-tight transition-transform duration-150 ease-quiet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-w-full [text-wrap:balance] [overflow-wrap:anywhere] rounded-full",
  {
    variants: {
      variant: {
        default: outlineCut,
        outline: outlineCut,
        "outline-pill": outlineCut,
        primary:
          "rounded-full bg-primary text-primary-foreground hover:scale-[1.03] active:scale-[0.98] border-0",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground hover:opacity-90 border-0",
        destructive:
          "rounded-full border border-destructive bg-transparent text-destructive hover:bg-destructive/5",
        ghost:
          "rounded-full border-0 bg-transparent text-foreground hover:bg-muted",
        link: "rounded-full border-0 bg-transparent text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-10 h-auto px-4 py-2.5 text-[clamp(0.82rem,2.5vw,0.875rem)] leading-snug",
        sm: "min-h-9 h-auto px-3 py-2 text-[clamp(0.78rem,2.2vw,0.82rem)] leading-snug",
        lg: "min-h-12 h-auto px-5 sm:px-7 py-3 text-[clamp(0.9rem,2.8vw,1rem)] leading-snug",
        large: "min-h-14 h-auto px-5 sm:px-7 py-3.5 text-[clamp(0.95rem,3vw,1.05rem)] leading-snug",
        icon: "h-10 w-10 min-h-0 p-0 shrink-0 rounded-full",
        "fluid-lg": "h-auto py-fluid-sm px-fluid-md text-fluid-base",
        "fluid-default": "h-auto py-fluid-xs px-fluid-sm text-fluid-sm",
        "fluid-sm": "h-auto py-1 px-2 text-xs",
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
