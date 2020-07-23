import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
  blogs: blogReducer,
  loggedUser: loginReducer,
  notification: notificationReducer,
  users: userReducer
})

const store = createStore(reducer)

export default store