import { Target, AlertTriangle, Users, Zap, Tag, Clock } from 'lucide-react'
import { getDomainById } from '../../data/domains'
import { DIFFICULTY_LEVELS } from '../../utils/constants'

const ProblemCard = ({ problem, showDetails = true }) => {
  if (!problem) return null

  const domain = getDomainById(problem.domain)
  const difficulty = DIFFICULTY_LEVELS[problem.difficulty] || DIFFICULTY_LEVELS.medium

  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white shadow-lg overflow-hidden animate-slideUp">

      {/* الشريط العلوي */}
      <div className={`px-6 py-3 bg-gradient-to-r ${domain?.gradient || 'from-sky-500 to-sky-700'} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-white" />
          <span className="text-white font-black text-sm">
            🎯 المشكلة
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur text-white text-xs font-bold">
            {domain?.name}
          </span>
          <span
            className="px-3 py-1 rounded-full text-white text-xs font-bold"
            style={{ background: difficulty.color }}
          >
            {difficulty.label}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur text-white text-xs font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {problem.timeLimit || 60}ث
          </span>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-6 space-y-5">

        {/* العنوان */}
        <h3 className="text-2xl md:text-3xl font-black text-sky-900 leading-tight">
          {problem.title}
        </h3>

        {/* الوصف */}
        <p className="text-sky-800 leading-relaxed text-base font-medium">
          {problem.description}
        </p>

        {showDetails && (
          <>
            {/* السياق */}
            {problem.context && (
              <div className="flex gap-3 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
                <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 text-sm font-black mb-1">💡 السياق</p>
                  <p className="text-amber-900 text-sm leading-relaxed font-medium">
                    {problem.context}
                  </p>
                </div>
              </div>
            )}

            {/* القيود */}
            {problem.constraints?.length > 0 && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800 font-black text-sm">⚠️ القيود</p>
                </div>
                <ul className="space-y-2">
                  {problem.constraints.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-red-900 text-sm font-medium"
                    >
                      <span className="text-red-500 mt-1 font-black">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* الفئة المستهدفة + الوسوم */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problem.targetAudience && (
                <div className="flex gap-3 p-4 rounded-xl bg-cyan-50 border-2 border-cyan-200">
                  <Users className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-cyan-800 text-sm font-black mb-1">
                      👥 الفئة المستهدفة
                    </p>
                    <p className="text-cyan-900 text-sm font-medium">
                      {problem.targetAudience}
                    </p>
                  </div>
                </div>
              )}

              {problem.tags?.length > 0 && (
                <div className="flex gap-3 p-4 rounded-xl bg-purple-50 border-2 border-purple-200">
                  <Tag className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-purple-800 text-sm font-black mb-2">
                      🏷️ الوسوم
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {problem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold border border-purple-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProblemCard