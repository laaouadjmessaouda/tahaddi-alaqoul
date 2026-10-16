import { User, Bot, Users, CheckCircle2, Sparkles } from 'lucide-react'

const SolutionPane = ({ solution, side = 'human' }) => {
  const isHuman = side === 'human'

  const theme = isHuman
    ? {
        border: 'border-cyan-300',
        bg: 'bg-cyan-50',
        text: 'text-cyan-700',
        titleText: 'text-cyan-900',
        bodyText: 'text-cyan-900',
        gradient: 'from-cyan-500 to-cyan-700',
        Icon: User,
        label: '👤 الإنسان',
      }
    : {
        border: 'border-purple-300',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        titleText: 'text-purple-900',
        bodyText: 'text-purple-900',
        gradient: 'from-purple-500 to-violet-700',
        Icon: Bot,
        label: '🤖 الذكاء الاصطناعي',
      }

  const Icon = theme.Icon

  return (
    <div
      className={`rounded-2xl border-2 ${theme.border} ${theme.bg} overflow-hidden flex flex-col h-full shadow-md`}
    >
      <div className={`px-5 py-3 bg-gradient-to-r ${theme.gradient} flex items-center gap-2`}>
        <Icon className="w-5 h-5 text-white" />
        <span className="text-white font-black text-sm">{theme.label}</span>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">

        <h3 className={`text-xl font-black ${theme.titleText} leading-tight`}>
          {solution.title}
        </h3>

        <p className={`${theme.bodyText} text-sm leading-relaxed font-medium`}>
          {solution.description}
        </p>

        {solution.targetAudience && (
          <div className="flex items-start gap-2 text-xs">
            <Users className={`w-4 h-4 ${theme.text} shrink-0 mt-0.5`} />
            <span className={`${theme.bodyText} font-bold`}>
              {solution.targetAudience}
            </span>
          </div>
        )}

        {solution.features?.length > 0 && (
          <div className="mt-auto pt-3 border-t border-slate-200">
            <p className={`text-xs font-black ${theme.text} mb-2`}>
              ⭐ الميزات
            </p>
            <ul className="space-y-1.5">
              {solution.features.slice(0, 4).map((f, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2 text-xs ${theme.bodyText} font-medium`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

const ComparisonView = ({ humanSolution, aiSolution }) => {
  if (!humanSolution || !aiSolution) return null

  return (
    <div className="animate-fadeIn">

      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-sky-900 mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-7 h-7 text-amber-600" />
          ⚖️ الحلّان جنبًا إلى جنب
        </h2>
        <p className="text-sky-700 font-medium">
          قارن بين فكرتك وحل الذكاء الاصطناعي
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SolutionPane solution={humanSolution} side="human" />
        <SolutionPane solution={aiSolution} side="ai" />
      </div>
    </div>
  )
}

export default ComparisonView