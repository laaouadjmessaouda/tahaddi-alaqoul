import { Trophy, Handshake, Bot, User, TrendingUp } from 'lucide-react'
import { WINNER } from '../../utils/constants'

const WinnerBanner = ({ winner, humanScore, aiScore, difference }) => {
  const config = {
    [WINNER.HUMAN]: {
      icon: Trophy,
      title: '🎉 فوز الإنسان!',
      subtitle: 'إبداعك تفوّق على الآلة',
      gradient: 'from-cyan-500 via-cyan-600 to-blue-600',
      glow: 'shadow-cyan-500/40',
    },
    [WINNER.AI]: {
      icon: Bot,
      title: '🤖 فوز الذكاء الاصطناعي',
      subtitle: 'لا تستسلم — كل محاولة تُعلّمك',
      gradient: 'from-purple-500 via-violet-500 to-fuchsia-500',
      glow: 'shadow-purple-500/40',
    },
    [WINNER.TIE]: {
      icon: Handshake,
      title: '🤝 تعادل مثير!',
      subtitle: 'تكامل بين الإبداع البشري والمنطق الآلي',
      gradient: 'from-amber-500 via-orange-500 to-yellow-500',
      glow: 'shadow-amber-500/40',
    },
  }

  const c = config[winner] || config[WINNER.TIE]
  const Icon = c.icon

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${c.gradient} p-8 shadow-2xl ${c.glow} animate-scaleIn`}
    >
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0 w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center animate-bounce-slow">
          <Icon className="w-10 h-10 text-white" />
        </div>

        <div className="text-center md:text-right flex-1">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
            {c.title}
          </h2>
          <p className="text-white/95 text-lg font-medium">{c.subtitle}</p>
        </div>

        <div className="shrink-0 text-center">
          <p className="text-white/80 text-xs font-bold mb-1">
            فارق النقاط
          </p>
          <div className="flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5" />
            <span className="text-3xl font-black">{difference}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-6 pt-6 border-t border-white/30 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-white/90 text-sm mb-1 font-semibold">
            <User className="w-4 h-4" />
            الإنسان
          </div>
          <p className="text-3xl font-black text-white">{humanScore}/10</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-white/90 text-sm mb-1 font-semibold">
            <Bot className="w-4 h-4" />
            AI
          </div>
          <p className="text-3xl font-black text-white">{aiScore}/10</p>
        </div>
      </div>
    </div>
  )
}

export default WinnerBanner