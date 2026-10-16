import { Heart, Mail, Sparkles } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-sky-300/50 bg-white/70 backdrop-blur-md mt-auto">
      <div className="container-pfm py-8">

        {/* ─── بصمة المطوّر ─── */}
        <div className="flex flex-col items-center gap-4 mb-6">

          {/* الشعار الصغير */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-50 to-cyan-50 border-2 border-sky-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-bounce-icon" />
            <span className="text-sky-900 font-bold text-sm">
              صُنع من طرف
            </span>
            <span className="shimmer-text font-black text-base">
              لعوج مسعودة
            </span>
            <Sparkles className="w-4 h-4 text-amber-500 animate-bounce-icon" />
          </div>

          {/* البريد الإلكتروني */}
          <a
            href="mailto:laoudjmasouda@gmail.com"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>لأي استفسار أو تعاون</span>
            <span className="text-sky-100 font-mono text-xs">laaouadjmessaouda@gmail.com</span>
          </a>
        </div>

        {/* خط فاصل */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent mb-4" />

        {/* ─── السطر السفلي ─── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-sky-800">
          <p className="font-medium">
            © {currentYear}{' '}
            <span className="font-black text-sky-900">تحدّي العقول</span>
            {' '}— جميع الحقوق محفوظة
          </p>
          <p className="flex items-center gap-1.5 font-medium">
            صُنع بـ
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            للإبداع البشري
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer