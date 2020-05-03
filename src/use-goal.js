import { useCallback } from 'react'

export default function useGoal(id, debug = false) {
  return useCallback(() => {
    if (window.fathom !== undefined) {
      window.fathom('trackGoal', id, 0)
    }

    if (debug) console.log(`Goal triggered: ${id}`)
  }, [id, debug])
}
