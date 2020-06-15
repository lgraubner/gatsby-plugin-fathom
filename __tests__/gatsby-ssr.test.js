import { onRenderBody } from '../src/gatsby-ssr'

describe('gatsby-ssr', () => {
  const callRenderBody = options => {
    const setPostBodyComponents = jest.fn()
    onRenderBody({ setPostBodyComponents }, options)

    return setPostBodyComponents.mock.calls[0][0]
  }

  describe('disableOnDev', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...OLD_ENV }
      delete process.env.NODE_ENV
    })

    afterEach(() => {
      process.env = OLD_ENV
    })

    describe('NODE_ENV is development', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'development'
      })

      it('should render tag if disableOnDev is not defined', () => {
        const scriptComponent = callRenderBody({
          site: 'foo-bar'
        })

        expect(Array.isArray(scriptComponent)).toBe(true)
        expect(scriptComponent[0]).toBeDefined()
      })

      it('should render tag if disableOnDev is false', () => {
        const scriptComponent = callRenderBody({
          site: 'foo-bar',
          disableOnDev: false
        })

        expect(Array.isArray(scriptComponent)).toBe(true)
        expect(scriptComponent[0]).toBeDefined()
      })

      it('should not render tag if disableOnDev is true', () => {
        const setPostBodyComponents = jest.fn()
        onRenderBody(
          { setPostBodyComponents },
          {
            site: 'foo-bar',
            disableOnDev: true
          }
        )

        expect(setPostBodyComponents).not.toHaveBeenCalled()
      })
    })

    describe('NODE_ENV is production', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production'
      })

      it('should render tag if disableOnDev is not defined', () => {
        const scriptComponent = callRenderBody({
          site: 'foo-bar'
        })

        expect(Array.isArray(scriptComponent)).toBe(true)
        expect(scriptComponent[0]).toBeDefined()
      })

      it('should render tag if disableOnDev is false', () => {
        const scriptComponent = callRenderBody({
          site: 'foo-bar',
          disableOnDev: false
        })

        expect(Array.isArray(scriptComponent)).toBe(true)
        expect(scriptComponent[0]).toBeDefined()
      })

      it('should render tag if disableOnDev is true', () => {
        const scriptComponent = callRenderBody({
          site: 'foo-bar',
          disableOnDev: true
        })

        expect(Array.isArray(scriptComponent)).toBe(true)
        expect(scriptComponent[0]).toBeDefined()
      })
    })
  })

  describe('site', () => {
    it('should render site prop', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar'
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props.site).toBe('foo-bar')
    })

    it('should throw error if site is not provided', () => {
      expect(() => {
        callRenderBody({})
      }).toThrow()
    })
  })

  describe('customDomain', () => {
    it('should load the script from the custom domain', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        customDomain: 'example.org'
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props.src).toContain('://example.org/')
    })

    test('should default to fanthom CDN', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar'
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props.src).toContain('cdn.usefathom.com')
    })
  })

  describe('includedDomains', () => {
    it('should add included domains comma separated', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        includedDomains: ['example.org', 'example.com']
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['included-domains']).toBe(
        'example.org,example.com'
      )
    })

    test('should not add included domains', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar'
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['included-domains']).not.toBeDefined()
    })
  })

  describe('excludedDomains', () => {
    it('should add excluded domains comma separated', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        excludedDomains: ['example.org', 'example.com']
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['excluded-domains']).toBe(
        'example.org,example.com'
      )
    })

    test('should not add excluded domains', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar'
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['excluded-domains']).not.toBeDefined()
    })
  })

  describe('honorDNT', () => {
    it('should not set honor-dnt prop by default', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar'
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['honor-dnt']).not.toBeDefined()
    })

    it('should set honor-dnt prop as false', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        honorDNT: false
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['honor-dnt']).toBe('false')
    })

    test('should set honor-dnt prop as true', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        honorDNT: true
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['honor-dnt']).toBe('true')
    })
  })

  describe('canonical', () => {
    it('should not set canonical prop by default', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar'
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['canonical']).not.toBeDefined()
    })

    it('should set canonical prop as false', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        canonical: false
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['canonical']).toBe('false')
    })

    test('should set canonical prop as true', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        canonical: true
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['canonical']).toBe('true')
    })
  })

  describe('auto', () => {
    it('should not set auto prop by default', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar'
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['auto']).not.toBeDefined()
    })

    it('should set auto prop as false', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        auto: false
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['auto']).toBe('false')
    })

    test('should set auto prop as true', () => {
      const scriptComponent = callRenderBody({
        site: 'foo-bar',
        auto: true
      })

      expect(Array.isArray(scriptComponent)).toBe(true)
      expect(scriptComponent[0]).toBeDefined()
      expect(scriptComponent[0].props['auto']).toBe('true')
    })
  })
})
