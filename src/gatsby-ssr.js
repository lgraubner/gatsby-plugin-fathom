import React from 'react'

import { createTrackingSnippet } from './utils'

function getTrackingCode(pluginOptions) {
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
