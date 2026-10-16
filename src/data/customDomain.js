// ═══════════════════════════════════════════
// PFM Platform - المجال المخصص
// ═══════════════════════════════════════════

/**
 * بناء مجال مخصص من نص المستخدم
 */
export const buildCustomDomain = (name) => {
  if (!name || !name.trim()) return null

  return {
    id: 'custom',
    name: name.trim(),
    nameEn: 'Custom',
    icon: 'Sparkles',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    description: `مجال مخصص: ${name.trim()}`,
    examples: [],
    isCustom: true,
  }
}

/**
 * التحقق من صحة المجال المخصص
 */
export const validateCustomDomain = (name) => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'اكتب اسم المجال.' }
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'اسم المجال قصير جدًا.' }
  }
  if (name.trim().length > 50) {
    return { isValid: false, error: 'اسم المجال طويل جدًا (50 حرف كحد أقصى).' }
  }
  return { isValid: true, error: null }
}

/**
 * توليد prompt مخصص للمجال المخصص
 */
export const buildCustomDomainPrompt = (domainName, problem) => {
  return `أنت مشارك في مسابقة إبداعية.

المجال: ${domainName}

📌 **المشكلة:** ${problem.title}
📝 **الوصف:** ${problem.description}

المطلوب: اقترح حلًا إبداعيًا وعمليًا لهذه المشكلة في مجال "${domainName}".

أعد الإجابة بتنسيق JSON فقط بهذا الشكل:
{
  "title": "اسم المشروع",
  "description": "وصف الحل",
  "targetAudience": "الفئة المستهدفة",
  "features": ["ميزة 1", "ميزة 2", "ميزة 3"],
  "implementation": "كيفية التنفيذ"
}`
}