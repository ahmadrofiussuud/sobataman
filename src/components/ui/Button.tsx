import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'success' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  'aria-label'?: string
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const MotionComp = motion(Comp as any)

    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/20',
      secondary: 'bg-secondary text-primary hover:bg-secondary/80 border border-primary/10',
      accent: 'bg-accent text-white hover:bg-accent-hover shadow-md shadow-accent/20',
      outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary-light',
      ghost: 'bg-transparent text-text-secondary hover:bg-gray-100',
      error: 'bg-error text-white hover:bg-error/90',
      success: 'bg-success text-white hover:bg-success/90',
    }

    const sizes = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-6 text-sm',
      lg: 'h-14 px-8 text-base',
    }

    return (
      <MotionComp
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {asChild ? children : (
          <>
            {isLoading ? (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : leftIcon ? (
              <span className="mr-2">{leftIcon}</span>
            ) : null}
            {children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </MotionComp>
    )
  }
)

Button.displayName = 'Button'
