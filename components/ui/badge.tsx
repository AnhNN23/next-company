import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
        // New vibrant variants
        engineering: "badge-engineering animate-badge-glow",
        design: "badge-design animate-badge-glow",
        marketing: "badge-marketing animate-badge-glow",
        fulltime: "badge-fulltime animate-badge-glow",
        remote: "badge-remote animate-badge-glow",
        hybrid: "badge-hybrid animate-badge-glow",
      },
      animation: {
        none: "",
        pulse: "animate-pulse-slow",
        glow: "animate-badge-glow",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "none",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, animation, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, animation }), className)} {...props} />
}

export { Badge, badgeVariants }
