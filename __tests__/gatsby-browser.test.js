import { onRouteUpdate } from '../src/gatsby-browser'

describe('onRouteUpdate', () => {
  const location = { hostname: 'localhost' }
  const pluginOptions = {
    excludeHostnames: []
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

  test('should track page view', () => {
    onRouteUpdate({ location }, pluginOptions)
    expect(fathomMock).toHaveBeenCalledWith('trackPageview')
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

  describe('when hostname is excluded', () => {
    test('should not track page view', () => {
      onRouteUpdate(
        { location },
        {
          excludeHostnames: ['localhost']
        }
      )

      expect(fathomMock).not.toHaveBeenCalled()
    })
  })
})
