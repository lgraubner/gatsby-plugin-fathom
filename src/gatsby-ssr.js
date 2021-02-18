const React = require('react')

module.exports.onPreRenderHTML = (
  { getHeadComponents, replaceHeadComponents },
  {
    trackingUrl = 'cdn.usefathom.com',
    siteId,
    honorDnt,
    ignoreCanonical,
    includedDomains,
    excludedDomains,
  }
) => {
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction && !siteId) {
    throw new Error('`siteId` must be defined for gatsby-plugin-fathom')
  }

  replaceHeadComponents([
    ...getHeadComponents(),
    isProduction ? (
      <script
        key="gatsby-plugin-fathom"
        src={`https://${trackingUrl}/script.js`}
        site={siteId}
        spa="auto"
        defer
        data-honor-dnt={honorDnt ? 'true' : undefined}
        data-canonical={ignoreCanonical ? 'false' : undefined}
        data-included-domains={
          includedDomains ? includedDomains.join(',') : undefined
        }
        data-excluded-domains={
          excludedDomains ? excludedDomains.join(',') : undefined
        }
      />
    ) : null,
  ])
}
