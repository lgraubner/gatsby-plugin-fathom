import { onRouteUpdate } from '../src/gatsby-browser'

describe('onRouteUpdate', () => {
  const location = { hostname: 'localhost' }
  const pluginOptions = {
    whitelistHostnames: [],
  }

  const OLD_NODE_ENV = process.env.NODE_ENV
  const fathomMock = jest.fn()

  beforeEach(() => {
    jest.resetModules()
    process.env.NODE_ENV = 'production'
    global.fathom = fathomMock
  })

  afterEach(() => {
    process.env.NODE_ENV = OLD_NODE_ENV
  })

  test('v1 embed code: should track page view', () => {
    onRouteUpdate({ location }, pluginOptions)
    expect(fathomMock).toHaveBeenCalledWith('trackPageview')
  })

  test('v2 embed code: should track page view', () => {
    pluginOptions.embedVersion = 'v2'
    global.fathom = {
      trackPageview: jest.fn(),
    }

    onRouteUpdate({ location }, pluginOptions)
    expect(fathom.trackPageview).toHaveBeenCalled()
  })

  describe('when not running in a production environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development'
    })

    afterEach(() => {
      process.env.NODE_ENV = 'production'
    })

    test('should not track page view', () => {
      onRouteUpdate({ location }, pluginOptions)
      expect(fathomMock).not.toHaveBeenCalled()
    })
  })

  describe('when fathom library is undefined', () => {
    beforeEach(() => {
      global.fathom = undefined
    })

    afterEach(() => {
      global.fathom = fathomMock
    })

    test('should not track page view', () => {
      onRouteUpdate({ location }, pluginOptions)

      expect(fathomMock).not.toHaveBeenCalled()
    })
  })

  describe('when hostname is not whitelisted', () => {
    test('should not track page view', () => {
      onRouteUpdate(
        { location: { hostname: 'localghost' } },
        {
          whitelistHostnames: ['localhost'],
        }
      )

      expect(fathomMock).not.toHaveBeenCalled()
    })
  })
})
