import { useState } from 'react'
import { Send, Plus, X, Lightbulb, User } from 'lucide-react'
import Button from '../common/Button'

const HumanSolutionForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAudience: '',
    features: [],
  })
  const [featureInput, setFeatureInput] = useState('')

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addFeature = () => {
    if (!featureInput.trim()) return
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }))
    setFeatureInput('')
  }

  const removeFeature = (i) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== i),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* الرأس */}
      <div className="flex items-center gap-3 pb-4 border-b-2 border-sky-200">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-sky-900">
            ✍️ حلك البشري
          </h3>
          <p className="text-sky-700 text-sm font-medium">
            اكتب فكرتك قبل أن ترى حل AI
          </p>
        </div>
      </div>

      {/* اسم المشروع */}
      <div>
        <label className="block text-sky-900 font-black mb-2 text-sm">
          🎯 اسم المشروع <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="مثال: دليل الطالب الذكي"
          maxLength={100}
        />
      </div>

      {/* الوصف */}
      <div>
        <label className="block text-sky-900 font-black mb-2 text-sm">
          📝 وصف الحل <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="اشرح فكرتك بالتفصيل: كيف تعمل؟ لمن؟ ولماذا هي الأفضل؟"
          rows={6}
          maxLength={2000}
          className="resize-none"
        />
      </div>

      {/* الفئة المستهدفة */}
      <div>
        <label className="block text-sky-900 font-black mb-2 text-sm">
          👥 الفئة المستهدفة <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.targetAudience}
          onChange={(e) => handleChange('targetAudience', e.target.value)}
          placeholder="مثال: طلبة السنة الأولى، أصحاب المتاجر الصغيرة"
        />
      </div>

      {/* الميزات */}
      <div>
        <label className="block text-sky-900 font-black mb-2 text-sm flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          ✨ الميزات الرئيسية ({formData.features.length})
        </label>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addFeature()
              }
            }}
            placeholder="أضف ميزة واضغط Enter"
          />
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={addFeature}
            disabled={!featureInput.trim()}
            leftIcon={Plus}
          >
            إضافة
          </Button>
        </div>

        {formData.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border-2 border-cyan-300 text-cyan-800 text-sm font-bold"
              >
                <span>{f}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* زر الإرسال */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        rightIcon={Send}
      >
        🚀 إرسال الحل ومقارنته بـ AI
      </Button>

    </form>
  )
}

export default HumanSolutionForm