import { Loader2 } from 'lucide-react'

const Loader = ({
  size = 'md',
  text = null,
  fullScreen = false,
  variant = 'default',
}) => {
  const SIZES = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const COLORS = {
    default: 'text-sky-600',
    human: 'text-cyan-600',
    ai: 'text-purple-600',
    white: 'text-white',
  }

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={`${SIZES[size]} ${COLORS[variant]} animate-spin`}
      />
      {text && (
        <p className="text-sky-800 text-sm font-bold animate-pulse">
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/95 backdrop-blur-sm">
        {content}
      </div>
    )
  }

  return content
}

export const DotsLoader = ({ color = 'text-sky-600' }) => (
  <div className="flex gap-1.5 items-center">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={`w-2 h-2 rounded-full bg-current ${color}`}
        style={{
          animation: `bounce 1.4s infinite ease-in-out`,
          animationDelay: `${i * 0.16}s`,
        }}
      />
    ))}
  </div>
)

export const SkeletonCard = () => (
  <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 animate-pulse shadow-md">
    <div className="h-6 bg-sky-100 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-sky-100 rounded w-full mb-2"></div>
    <div className="h-4 bg-sky-100 rounded w-5/6"></div>
  </div>
)

export default Loader