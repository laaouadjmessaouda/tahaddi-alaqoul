import {
  Sparkles, Wrench, Target, Eye, MapPin,
  User, Bot, Minus, CheckCircle2,
} from 'lucide-react'
import { compareCriteria } from '../../utils/scoring'
import { WINNER } from '../../utils/constants'

const ICON_MAP = { Sparkles, Wrench, Target, Eye, MapPin }

const CriteriaGrid = ({ humanScores, aiScores }) => {
  if (!humanScores || !aiScores) return null

  const comparisons = compareCriteria(humanScores, aiScores)

  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white shadow-lg overflow-hidden animate-fadeIn">
      {/* الرأس */}
      <div className="px-6 py-4 bg-gradient-to-r from-sky-50 to-cyan-50 border-b-2 border-sky-200">
        <h3 className="text-xl font-black text-sky-900">
          📋 تفصيل المعايير
        </h3>
        <p className="text-sky-700 text-sm mt-1 font-medium">
          مقارنة معيارية دقيقة بين الحلّين
        </p>
      </div>

      {/* شبكة المقارنة */}
      <div className="p-6 space-y-4">
        {comparisons.map((c) => {
          const Icon = ICON_MAP[c.icon] || Target
          const humanWin = c.winner === WINNER.HUMAN
          const aiWin = c.winner === WINNER.AI
          const tie = c.winner === WINNER.TIE

          return (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-sky-50/50 border-2 border-sky-100 hover:border-sky-300 transition-colors"
            >
              {/* العنوان */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-amber-600" />
                  <span className="text-sky-900 font-bold">{c.name}</span>
                  {c.humanAdvantage && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold border border-cyan-300">
                      ميزة بشرية
                    </span>
                  )}
                </div>
                <span className="text-xs text-sky-700 font-bold">
                  {Math.round(c.weight * 100)}%
                </span>
              </div>

              {/* المقارنة */}
              <div className="space-y-2">
                {/* الإنسان */}
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-cyan-600 shrink-0" />
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full transition-all duration-700"
                      style={{ width: `${(c.humanScore / 10) * 100}%` }}
                    />
                  </div>
                  <span
                    className={`w-10 text-right font-black tabular-nums ${
                      humanWin ? 'text-emerald-600' : 'text-sky-800'
                    }`}
                  >
                    {c.humanScore}
                  </span>
                  {humanWin && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {!humanWin && !aiWin && (
                    <Minus className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  {(aiWin || tie) && <span className="w-4" />}
                </div>

                {/* AI */}
                <div className="flex items-center gap-3">
                  <Bot className="w-4 h-4 text-purple-600 shrink-0" />
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-violet-600 rounded-full transition-all duration-700"
                      style={{ width: `${(c.aiScore / 10) * 100}%` }}
                    />
                  </div>
                  <span
                    className={`w-10 text-right font-black tabular-nums ${
                      aiWin ? 'text-emerald-600' : 'text-sky-800'
                    }`}
                  >
                    {c.aiScore}
                  </span>
                  {aiWin && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {!humanWin && !aiWin && (
                    <Minus className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  {(humanWin || tie) && <span className="w-4" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CriteriaGrid