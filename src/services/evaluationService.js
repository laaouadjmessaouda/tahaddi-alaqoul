// ═══════════════════════════════════════════
// PFM Platform - خدمة التقييم
// ═══════════════════════════════════════════

import { CRITERIA } from '../data/criteria'
import { calculateTotalScore, determineWinner } from '../utils/scoring'

/**
 * تقييم حل بشري (محاكاة تقييم AI)
 * في الواقع، يمكن استدعاء AI هنا، لكن نبدأ بمحاكاة
 */
export const evaluateHumanSolution = async (solution, problem) => {
  await new Promise((r) => setTimeout(r, 1200))

  const scores = {}
  CRITERIA.forEach((c) => {
    // تقييم مبني على معايير بسيطة
    let baseScore = 6 + Math.random() * 3

    // مكافأة على الطول الواضح
    if (solution.description?.length > 150) baseScore += 0.5

    // مكافأة على الميزات المتعددة
    if (solution.features?.length >= 4) baseScore += 0.5

    // مكافأة على الأصالة البشرية (السياق المحلي)
    if (c.id === 'localContext' && solution.description) {
      const hasLocalRefs = /محلي|ثقاف|عربي|بلد|مجتمع/.test(
        solution.description
      )
      if (hasLocalRefs) baseScore += 1
    }

    scores[c.id] = Math.min(10, Math.round(baseScore * 10) / 10)
  })

  return {
    scores,
    total: calculateTotalScore(scores),
    evaluator: 'AI Evaluator',
    evaluatedAt: new Date().toISOString(),
  }
}

/**
 * تقييم حل AI (محاكاة)
 */
export const evaluateAISolution = async (solution, problem) => {
  await new Promise((r) => setTimeout(r, 1200))

  const scores = {}
  CRITERIA.forEach((c) => {
    let baseScore = 7 + Math.random() * 2.5

    // AI عادةً أقوى في الوضوح والتنفيذ
    if (c.id === 'clarity' || c.id === 'feasibility') {
      baseScore += 0.5
    }

    // AI أضعف في الأصالة والسياق المحلي
    if (c.id === 'originality' || c.id === 'localContext') {
      baseScore -= 1
    }

    scores[c.id] = Math.max(1, Math.min(10, Math.round(baseScore * 10) / 10))
  })

  return {
    scores,
    total: calculateTotalScore(scores),
    evaluator: 'AI Evaluator',
    evaluatedAt: new Date().toISOString(),
  }
}

/**
 * تقييم كامل (الإنسان + AI)
 */
export const evaluateBothSolutions = async (
  humanSolution,
  aiSolution,
  problem
) => {
  const [humanEval, aiEval] = await Promise.all([
    evaluateHumanSolution(humanSolution, problem),
    evaluateAISolution(aiSolution, problem),
  ])

  const winner = determineWinner(humanEval.total, aiEval.total)

  return {
    human: humanEval,
    ai: aiEval,
    winner,
    difference: Math.abs(humanEval.total - aiEval.total).toFixed(1),
  }
}

/**
 * تقييم يدوي (للمشرفين)
 */
export const manualEvaluation = (scores) => {
  if (!scores || Object.keys(scores).length === 0) {
    throw new Error('لا توجد نقاط للتقييم')
  }
  return {
    scores,
    total: calculateTotalScore(scores),
    evaluator: 'Human Reviewer',
    evaluatedAt: new Date().toISOString(),
  }
}

/**
 * تقييم بالتصويت الجماعي
 */
export const communityEvaluation = (votes) => {
  const scores = {}
  CRITERIA.forEach((c) => {
    const criterionVotes = votes[c.id] || []
    scores[c.id] =
      criterionVotes.length > 0
        ? criterionVotes.reduce((a, b) => a + b, 0) / criterionVotes.length
        : 0
  })

  return {
    scores,
    total: calculateTotalScore(scores),
    evaluator: 'Community Vote',
    evaluatedAt: new Date().toISOString(),
  }
}