import useGoal from '../use-goal'

describe('useGoal', () => {
  it('should abort silently if run server side', () => {
    let trackGoal = useGoal('test')

    expect(() => trackGoal()).not.toThrow()
  })

  it('should call fathom.trackGoal', () => {
    global.fathom = {
      trackGoal: jest.fn(),
    }

    let id = 'test'
    let trackGoal = useGoal(id)

    trackGoal()

    expect(global.fathom.trackGoal).toHaveBeenCalledWith(id, 0)
  })

  it('should be called the alternative way', () => {
    global.fathom = jest.fn()

    let id = 'test'
    let trackGoal = useGoal(id)

    trackGoal()

    expect(global.fathom).toHaveBeenCalledWith('trackGoal', id, 0)
  })

  it('should be callable with cents value', () => {
    global.fathom = {
      trackGoal: jest.fn(),
    }

    let id = 'test'
    let val = 123
    let trackGoal = useGoal(id)

    trackGoal(val)

    expect(global.fathom.trackGoal).toHaveBeenCalledWith(id, val)
  })

  it('should log debug message', () => {
    global.fathom = {
      trackGoal: jest.fn(),
    }
    global.console = {
      log: jest.fn(),
    }

    let id = 'test'
    let val = 123
    let trackGoal = useGoal(id, true)

    trackGoal(val)

    expect(global.console.log).toHaveBeenCalledWith(
      `Goal triggered: ${id} (${val})`
    )
  })
})
