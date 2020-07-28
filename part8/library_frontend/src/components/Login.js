import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ME } from '../graphql/queries'
import { LOGIN } from '../graphql/mutations'

const Login = ({ show, setToken, setPage, setNotification }) => {
  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [{ query: ME }],
    onCompleted: () => setPage('authors'),
    onError: (error) => {
      setNotification(error.message)
      setTimeout(() => setNotification(null), 5000)
    }
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