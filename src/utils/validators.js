// ═══════════════════════════════════════════
// PFM Platform - التحقق من صحة المدخلات
// ═══════════════════════════════════════════

import { INPUT_LIMITS } from './constants'

/**
 * التحقق من صحة حل الإنسان
 */
export const validateSolution = (solution) => {
  const errors = []

  if (!solution || !solution.trim()) {
    errors.push('الحل فارغ. اكتب فكرتك أولًا.')
    return { isValid: false, errors }
  }

  if (solution.trim().length < INPUT_LIMITS.SOLUTION_MIN) {
    errors.push(
      `الحل قصير جدًا. اكتب ${INPUT_LIMITS.SOLUTION_MIN} حرفًا على الأقل.`
    )
  }

  if (solution.length > INPUT_LIMITS.SOLUTION_MAX) {
    errors.push(
      `الحل طويل جدًا. الحد الأقصى ${INPUT_LIMITS.SOLUTION_MAX} حرف.`
    )
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * التحقق من صحة الفئة المستهدفة
 */
export const validateTargetAudience = (audience) => {
  if (!audience || !audience.trim()) {
    return { isValid: false, errors: ['حدّد الفئة المستهدفة.'] }
  }
  return { isValid: true, errors: [] }
}

/**
 * التحقق من صحة الميزات
 */
export const validateFeatures = (features) => {
  if (!features || features.length === 0) {
    return { isValid: false, errors: ['أضف ميزة واحدة على الأقل.'] }
  }
  return { isValid: true, errors: [] }
}

/**
 * التحقق من كامل النموذج
 */
export const validateChallengeForm = (formData) => {
  const errors = {}
  let isValid = true

  // العنوان
  if (!formData.title?.trim()) {
    errors.title = 'اسم المشروع مطلوب.'
    isValid = false
  } else if (formData.title.length > INPUT_LIMITS.TITLE_MAX) {
    errors.title = `الاسم طويل جدًا (حد ${INPUT_LIMITS.TITLE_MAX} حرف).`
    isValid = false
  }

  // الحل
  const solutionCheck = validateSolution(formData.solution)
  if (!solutionCheck.isValid) {
    errors.solution = solutionCheck.errors[0]
    isValid = false
  }

  // الفئة المستهدفة
  const audienceCheck = validateTargetAudience(formData.targetAudience)
  if (!audienceCheck.isValid) {
    errors.targetAudience = audienceCheck.errors[0]
    isValid = false
  }

  return { isValid, errors }
}

/**
 * التحقق من رابط
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * التحقق من بريد إلكتروني
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}