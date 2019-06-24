import { createTrackingSnippet } from '../src/utils'

test('generating the tracking url', () => {
  const html = createTrackingSnippet({
    trackingUrl: 'alexlafroscia.com',
    siteId: 'foo-bar'
  })

  expect(html).toContain('//alexlafroscia.com/tracker.js')
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
