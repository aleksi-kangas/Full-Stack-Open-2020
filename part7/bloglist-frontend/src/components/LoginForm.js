import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { removeNotification, setNotification, setError } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom'


const LoginForm = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const history = useHistory()

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

  if (loggedUser) {
    history.push('/')
    return (
    <Redirect to="/" />
    )
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin} className="login-form">
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
          />
          </Form.Group>
          <Button type="submit" variant="primary" id="login-button" >Login</Button>
      </Form>
    </div>
  )
}

export default LoginForm

