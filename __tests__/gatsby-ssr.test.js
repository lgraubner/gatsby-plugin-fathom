import React from 'react'
import plugin from '../src/gatsby-ssr'

describe('onPreRenderHTML', () => {
  let replaceHeadComponents

  const headComponents = [
    <title>title</title>,
    <meta name="description" content="" />,
    <link src="some.css" />,
    <script src="some.js" />,
  ]
  const getHeadComponents = () => headComponents

  beforeEach(() => {
    replaceHeadComponents = jest.fn()
  })

  describe('development environment', () => {
    it('should not apply script tag', () => {
      plugin.onPreRenderHTML(
        { getHeadComponents, replaceHeadComponents },
        { siteId: 'ABCDEF' }
      )

      expect(replaceHeadComponents).toHaveBeenCalledWith([
        ...headComponents,
        null,
      ])
    })

    it('should allow empty site id', () => {
      expect(() =>
        plugin.onPreRenderHTML({ getHeadComponents, replaceHeadComponents }, {})
      ).not.toThrow()
    })
  })

  describe('production environment', () => {
    const NODE_ENV = process.env.NODE_ENV

    beforeEach(() => {
      process.env.NODE_ENV = 'production'
    })

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV
    })

    it('should apply script tag', () => {
      plugin.onPreRenderHTML(
        { getHeadComponents, replaceHeadComponents },
        { siteId: 'ABCDEF' }
      )

      expect(replaceHeadComponents).toHaveBeenCalledWith([
        ...headComponents,
        <script
          key="gatsby-plugin-fathom"
          src={'https://cdn.usefathom.com/script.js'}
          site={'ABCDEF'}
          spa="auto"
          defer
        />,
      ])
    })

    it('should apply custom tracking url', () => {
      plugin.onPreRenderHTML(
        { getHeadComponents, replaceHeadComponents },
        { siteId: 'ABCDEF', trackingUrl: 'fathom.gatsby.org' }
      )

      expect(replaceHeadComponents).toHaveBeenCalledWith([
        ...headComponents,
        <script
          key="gatsby-plugin-fathom"
          src={'https://fathom.gatsby.org/script.js'}
          site={'ABCDEF'}
          spa="auto"
          defer
        />,
      ])
    })

    it('should fail gracefully if no site id provided', () => {
      expect(() =>
        plugin.onPreRenderHTML({ getHeadComponents, replaceHeadComponents }, {})
      ).toThrow(new Error('`siteId` must be defined for gatsby-plugin-fathom'))
    })
  })
})
