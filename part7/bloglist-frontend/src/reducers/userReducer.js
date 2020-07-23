const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = (users) => {
  return {
    type: 'INITIALIZE_USERS',
    data: users
  }
}

export default userReducer