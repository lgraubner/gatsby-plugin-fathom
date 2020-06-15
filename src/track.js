export const trackPageview = ({
  url = undefined,
  referrer = undefined,
  debug = false
} = {}) => {
  if (window.fathom === undefined) {
    return
  }

  const trackArgs = { url, referrer }

  window.fathom.trackPageview(trackArgs)

  if (debug) console.debug(`Pageview triggered: ${JSON.stringify(trackArgs)}`)
}

export const blockTracking = () => {
  if (window.fathom === undefined) {
    return
  }

  window.fathom.blockTrackingForMe(true)
}

export const enableTracking = () => {
  if (window.fathom === undefined) {
    return
  }

  window.fathom.enableTrackingForMe()
}
