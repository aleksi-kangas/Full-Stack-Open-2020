import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ show, setToken, setPage }) => {
  const [ login, result ] = useMutation(LOGIN, {
    onCompleted: () => setPage('authors')
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('loggedUser', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    await login({
      variables: {
        username: event.target.username.value,
        password: event.target.password.value
      }
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input name="username" type="text"/>
        </div>
        <div>
          Password:
          <input name="password" type="password"/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login