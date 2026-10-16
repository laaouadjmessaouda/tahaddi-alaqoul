// ═══════════════════════════════════════════
// PFM Platform - Hook توليد AI
// ═══════════════════════════════════════════

import { useState, useCallback } from 'react'
import { generateAISolution } from '../services/aiService'

export const useAIGeneration = () => {
  const [solution, setSolution] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = useCallback(async (problem) => {
    setLoading(true)
    setError(null)
    try {
      const result = await generateAISolution(problem)
      setSolution(result)
      return result
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setSolution(null)
    setError(null)
    setLoading(false)
  }, [])

  return { solution, loading, error, generate, reset }
}