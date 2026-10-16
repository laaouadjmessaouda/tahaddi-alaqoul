import { Bot, Sparkles, Users, CheckCircle2, Cpu } from 'lucide-react'
import Loader from '../common/Loader'

const AISolutionCard = ({ solution, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border-2 border-purple-300 bg-purple-50 p-12 text-center">
        <Loader variant="ai" size="lg" text="الذكاء الاصطناعي يفكر..." />
      </div>
    )
  }

  if (!solution) return null

  return (
    <div className="rounded-2xl border-2 border-purple-300 bg-white shadow-lg overflow-hidden animate-slideUp">

      {/* الشريط العلوي */}
      <div className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-white" />
          <span className="text-white font-black text-sm">
            🤖 حل الذكاء الاصطناعي
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-white/80" />
          <span className="text-white/90 text-xs font-bold">
            {solution.model || solution.source}
          </span>
        </div>
      </div>

      {/* المحتوى */}
      <div className="p-6 space-y-5">

        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
          <h3 className="text-2xl font-black text-purple-900 leading-tight">
            {solution.title}
          </h3>
        </div>

        <p className="text-purple-900 leading-relaxed font-medium">
          {solution.description}
        </p>

        {solution.targetAudience && (
          <div className="flex gap-3 p-4 rounded-xl bg-purple-50 border-2 border-purple-200">
            <Users className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-800 text-sm font-black mb-1">
                👥 الفئة المستهدفة
              </p>
              <p className="text-purple-900 text-sm font-medium">
                {solution.targetAudience}
              </p>
            </div>
          </div>
        )}

        {solution.features?.length > 0 && (
          <div>
            <p className="text-purple-800 font-black text-sm mb-3">
              ✨ الميزات الرئيسية
            </p>
            <div className="space-y-2">
              {solution.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-emerald-900 text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {solution.implementation && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200">
            <p className="text-purple-800 font-black text-sm mb-2">
              🛠️ كيفية التنفيذ
            </p>
            <p className="text-purple-900 text-sm leading-relaxed font-medium">
              {solution.implementation}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default AISolutionCard