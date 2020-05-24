import { isWhitelistedHostname } from './utils'

exports.onRouteUpdate = ({ location }, { whitelistHostnames }) => {
  if (
    process.env.NODE_ENV !== 'production' ||
    typeof fathom === 'undefined' ||
    !isWhitelistedHostname(whitelistHostnames, location.hostname)
  ) {
    return
  }

  if (typeof fathom === 'object') {
    fathom.trackPageview()
  } else {
    fathom('trackPageview')
  }
}
