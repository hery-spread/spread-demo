import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform-gpu active:scale-[0.98] hover:scale-[1.02] group relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 backdrop-blur-sm border border-purple-500/20',
        secondary:
          'bg-white/80 backdrop-blur-md text-gray-900 hover:bg-white/90 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20 border border-gray-200/50',
        outline:
          'border-2 border-gray-300/60 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:border-gray-400/80 shadow-sm hover:shadow-lg transition-all duration-300',
        ghost:
          'hover:bg-gray-100/80 backdrop-blur-sm hover:shadow-md transition-all duration-300',
        link: 'underline-offset-4 hover:underline text-purple-600 hover:text-purple-700 transition-colors duration-300',
        glass:
          'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl shadow-black/10 hover:bg-white/20 hover:shadow-2xl hover:shadow-black/20',
      },
      size: {
        default: 'h-11 px-6 py-2 text-sm',
        sm: 'h-9 px-4 text-xs rounded-lg',
        lg: 'h-13 px-8 text-base rounded-xl',
        icon: 'h-11 w-11 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {/* Glassmorphism shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
        )}

        {children}

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
