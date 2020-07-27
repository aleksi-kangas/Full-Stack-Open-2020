import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  // Fetch logged in status from local storage as shown in the material
  useEffect(() => {
    const token = localStorage.getItem('loggedUser')
    if (token) {
      setToken(token)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token
          ? <>
              <button onClick={() => setPage('add')}>Add Book</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          : <button onClick={() => setPage('login')}>Login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />
      {token
        ? null
        :
        <Login
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />
      }
    </div>
  )
}

export default App