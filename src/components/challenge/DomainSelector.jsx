// ═══════════════════════════════════════════
// PFM Platform - اختيار المجال + مجال مخصص
// ═══════════════════════════════════════════

import { useState } from 'react'
import {
  GraduationCap, Leaf, MapPin, Cpu, Rocket,
  Palette, HeartPulse, BookOpen, Wallet, Gamepad2,
  Sparkles, ArrowLeft, Plus, X, Check,
} from 'lucide-react'
import { DOMAINS } from '../../data/domains'
import {
  buildCustomDomain,
  validateCustomDomain,
} from '../../data/customDomain'
import Button from '../common/Button'

const ICON_MAP = {
  GraduationCap, Leaf, MapPin, Cpu, Rocket,
  Palette, HeartPulse, BookOpen, Wallet, Gamepad2,
  Sparkles,
}

const DomainSelector = ({ onSelect, selectedId = null }) => {
  const [showCustom, setShowCustom] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customError, setCustomError] = useState(null)

  const handleCustomSubmit = () => {
    const validation = validateCustomDomain(customName)
    if (!validation.isValid) {
      setCustomError(validation.error)
      return
    }
    const domain = buildCustomDomain(customName)
    if (domain) {
      onSelect(domain.id, domain, customName.trim())
    }
  }

  return (
    <div className="animate-fadeIn">

      {/* العنوان */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
          اختر مجالك
        </h2>
        <p className="text-slate-400 text-lg">
          10 مجالات متنوعة + إمكانية إنشاء مجال مخصص
        </p>
      </div>

      {/* شبكة المجالات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {DOMAINS.map((domain, index) => {
          const Icon = ICON_MAP[domain.icon] || Rocket
          const isSelected = selectedId === domain.id

          return (
            <button
              key={domain.id}
              onClick={() => onSelect(domain.id, domain)}
              className={`group relative text-right p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl animate-slideUp ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-500'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* الأيقونة */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-gradient-to-br ${domain.gradient} shadow-lg group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* الاسم */}
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                {domain.name}
                <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>

              {/* الوصف */}
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                {domain.description}
              </p>

              {/* علامة الاختيار */}
              {isSelected && (
                <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          )
        })}

        {/* ─── بطاقة المجال المخصص ─── */}
        <button
          onClick={() => setShowCustom(true)}
          className="group relative text-right p-5 rounded-2xl border-2 border-dashed border-amber-500/50 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300 hover:scale-[1.03] animate-slideUp"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-lg font-bold text-amber-400 mb-1 flex items-center gap-2">
            مجال مخصص
            <Sparkles className="w-4 h-4" />
          </h3>

          <p className="text-slate-400 text-xs leading-relaxed">
            اكتب مجالًا من اختيارك — رياضة، طبخ، فضاء، أو أي شيء يهمك
          </p>
        </button>
      </div>

      {/* ─── Modal: كتابة المجال المخصص ─── */}
      {showCustom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowCustom(false)}
        >
          <div
            className="bg-slate-800 border-2 border-amber-500/30 rounded-2xl shadow-2xl w-full max-w-lg animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* الرأس */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    مجال مخصص
                  </h3>
                  <p className="text-slate-400 text-sm">
                    اكتب المجال الذي يهمك
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCustom(false)}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* المحتوى */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  اسم المجال
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => {
                    setCustomName(e.target.value)
                    if (customError) setCustomError(null)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCustomSubmit()
                  }}
                  placeholder="مثال: الرياضة، الطبخ، الفضاء، الموسيقى..."
                  maxLength={50}
                  autoFocus
                  className={customError ? 'border-red-500' : ''}
                />
                {customError && (
                  <p className="text-red-400 text-sm mt-1">{customError}</p>
                )}
                <p className="text-slate-500 text-xs mt-2">
                  💡 اكتب أي مجال — الذكاء الاصطناعي سيتكيف معه
                </p>
              </div>

              {/* اقتراحات سريعة */}
              <div>
                <p className="text-slate-400 text-xs mb-2">اقتراحات:</p>
                <div className="flex flex-wrap gap-2">
                  {['الرياضة', 'الطبخ', 'الفضاء', 'الموسيقى', 'الأزياء', 'الحيوانات'].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setCustomName(suggestion)}
                        className="px-3 py-1.5 rounded-full bg-slate-700 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-xs transition-colors"
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* الأزرار */}
            <div className="p-6 pt-0 flex gap-3">
              <Button
                variant="accent"
                fullWidth
                onClick={handleCustomSubmit}
                disabled={!customName.trim()}
              >
                🚀 ابدأ التحدي
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCustom(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DomainSelector