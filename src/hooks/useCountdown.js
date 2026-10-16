// ═══════════════════════════════════════════
// PFM Platform - Hook العدّ التنازلي
// ═══════════════════════════════════════════

import { useEffect, useRef, useCallback } from 'react'
import { useChallengeStore } from '../store/challengeStore'
import { CHALLENGE_STATUS } from '../utils/constants'

export const useCountdown = () => {
  const intervalRef = useRef(null)
  const status = useChallengeStore((s) => s.status)
  const tick = useChallengeStore((s) => s.tick)

  const start = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      tick()
    }, 1000)
  }, [tick])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (status === CHALLENGE_STATUS.WRITING) {
      start()
    } else {
      stop()
    }

    return () => stop()
  }, [status, start, stop])

  return { start, stop }
}