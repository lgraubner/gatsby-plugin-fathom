export default function useGoal(id, debug = false) {
  return (val = 0) => {
    if (typeof window === 'undefined' || typeof window.fathom === 'undefined') {
      return
    }

    if (typeof fathom === 'object') {
      window.fathom.trackGoal(id, val)
    } else {
      window.fathom('trackGoal', id, val)
    }

    if (debug) {
      console.log(`Goal triggered: ${id} (${val})`)
    }
  }
}
