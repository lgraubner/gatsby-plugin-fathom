import { useGoal } from '../src'

describe('useGoal hook', () => {
  describe('fathom not loaded', () => {
    beforeEach(() => {
      delete window.fathom
    })

    it('should not throw any error', () => {
      expect(() => useGoal()).not.toThrow()
    })
  })

  describe('fathom loaded', () => {
    beforeEach(() => {
      delete window.fathom
      window.fathom = {
        trackGoal: jest.fn()
      }
    })

    it('should call trackGoal with default cents', () => {
      const trackGoal = useGoal('code')
      trackGoal()

      expect(window.fathom.trackGoal).toHaveBeenCalledWith('code', 0)
    })

    it('should call trackGoal with specified cents', () => {
      const trackGoal = useGoal('code', 100)
      trackGoal()

      expect(window.fathom.trackGoal).toHaveBeenCalledWith('code', 100)
    })
  })
})
