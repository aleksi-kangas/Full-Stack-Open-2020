const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'SET_ERROR':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      message,
      isError: false
    }
  }
}

export const setError = (message) => {
  return {
    type: 'SET_ERROR',
    data: {
      message,
      isError: true
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer