import { isExcludedHostname } from './utils'

exports.onRouteUpdate = ({ location }, { excludeHostnames }) => {
  if (
    process.env.NODE_ENV === 'production' &&
    typeof fathom !== 'undefined' &&
    !isExcludedHostname(excludeHostnames, location.hostname)
  ) {
    fathom('trackPageview')
  }
}
