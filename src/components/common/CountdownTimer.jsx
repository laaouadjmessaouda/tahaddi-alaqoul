import { Clock, AlertTriangle } from 'lucide-react'
import { formatTime } from '../../utils/formatters'

const CountdownTimer = ({ timeLeft, totalTime = 300 }) => {
  const percentage = (timeLeft / totalTime) * 100
  const isWarning = percentage <= 25
  const isCritical = percentage <= 10

  const colorClasses = isCritical
    ? 'text-red-700 border-red-300 bg-red-50'
    : isWarning
    ? 'text-amber-800 border-amber-300 bg-amber-50'
    : 'text-sky-800 border-sky-300 bg-sky-50'

  return (
    <div
      className={`relative rounded-2xl border-2 p-5 transition-all duration-300 shadow-md ${colorClasses}`}
    >
      <div className="flex items-center justify-center gap-3">
        {isCritical ? (
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        ) : (
          <Clock className={`w-6 h-6 ${isWarning ? 'animate-pulse' : ''}`} />
        )}
        <span className="text-4xl font-black tabular-nums tracking-wider">
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-linear rounded-full"
          style={{
            width: `${percentage}%`,
            background: isCritical
              ? 'linear-gradient(90deg, #dc2626, #b91c1c)'
              : isWarning
              ? 'linear-gradient(90deg, #d97706, #b45309)'
              : 'linear-gradient(90deg, #0ea5e9, #0284c7)',
          }}
        />
      </div>

      {isWarning && (
        <p className="text-center mt-3 text-sm font-black animate-pulse">
          {isCritical ? '⚠️ الوقت ينفد!' : '⏰ بقي القليل'}
        </p>
      )}
    </div>
  )
}

export default CountdownTimer