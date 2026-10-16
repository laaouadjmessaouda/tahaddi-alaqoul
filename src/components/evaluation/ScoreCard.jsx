import { User, Bot } from 'lucide-react'
import ProgressBar from '../common/ProgressBar'
import { getScoreColor, scoreToPercentage } from '../../utils/scoring'

const ScoreCard = ({ side, score, scores }) => {
  const isHuman = side === 'human'

  const theme = isHuman
    ? {
        Icon: User,
        label: 'الإنسان',
        gradient: 'from-cyan-500 to-cyan-600',
        border: 'border-cyan-300',
        bg: 'bg-cyan-50',
        text: 'text-cyan-700',
        labelText: 'text-cyan-800',
        progressColor: 'human',
        shadow: 'shadow-cyan-200/60',
      }
    : {
        Icon: Bot,
        label: 'الذكاء الاصطناعي',
        gradient: 'from-purple-500 to-violet-600',
        border: 'border-purple-300',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        labelText: 'text-purple-800',
        progressColor: 'ai',
        shadow: 'shadow-purple-200/60',
      }

  const Icon = theme.Icon
  const percentage = scoreToPercentage(score)
  const color = getScoreColor(score)

  return (
    <div
      className={`rounded-2xl border-2 ${theme.border} ${theme.bg} shadow-lg ${theme.shadow} overflow-hidden animate-slideUp`}
    >
      {/* الشريط */}
      <div className={`px-5 py-3 bg-gradient-to-r ${theme.gradient} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-white" />
          <span className="text-white font-bold">{theme.label}</span>
        </div>
        <span className="text-white/90 text-xs font-medium">
          {percentage}%
        </span>
      </div>

      {/* النتيجة الكبرى */}
      <div className="p-6 text-center border-b border-slate-200">
        <p className="text-sky-700 text-sm font-semibold mb-2">
          النتيجة الإجمالية
        </p>
        <p
          className="text-6xl font-black tabular-nums"
          style={{ color }}
        >
          {score}
        </p>
        <p className="text-sky-600 text-sm mt-1 font-medium">من 10</p>
      </div>

      {/* تفصيل المعايير */}
      {scores && (
        <div className="p-5 space-y-4">
          <p className="text-sky-800 text-xs font-black uppercase tracking-wide">
            📊 التفاصيل
          </p>
          {Object.entries(scores).map(([criterion, value]) => (
            <ProgressBar
              key={criterion}
              value={value}
              max={10}
              color={theme.progressColor}
              size="sm"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ScoreCard