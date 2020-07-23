import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns state correctly with action SET_NOTIFICATION', () => {
    const state = []
    const action = {
      type: 'SET_NOTIFICATION',
      data: {
        message: 'message',
        isError: false
      }
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual({
      message: 'message',
      isError: false
    })
  })

  test('returns state correctly with action SET_ERROR', () => {
    const state = []
    const action = {
      type: 'SET_ERROR',
      data: {
        message: 'message',
        isError: true
      }
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual({
      message: 'message',
      isError: true
    })
  })

  test('returns state correctly with action REMOVE_NOTIFICATION', () => {
    const state = []
    const action = {
      type: 'REMOVE_NOTIFICATION'
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toEqual(null)
  })
})