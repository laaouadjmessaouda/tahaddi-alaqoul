// ═══════════════════════════════════════════
// PFM Platform - غلاف المحتوى
// ═══════════════════════════════════════════

const SIZES = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-7xl',
  full: 'max-w-full',
}

const Container = ({
  children,
  size = 'lg',
  className = '',
  padding = true,
}) => {
  const sizeClass = SIZES[size] || SIZES.lg
  const paddingClass = padding ? 'px-4 md:px-8 py-8' : ''

  return (
    <div className={`${sizeClass} mx-auto w-full ${paddingClass} ${className}`}>
      {children}
    </div>
  )
}

// ─── غلاف الصفحة الكامل ───
export const PageWrapper = ({ children, className = '' }) => (
  <main className={`flex-1 ${className}`}>
    {children}
  </main>
)

// ─── قسم بعنوان ───
export const Section = ({
  title,
  subtitle,
  children,
  className = '',
  center = false,
}) => (
  <section className={`mb-12 ${className}`}>
    {(title || subtitle) && (
      <div className={`mb-8 ${center ? 'text-center' : ''}`}>
        {title && (
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    )}
    {children}
  </section>
)

export default Container