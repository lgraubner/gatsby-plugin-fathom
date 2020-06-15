import { trackPageview, blockTracking, enableTracking } from '../src'

describe('track utils', () => {
  describe('fathom not loaded', () => {
    beforeEach(() => {
      delete window.fathom
    })

    it('should not throw any error', () => {
      expect(() => trackPageview()).not.toThrow()
      expect(() => blockTracking()).not.toThrow()
      expect(() => enableTracking()).not.toThrow()
    })
  })

  describe('fathom loaded', () => {
    beforeEach(() => {
      delete window.fathom
      window.fathom = {
        trackPageview: jest.fn(),
        blockTrackingForMe: jest.fn(),
        enableTrackingForMe: jest.fn()
      }
    })

    it('should call trackPageview', () => {
      trackPageview({
        url: '/test',
        referrer: 'http://example.org',
        debug: false
      })
      expect(window.fathom.trackPageview).toHaveBeenCalledWith({
        url: '/test',
        referrer: 'http://example.org'
      })
    })

    it('should call blockTrackingForMe', () => {
      blockTracking()
      expect(window.fathom.blockTrackingForMe).toHaveBeenCalledWith(true)
    })

    it('should call enableTrackingForMe', () => {
      enableTracking()
      expect(window.fathom.enableTrackingForMe).toHaveBeenCalledWith()
    })
  })
})
