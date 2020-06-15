export const parsePluginOptions = ({
  site,
  customDomain = 'cdn.usefathom.com',
  disableOnDev = false,
  includedDomains,
  excludedDomains,
  honorDNT,
  canonical,
  auto
}) => {
  if (!site) {
    throw new Error(
      '`site` must be provided when using the hosted version of Fathom'
    )
  }

  const fathomProps = {
    site,
    spa: 'auto'
  }

  if (includedDomains) {
    if (!Array.isArray(includedDomains)) {
      throw new Error('`includedDomains` must be provided as an array')
    }
    if (includedDomains.length) {
      fathomProps['included-domains'] = includedDomains.join(',')
    }
  }

  if (excludedDomains) {
    if (!Array.isArray(excludedDomains)) {
      throw new Error('`excludedDomains` must be provided as an array')
    }
    if (excludedDomains.length) {
      fathomProps['excluded-domains'] = excludedDomains.join(',')
    }
  }

  if (honorDNT !== undefined) {
    fathomProps['honor-dnt'] = honorDNT ? 'true' : 'false'
  }

  if (canonical !== undefined) {
    fathomProps.canonical = canonical ? 'true' : 'false'
  }

  if (auto !== undefined) {
    fathomProps.auto = auto ? 'true' : 'false'
  }

  return {
    customDomain,
    disableOnDev,
    fathomProps
  }
}
