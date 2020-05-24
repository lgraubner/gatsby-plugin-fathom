import React from 'react'

import { createTrackingSnippet } from './utils'

function getTrackingCode(pluginOptions) {
  const {
    embedVersion = 'v1',
    trackingUrl = 'cdn.usefathom.com',
    siteId,
  } = pluginOptions

  if (embedVersion === 'v2') {
    return (
      <script
        key="gatsby-plugin-fathom"
        src={`https://${trackingUrl}/script.js`}
        site={siteId}
        defer
      />
    )
  }

  const html = createTrackingSnippet(pluginOptions)
  return (
    <script
      key="gatsby-plugin-fathom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

exports.onRenderBody = ({ setPostBodyComponents, pathname }, pluginOptions) => {
  if (process.env.NODE_ENV === 'production') {
    return setPostBodyComponents([getTrackingCode(pluginOptions)])
  }

  return null
}
