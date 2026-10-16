// ═══════════════════════════════════════════
// PFM Platform - معايير التقييم
// ═══════════════════════════════════════════

export const CRITERIA = [
  {
    id: 'originality',
    name: 'الأصالة',
    nameEn: 'Originality',
    icon: 'Sparkles',
    weight: 0.25,           // 25% من النتيجة الإجمالية
    maxScore: 10,
    description: 'هل الفكرة جديدة أم مكررة؟ هل تحمل بصمة شخصية؟',
    humanAdvantage: true,   // الإنسان يتفوق عادةً هنا
    color: '#f59e0b',
  },
  {
    id: 'feasibility',
    name: 'قابلية التنفيذ',
    nameEn: 'Feasibility',
    icon: 'Wrench',
    weight: 0.20,
    maxScore: 10,
    description: 'هل يمكن تنفيذ الحل فعليًا؟ هل الموارد متوفرة؟',
    humanAdvantage: false,
    color: '#10b981',
  },
  {
    id: 'impact',
    name: 'التأثير',
    nameEn: 'Impact',
    icon: 'Target',
    weight: 0.20,
    maxScore: 10,
    description: 'ما حجم الأثر المتوقع؟ كم شخصًا سيستفيد؟',
    humanAdvantage: false,
    color: '#3b82f6',
  },
  {
    id: 'clarity',
    name: 'الوضوح',
    nameEn: 'Clarity',
    icon: 'Eye',
    weight: 0.15,
    maxScore: 10,
    description: 'هل الفكرة واضحة ومفهومة؟ هل الشرح منظّم؟',
    humanAdvantage: false,
    color: '#8b5cf6',
  },
  {
    id: 'localContext',
    name: 'السياق المحلي',
    nameEn: 'Local Context',
    icon: 'MapPin',
    weight: 0.20,
    maxScore: 10,
    description: 'هل الحل ملائم للبيئة الثقافية والاجتماعية المحلية؟',
    humanAdvantage: true,   // الإنسان يتفوق هنا بشكل واضح
    color: '#ef4444',
  },
]

// ─── التحقق من الأوزان (يجب أن يكون المجموع = 1) ───
export const CRITERIA_TOTAL_WEIGHT = CRITERIA.reduce(
  (sum, c) => sum + c.weight,
  0
)

// ─── دوال مساعدة ───
export const getCriterionById = (id) =>
  CRITERIA.find((c) => c.id === id)

export const getHumanAdvantageCriteria = () =>
  CRITERIA.filter((c) => c.humanAdvantage)

export const getAIShortcomingCriteria = () =>
  CRITERIA.filter((c) => !c.humanAdvantage)

// ─── مستويات التقييم ───
export const SCORE_LEVELS = {
  excellent: { min: 9,  label: 'ممتاز',       color: '#10b981' },
  good:      { min: 7,  label: 'جيد جدًا',    color: '#3b82f6' },
  average:   { min: 5,  label: 'متوسط',       color: '#f59e0b' },
  weak:      { min: 3,  label: 'ضعيف',        color: '#ef4444' },
  poor:      { min: 0,  label: 'ضعيف جدًا',   color: '#7f1d1d' },
}

export const getScoreLevel = (score) => {
  if (score >= 9) return SCORE_LEVELS.excellent
  if (score >= 7) return SCORE_LEVELS.good
  if (score >= 5) return SCORE_LEVELS.average
  if (score >= 3) return SCORE_LEVELS.weak
  return SCORE_LEVELS.poor
}