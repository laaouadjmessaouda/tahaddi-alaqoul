import { useNavigate } from 'react-router-dom'
import {
  Sparkles, Zap, Users, Trophy, Swords, Bot, User,
  Target, Lightbulb, Rocket,
} from 'lucide-react'
import Container from '../components/layout/Container'
import { ROUTES } from '../utils/constants'

function HomePage() {
  const navigate = useNavigate()

  const steps = [
    {
      icon: Sparkles,
      n: '1',
      t: 'اختر مجالك',
      d: 'مجالات متنوعة',
      gradient: 'from-cyan-400 to-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-300',
      glow: 'group-hover:shadow-cyan-300/60',
    },
    {
      icon: Zap,
      n: '2',
      t: 'اقرأ المشكلة',
      d: 'مشكلة حقيقية',
      gradient: 'from-amber-400 to-orange-600',
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      glow: 'group-hover:shadow-amber-300/60',
    },
    {
      icon: Users,
      n: '3',
      t: 'اكتب حلك',
      d: 'قبل انتهاء الوقت',
      gradient: 'from-pink-400 to-rose-600',
      bg: 'bg-pink-50',
      border: 'border-pink-300',
      glow: 'group-hover:shadow-pink-300/60',
    },
    {
      icon: Trophy,
      n: '4',
      t: 'شاهد الفائز',
      d: 'مع تقييم مفصّل',
      gradient: 'from-purple-400 to-violet-600',
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      glow: 'group-hover:shadow-purple-300/60',
    },
  ]

  return (
    <Container size="lg">
      <div className="py-16 space-y-32">

        {/* ═══ Hero ═══ */}
        <div className="text-center space-y-12">

          {/* شارة علوية */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur border-2 border-sky-400 shadow-md animate-pulse-glow">
            <Swords className="w-4 h-4 text-sky-700 animate-sword" />
            <span className="text-sky-800 text-sm font-bold">
              معركة العقول بدأت
            </span>
          </div>

          {/* العنوان الرئيسي */}
          <h1 className="text-6xl md:text-8xl font-black leading-none">
            <span className="text-gradient-hero">
              تحدّي العقول
            </span>
          </h1>

          {/* صراع أنت vs AI */}
          <div className="pt-8">
            <div className="flex items-center justify-center gap-6 md:gap-8 text-2xl md:text-3xl">

              {/* بطاقة "أنت" */}
              <div className="group flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur border-2 border-cyan-400 shadow-lg hover:scale-110 transition-transform hover:shadow-cyan-400/60">
                <User className="w-6 h-6 text-cyan-600 animate-bounce-icon" />
                <span className="font-black text-cyan-800">أنت</span>
              </div>

              {/* السيف */}
              <span className="text-4xl md:text-5xl animate-sword">⚔️</span>

              {/* بطاقة AI */}
              <div className="group flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur border-2 border-purple-400 shadow-lg hover:scale-110 transition-transform hover:shadow-purple-400/60">
                <Bot className="w-6 h-6 text-purple-600 animate-bounce-icon" />
                <span className="font-black text-purple-800">
                  الذكاء الاصطناعي
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ كيف تعمل المنصة؟ ═══ */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="shimmer-text">كيف تعمل المنصة؟</span>
          </h2>

          {/* خط أزرق */}
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-sky-500 to-transparent rounded-full mb-6" />

          <p className="text-sky-700 text-lg mb-12">
            4 خطوات تنقلك من الفكرة إلى الحسم
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl ${s.bg} border-2 ${s.border} shadow-lg hover:shadow-2xl ${s.glow} hover:-translate-y-2 transition-all duration-300 text-center animate-slideUp`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform`}
                >
                  <s.icon className="w-8 h-8 text-white animate-bounce-icon" />
                </div>

                <div className="text-slate-500 font-black text-xs mb-1 tracking-wider">
                  الخطوة {s.n}
                </div>
                <h3 className="text-slate-800 font-bold text-lg mb-2">
                  {s.t}
                </h3>
                <p className="text-slate-600 text-sm">{s.d}</p>

                <span className="absolute top-3 left-3 text-5xl font-black text-white/40 select-none">
                  {s.n}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ CTA النهائي ═══ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 p-10 md:p-16 text-center shadow-2xl">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/20 blur-3xl animate-pulse delay-500" />

          <Lightbulb className="absolute top-8 left-8 w-8 h-8 text-white/40 animate-float" />
          <Rocket className="absolute bottom-8 right-8 w-8 h-8 text-white/40 animate-float delay-300" />
          <Target className="absolute top-8 right-8 w-8 h-8 text-white/40 animate-spin-slow" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur border border-white/40">
              <Swords className="w-4 h-4 text-white animate-sword" />
              <span className="text-white text-sm font-bold">التحدي ينتظرك</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
              هل أنت مستعد لمواجهة AI؟
            </h2>

            <p className="text-white/95 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              لا تخف من الذكاء الاصطناعي. اختبر نفسك أمامه، واكتشف أين قوتك الحقيقية.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate(ROUTES.CHALLENGE)}
                className="group inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-white text-sky-700 font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all animate-pulse-glow"
              >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform animate-bounce-icon" />
                ابدأ الآن — مجانًا
                <Target className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </Container>
  )
}

export default HomePage