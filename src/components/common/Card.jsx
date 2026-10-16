// ═══════════════════════════════════════════
// PFM Platform - مكون البطاقة
// ═══════════════════════════════════════════

const VARIANTS = {
  default: 'bg-slate-800 border-slate-700',
  human:   'bg-blue-500/5 border-blue-500/30 hover:border-blue-500/50',
  ai:      'bg-purple-500/5 border-purple-500/30 hover:border-purple-500/50',
  accent:  'bg-amber-500/5 border-amber-500/30',
  success: 'bg-green-500/5 border-green-500/30',
  danger:  'bg-red-500/5 border-red-500/30',
}

const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  const variantClasses = VARIANTS[variant] || VARIANTS.default
  const hoverClasses = hover
    ? 'cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'
    : ''

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border-2 p-6 transition-all duration-300 ${variantClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
)

Card.Title = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-white ${className}`}>{children}</h3>
)

Card.Description = ({ children, className = '' }) => (
  <p className={`text-slate-400 leading-relaxed ${className}`}>{children}</p>
)

Card.Body = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

Card.Footer = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-slate-700 ${className}`}>
    {children}
  </div>
)

export default Card