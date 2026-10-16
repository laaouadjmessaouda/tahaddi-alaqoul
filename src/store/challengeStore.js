// ═══════════════════════════════════════════
// PFM Platform - متجر التحدي (Zustand)
// ═══════════════════════════════════════════

import { create } from 'zustand'
import { CHALLENGE_STATUS, CHALLENGE_DURATION } from '../utils/constants'
import { generateAISolution } from '../services/aiService'
import { evaluateBothSolutions } from '../services/evaluationService'
import { generateEvaluationSummary } from '../utils/scoring'
import { getRandomProblem } from '../services/problemService'

export const useChallengeStore = create((set, get) => ({
  // ─── الحالة ───
  status: CHALLENGE_STATUS.IDLE,
  selectedDomain: null,
  customDomain: null,
  customDomainName: null,
  problem: null,
  humanSolution: null,
  aiSolution: null,
  evaluation: null,
  timeLeft: CHALLENGE_DURATION,
  error: null,
  history: [],

  // ─── الإجراءات ───

  /**
   * اختيار مجال
   */
  selectDomain: (domainId) => {
    set({
      selectedDomain: domainId,
      status: CHALLENGE_STATUS.SELECTING,
      error: null,
    })
  },

  /**
   * بدء التحدي
   * @param {string} domainId - معرّف المجال
   * @param {object} domainData - بيانات المجال (للمخصص)
   * @param {string} customName - اسم المجال المخصص
   */
  startChallenge: async (domainId, domainData = null, customName = null) => {
    set({
      status: CHALLENGE_STATUS.LOADING,
      selectedDomain: domainId,
      customDomain: domainData,
      customDomainName: customName,
      error: null,
    })

    try {
      // 1. جلب مشكلة
      let problem

      if (domainId === 'custom' && customName) {
        // مشكلة مخصصة للمجال المكتوب
        problem = {
          id: `custom-${Date.now()}`,
          domain: 'custom',
          title: `تحدٍّ في مجال: ${customName}`,
          description: `اقترح حلًا إبداعيًا لمشكلة حقيقية في مجال "${customName}". فكّر في تحدٍّ يواجه المبتدئين أو المحترفين في هذا المجال، ثم اقترح حلًا عمليًا له.`,
          context: `مجال ${customName} — ابحث عن مشكلة ملحّة تستحق حلًا مبتكرًا.`,
          constraints: [
            'يجب أن يكون الحل عمليًا',
            'بميزانية محدودة',
            'قابل للتنفيذ خلال 3 أشهر',
          ],
          targetAudience: `المهتمون بمجال ${customName}`,
          difficulty: 'medium',
          timeLimit: 60,
          tags: ['مخصص', customName],
        }
      } else {
        problem = getRandomProblem(domainId)
      }

      if (!problem) throw new Error('لا توجد مشاكل في هذا المجال')

      set({ problem })

      // 2. توليد حل AI في الخلفية
      generateAISolution(problem, customName)
        .then((aiSolution) => {
          console.log('✅ حل AI جاهز:', aiSolution)
          set({ aiSolution })
        })
        .catch((err) => {
          console.error('❌ فشل توليد AI:', err)
        })

      // 3. الانتقال لحالة الكتابة فورًا
      set({
        status: CHALLENGE_STATUS.WRITING,
        timeLeft: problem.timeLimit || CHALLENGE_DURATION,
      })
    } catch (error) {
      set({
        status: CHALLENGE_STATUS.ERROR,
        error: error.message,
      })
    }
  },

  /**
   * حفظ حل الإنسان
   */
  setHumanSolution: (solution) => {
    set({ humanSolution: solution })
  },

  /**
   * إنقاص الوقت
   */
  tick: () => {
    const { timeLeft, status } = get()
    if (status !== CHALLENGE_STATUS.WRITING) return

    if (timeLeft <= 1) {
      set({ timeLeft: 0 })
      get().submitSolution()
    } else {
      set({ timeLeft: timeLeft - 1 })
    }
  },

  /**
   * إعادة ضبط الوقت
   */
  resetTimer: (seconds) => {
    set({ timeLeft: seconds || CHALLENGE_DURATION })
  },

  /**
   * إرسال الحل + بدء التقييم
   */
  submitSolution: async () => {
    const { humanSolution, problem, customDomainName } = get()

    if (!humanSolution || !problem) {
      set({
        status: CHALLENGE_STATUS.ERROR,
        error: 'لا يمكن الإرسال — الحل أو المشكلة ناقصة.',
      })
      return
    }

    set({ status: CHALLENGE_STATUS.EVALUATING, error: null })

    try {
      // 1. الحصول على حل AI
      let aiSolution = get().aiSolution

      if (!aiSolution) {
        console.log('🤖 توليد حل AI أثناء الإرسال...')
        aiSolution = await generateAISolution(problem, customDomainName)
        set({ aiSolution })
      }

      // 2. تقييم الطرفين
      const evalResult = await evaluateBothSolutions(
        humanSolution,
        aiSolution,
        problem
      )

      // 3. توليد ملخص
      const summary = generateEvaluationSummary(
        evalResult.human.scores,
        evalResult.ai.scores
      )

      const fullEvaluation = { ...evalResult, summary }

      // 4. تحديث الحالة
      set({
        evaluation: fullEvaluation,
        status: CHALLENGE_STATUS.COMPLETED,
      })

      // 5. إضافة للسجل
      get().addToHistory({
        problem,
        humanSolution,
        aiSolution,
        evaluation: fullEvaluation,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('❌ خطأ في التقييم:', error)
      set({
        status: CHALLENGE_STATUS.ERROR,
        error: error.message || 'حدث خطأ أثناء التقييم.',
      })
    }
  },

  /**
   * إضافة للسجل
   */
  addToHistory: (entry) => {
    const { history } = get()
    set({ history: [entry, ...history].slice(0, 20) })
  },

  /**
   * إعادة ضبط التحدي
   */
  resetChallenge: () => {
    set({
      status: CHALLENGE_STATUS.IDLE,
      selectedDomain: null,
      customDomain: null,
      customDomainName: null,
      problem: null,
      humanSolution: null,
      aiSolution: null,
      evaluation: null,
      timeLeft: CHALLENGE_DURATION,
      error: null,
    })
  },

  /**
   * مسح الخطأ
   */
  clearError: () => set({ error: null }),
}))