// ═══════════════════════════════════════════
// PFM Platform - منطق حساب النقاط
// ═══════════════════════════════════════════

import { CRITERIA } from '../data/criteria'
import { WINNER } from './constants'

/**
 * حساب النتيجة الإجمالية لحل واحد
 * @param {Object} scores - { originality: 8, feasibility: 7, ... }
 * @returns {Number} النتيجة من 10
 */
export const calculateTotalScore = (scores) => {
  if (!scores || typeof scores !== 'object') return 0

  const total = CRITERIA.reduce((sum, criterion) => {
    const score = Number(scores[criterion.id]) || 0
    return sum + score * criterion.weight
  }, 0)

  return Math.round(total * 10) / 10
}

/**
 * تحديد الفائز بين الإنسان والذكاء الاصطناعي
 * @param {Number} humanScore
 * @param {Number} aiScore
 * @returns {String} 'human' | 'ai' | 'tie'
 */
export const determineWinner = (humanScore, aiScore) => {
  const diff = humanScore - aiScore
  if (Math.abs(diff) < 0.1) return WINNER.TIE
  return diff > 0 ? WINNER.HUMAN : WINNER.AI
}

/**
 * حساب فارق النقاط
 */
export const getScoreDifference = (humanScore, aiScore) =>
  Math.round(Math.abs(humanScore - aiScore) * 10) / 10

/**
 * توليد ملخص تقييم نصي
 */
export const generateEvaluationSummary = (humanScores, aiScores) => {
  const humanTotal = calculateTotalScore(humanScores)
  const aiTotal = calculateTotalScore(aiScores)
  const winner = determineWinner(humanTotal, aiTotal)

  // تحديد نقاط القوة
  const humanStrengths = getStrengths(humanScores, aiScores)
  const aiStrengths = getStrengths(aiScores, humanScores)

  return {
    humanTotal,
    aiTotal,
    winner,
    difference: getScoreDifference(humanTotal, aiTotal),
    humanStrengths,
    aiStrengths,
    verdict: buildVerdict(winner, humanTotal, aiTotal, humanStrengths, aiStrengths),
  }
}

/**
 * تحديد المعايير التي تفوّق فيها الطرف
 */
const getStrengths = (myScores, otherScores) => {
  return CRITERIA.filter((c) => {
    const myScore = Number(myScores[c.id]) || 0
    const otherScore = Number(otherScores[c.id]) || 0
    return myScore > otherScore
  }).map((c) => c.name)
}

/**
 * بناء حكم نهائي نصي
 */
const buildVerdict = (winner, humanTotal, aiTotal, humanStrengths, aiStrengths) => {
  if (winner === WINNER.TIE) {
    return `تعادل مثير! كلاهما حصل على ${humanTotal}/10. تجربة رائعة تعكس تكاملًا بين الإبداع البشري والمنطق الآلي.`
  }

  if (winner === WINNER.HUMAN) {
    const strengths = humanStrengths.length > 0
      ? `تفوّقت في: ${humanStrengths.join('، ')}.`
      : ''
    return `🎉 فوز الإنسان! نتيجتك ${humanTotal}/10 مقابل ${aiTotal}/10 للذكاء الاصطناعي. ${strengths}`
  }

  const strengths = aiStrengths.length > 0
    ? `تفوّق AI في: ${aiStrengths.join('، ')}.`
    : ''
  return `🤖 فوز الذكاء الاصطناعي. نتيجته ${aiTotal}/10 مقابل ${humanTotal}/10 لك. ${strengths} لا تستسلم — كل محاولة تعلّمك شيئًا.`
}

/**
 * تحويل النقاط إلى نسبة مئوية
 */
export const scoreToPercentage = (score) =>
  Math.round((score / 10) * 100)

/**
 * تحديد اللون حسب النتيجة
 */
export const getScoreColor = (score) => {
  if (score >= 9) return '#10b981'  // أخضر
  if (score >= 7) return '#3b82f6'  // أزرق
  if (score >= 5) return '#f59e0b'  // برتقالي
  if (score >= 3) return '#ef4444'  // أحمر
  return '#7f1d1d'                  // أحمر داكن
}

/**
 * مقارنة معيارية مفصّلة
 */
export const compareCriteria = (humanScores, aiScores) => {
  return CRITERIA.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    weight: c.weight,
    humanScore: Number(humanScores[c.id]) || 0,
    aiScore: Number(aiScores[c.id]) || 0,
    winner: determineWinner(
      Number(humanScores[c.id]) || 0,
      Number(aiScores[c.id]) || 0
    ),
    humanAdvantage: c.humanAdvantage,
  }))
}