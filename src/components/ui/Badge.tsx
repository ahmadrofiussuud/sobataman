import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline'
}

function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  const variants = {
    primary: "bg-primary-light text-primary border-primary/10",
    secondary: "bg-gray-100 text-text-secondary border-gray-200",
    accent: "bg-accent-light text-accent border-accent/10",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    error: "bg-error/10 text-error border-error/20",
    outline: "border-border text-text-secondary bg-transparent",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-pill border px-3 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
