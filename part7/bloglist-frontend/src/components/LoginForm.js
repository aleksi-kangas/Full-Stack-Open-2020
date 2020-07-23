import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { removeNotification, setNotification, setError } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'


const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // Login
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
      })
      // Set user to local storage
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      // Update Redux state
      dispatch(setUser(user))
      // Notification
      dispatch(setNotification('Successfully logged in'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    } catch (error) {
      dispatch(setError('Wrong username or password'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div>
        Username:
        <input
          id="username"
          name="username"
          type="text"
        />
      </div>
      <div>
        Password:
        <input
          id="password"
          name="password"
          type="password"
        />
      </div>
      <button type="submit" id="login-button" >Login</button>
    </form>
  )
}

export default LoginForm

