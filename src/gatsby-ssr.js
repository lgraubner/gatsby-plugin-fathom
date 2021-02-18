const React = require('react')

module.exports.onPreRenderHTML = (
  { getHeadComponents, replaceHeadComponents },
  { trackingUrl = 'cdn.usefathom.com', siteId, honorDnt }
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
      />
    ) : null,
  ])
}
