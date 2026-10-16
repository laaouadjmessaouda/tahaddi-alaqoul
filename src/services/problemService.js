// ═══════════════════════════════════════════
// PFM Platform - خدمة إدارة المشاكل
// ═══════════════════════════════════════════

import problemsData from '../data/problems.json'
import { getDomainById } from '../data/domains'

const ALL_PROBLEMS = problemsData.problems

/**
 * جلب كل المشاكل
 */
export const getAllProblems = () => ALL_PROBLEMS

/**
 * جلب مشاكل مجال معين
 */
export const getProblemsByDomain = (domainId) => {
  return ALL_PROBLEMS.filter((p) => p.domain === domainId)
}

/**
 * جلب مشكلة واحدة بالمعرّف
 */
export const getProblemById = (id) => {
  return ALL_PROBLEMS.find((p) => p.id === id)
}

/**
 * اختيار مشكلة عشوائية من مجال
 */
export const getRandomProblem = (domainId = null) => {
  const pool = domainId
    ? getProblemsByDomain(domainId)
    : ALL_PROBLEMS

  if (pool.length === 0) return null
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * جلب مشكلة مع تفاصيل المجال
 */
export const getProblemWithDomain = (problemId) => {
  const problem = getProblemById(problemId)
  if (!problem) return null

  return {
    ...problem,
    domainInfo: getDomainById(problem.domain),
  }
}

/**
 * جلب مشاكل حسب مستوى الصعوبة
 */
export const getProblemsByDifficulty = (difficulty) => {
  return ALL_PROBLEMS.filter((p) => p.difficulty === difficulty)
}

/**
 * إحصائيات
 */
export const getProblemsStats = () => {
  const stats = {
    total: ALL_PROBLEMS.length,
    byDomain: {},
    byDifficulty: { easy: 0, medium: 0, hard: 0 },
  }

  ALL_PROBLEMS.forEach((p) => {
    stats.byDomain[p.domain] = (stats.byDomain[p.domain] || 0) + 1
    stats.byDifficulty[p.difficulty] =
      (stats.byDifficulty[p.difficulty] || 0) + 1
  })

  return stats
}