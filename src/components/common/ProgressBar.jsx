const ProgressBar = ({
  value = 0,
  max = 100,
  label = null,
  showValue = false,
  color = 'blue',
  size = 'md',
  animated = true,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const COLORS = {
    blue:     'from-sky-500 to-sky-600',
    purple:   'from-purple-500 to-violet-600',
    green:    'from-emerald-500 to-emerald-600',
    amber:    'from-amber-500 to-orange-600',
    red:      'from-red-500 to-rose-600',
    human:    'from-cyan-500 to-cyan-700',
    ai:       'from-purple-500 to-violet-700',
  }

  const SIZES = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const colorClass = COLORS[color] || COLORS.blue
  const sizeClass = SIZES[size] || SIZES.md

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-black text-sky-900">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm font-black text-sky-800">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizeClass}`}>
        <div
          className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-700 ease-out ${
            animated ? 'animate-pulse-slow' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export const ComparisonBar = ({ label, humanValue, aiValue, max = 10 }) => {
  const humanPct = (humanValue / max) * 100
  const aiPct = (aiValue / max) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-sky-900 font-black">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-cyan-700 font-black">{humanValue}</span>
          <span className="text-slate-400 font-bold">vs</span>
          <span className="text-purple-700 font-black">{aiValue}</span>
        </div>
      </div>

      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full transition-all duration-700"
          style={{ width: `${humanPct}%` }}
        />
      </div>

      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all duration-700"
          style={{ width: `${aiPct}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar