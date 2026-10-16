// ═══════════════════════════════════════════
// PFM Platform - مكون الزر
// ═══════════════════════════════════════════

import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/20',
  ai:
    'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600 text-white shadow-lg shadow-purple-500/20',
  accent:
    'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-lg shadow-amber-500/20',
  success:
    'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white shadow-lg shadow-green-500/20',
  danger:
    'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-lg shadow-red-500/20',
  outline:
    'bg-transparent border-2 border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white',
  ghost:
    'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
  xl: 'px-10 py-5 text-xl rounded-2xl',
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      fullWidth = false,
      leftIcon: LeftIcon = null,
      rightIcon: RightIcon = null,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50'

    const variantClasses = VARIANTS[variant] || VARIANTS.primary
    const sizeClasses = SIZES[size] || SIZES.md
    const widthClasses = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>جارٍ...</span>
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon className="w-5 h-5" />}
            {children}
            {RightIcon && <RightIcon className="w-5 h-5" />}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button