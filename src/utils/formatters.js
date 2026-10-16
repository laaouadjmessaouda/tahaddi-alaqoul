// ═══════════════════════════════════════════
// PFM Platform - دوال التنسيق
// ═══════════════════════════════════════════

/**
 * تحويل الثواني إلى صيغة MM:SS
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * تنسيق التاريخ بالعربية
 */
export const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * قص النص الطويل
 */
export const truncate = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * تحويل النص إلى slug (للروابط)
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * حساب الوقت المنقضي كنص
 */
export const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds} ثانية`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} دقيقة`
  return `${Math.floor(seconds / 3600)} ساعة`
}

/**
 * تحويل النسبة المئوية
 */
export const formatPercentage = (value) =>
  `${Math.round(value * 100)}%`

/**
 * نسخ نص إلى الحافظة
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('فشل النسخ:', err)
    return false
  }
}

/**
 * توليد ID عشوائي
 */
export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`