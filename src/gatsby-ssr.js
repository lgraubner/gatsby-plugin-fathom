import React from 'react'

import { parsePluginOptions } from './utils'

const createScriptTag = options => {
  const { customDomain, disableOnDev, fathomProps } = parsePluginOptions(
    options
  )

  if (process.env.NODE_ENV === 'development' && disableOnDev) {
    return null
  }

  return (
    <script
      key="gatsby-plugin-fathom"
      src={`https://${customDomain}/script.js`}
      {...fathomProps}
      defer
    />
  )
}

export const onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
  const scriptTag = createScriptTag(pluginOptions)
  if (scriptTag) {
    setPostBodyComponents([scriptTag])
  }
}
