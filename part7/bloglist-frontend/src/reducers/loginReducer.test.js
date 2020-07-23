import loginReducer from './loginReducer'
import deepFreeze from 'deep-freeze'

describe('loginReducer', () => {
  test('returns state correctly with action SET_USER', () => {
    const state = []
    const user = {
      username: 'username',
      name: 'User',
      id: '123456789',
      token: 'token'
    }
    const action = {
      type: 'SET_USER',
      data: user
    }

    deepFreeze(state)
    const newState = loginReducer(state, action)

    expect(newState).toEqual(user)
  })

  test('returns state correctly with action REMOVE_USER', () => {
    const state = [{
      username: 'username',
      name: 'User',
      id: '123456789',
      token: 'token'
    }]
    const action = {
      type: 'REMOVE_USER'
    }

    deepFreeze(state)
    const newState = loginReducer(state, action)

    expect(newState).toEqual(null)
  })
})