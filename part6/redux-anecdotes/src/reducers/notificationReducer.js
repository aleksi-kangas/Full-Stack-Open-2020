let timeoutID = undefined

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (notification, timeInSeconds) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
      timeoutID = undefined
    }, timeInSeconds * 1000)
  }
}

export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer