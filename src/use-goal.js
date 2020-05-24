export default function useGoal(id, debug = false) {
  return () => {
    if (window.fathom === undefined) {
      return
    }

    if (typeof fathom === 'object') {
      window.fathom.trackGoal(id, 0)
    } else {
      window.fathom('trackGoal', id, 0)
    }

    if (debug) console.log(`Goal triggered: ${id}`)
  }
}
