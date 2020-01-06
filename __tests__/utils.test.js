import { createTrackingSnippet, isExcludedHostname } from '../src/utils'

describe('createTrackingSnippet', () => {
  test('setting the tracking URL', () => {
    const html = createTrackingSnippet({
      trackingUrl: 'alexlafroscia.com'
    })

    expect(html).toContain('//alexlafroscia.com/tracker.js')
  })

  describe('when the tracking URL is not provided', () => {
    test('defaulting to the CDN URL', () => {
      const html = createTrackingSnippet({
        siteId: 'foo-bar'
      })

      expect(html).toContain('//cdn.usefathom.com/tracker.js')
    })

    test('ensuring that a tracking ID is provided', () => {
      expect(function() {
        createTrackingSnippet({})
      }).toThrow()
    })
  })

  describe('setting the site ID', () => {
    test('when the ID is not provided', () => {
      const html = createTrackingSnippet({
        trackingUrl: 'alexlafroscia.com'
      })

      expect(html).not.toContain("fathom('set', 'siteId'")
    })

    test('when the ID is provided', () => {
      const html = createTrackingSnippet({
        trackingUrl: 'alexlafroscia.com',
        siteId: 'foo-bar'
      })

      expect(html).toContain("fathom('set', 'siteId', 'foo-bar')")
    })
  })
})

describe('isExcludedHostname', () => {
  test('ensuring excluded hostnames is an array', () => {
    expect(function() {
      isExcludedHostname({})
    }).toThrow()
  })

  test('when hostname is excluded', () => {
    const isExcluded = isExcludedHostname(['localhost'], 'localhost')
    expect(isExcluded).toBe(true)
  })

  test('when hostname is not excluded', () => {
    const isExcluded = isExcludedHostname(['localhost'], 'localghost')
    expect(isExcluded).toBe(false)
  })
})
