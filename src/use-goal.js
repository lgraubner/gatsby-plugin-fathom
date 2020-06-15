export default function useGoal(code, cents = 0, debug = false) {
  return () => {
    if (window.fathom === undefined) {
      return
    }

    window.fathom.trackGoal(code, cents)

    if (debug) console.log(`Goal triggered: ${code},${cents}`)
  }
}
