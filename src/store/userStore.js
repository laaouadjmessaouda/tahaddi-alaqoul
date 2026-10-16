// ═══════════════════════════════════════════
// PFM Platform - متجر المستخدم (Zustand)
// ═══════════════════════════════════════════

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../utils/constants'

export const useUserStore = create(
  persist(
    (set, get) => ({
      // ─── الحالة ───
      preferences: {
        theme: 'dark',
        sound: true,
        animations: true,
        language: 'ar',
      },
      stats: {
        totalChallenges: 0,
        humanWins: 0,
        aiWins: 0,
        ties: 0,
        totalTimeSpent: 0,
      },

      // ─── الإجراءات ───

      /**
       * تحديث تفضيل
       */
      updatePreference: (key, value) => {
        set((state) => ({
          preferences: { ...state.preferences, [key]: value },
        }))
      },

      /**
       * تحديث الإحصائيات بعد تحدٍّ
       */
      updateStats: (winner, timeSpent = 0) => {
        set((state) => {
          const stats = { ...state.stats }
          stats.totalChallenges += 1
          stats.totalTimeSpent += timeSpent

          if (winner === 'human') stats.humanWins += 1
          else if (winner === 'ai') stats.aiWins += 1
          else if (winner === 'tie') stats.ties += 1

          return { stats }
        })
      },

      /**
       * إعادة ضبط الإحصائيات
       */
      resetStats: () => {
        set({
          stats: {
            totalChallenges: 0,
            humanWins: 0,
            aiWins: 0,
            ties: 0,
            totalTimeSpent: 0,
          },
        })
      },

      /**
       * حساب نسبة الفوز البشري
       */
      getHumanWinRate: () => {
        const { totalChallenges, humanWins } = get().stats
        if (totalChallenges === 0) return 0
        return Math.round((humanWins / totalChallenges) * 100)
      },
    }),
    {
      name: STORAGE_KEYS.USER_PREFERENCES,
    }
  )
)