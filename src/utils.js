const DEFAULT_TRACKING_URL = 'cdn.usefathom.com'

exports.createTrackingSnippet = function createTrackingSnippet({
  trackingUrl = DEFAULT_TRACKING_URL,
  siteId
}) {
  if (trackingUrl === DEFAULT_TRACKING_URL && !siteId) {
    throw new Error(
      '`siteId` must be provided when using the hosted version of Fathom'
    )
  }

  return `
    (function(f, a, t, h, o, m){
      a[h]=a[h]||function(){
        (a[h].q=a[h].q||[]).push(arguments)
      };
      o=f.createElement('script'),
      m=f.getElementsByTagName('script')[0];
      o.async=1; o.src=t; o.id='fathom-script';
      m.parentNode.insertBefore(o,m)
    })(document, window, '//${trackingUrl}/tracker.js', 'fathom');
    ${siteId && "fathom('set', 'siteId', '" + siteId + "');"}
  `
}

exports.isWhitelistedHostname = function isWhitelistedHostname(
  whitelist = [],
  hostname
) {
  if (!Array.isArray(whitelist)) {
    throw new Error('`whitelistHostnames` must be provided as an array')
  }

  if (whitelist.length === 0) {
    return true
  }

  return whitelist.indexOf(hostname) !== -1
}
