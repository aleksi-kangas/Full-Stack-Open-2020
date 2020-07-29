import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './graphql/queries'
import Notification from './components/Notification'
import { BOOK_ADDED } from './graphql/subscriptions'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const client = useApolloClient()

  const booksQuery = useQuery(ALL_BOOKS)
  const authorsQuery = useQuery(ALL_AUTHORS)
  const userQuery = useQuery(ME, { fetchPolicy: 'no-cache'})

  // From the material
  const updateCache = (addedBook) => {
    // Helper function from the material
    const collectionIncludes = (collection, obj) => collection.map(o => o.id).includes(obj.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!collectionIncludes(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  // Fetch logged in status from local storage as shown in the material
  useEffect(() => {
    const token = localStorage.getItem('loggedUser')
    if (token) {
      setToken(token)
    }
  }, [])

  // Subscribe to updates of added books
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCache(addedBook)
      window.alert(`${addedBook.title} has been added`)
    }
  })

  const setNotification = (msg) => {
    setMessage(msg)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token
          ? <>
              <button onClick={() => setPage('add')}>Add Book</button>
              <button onClick={() => setPage('recommendations')}>Recommendations</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          : <button onClick={() => setPage('login')}>Login</button>
        }
      </div>

      <Notification message={message}/>

      <Authors
        show={page === 'authors'}
        token={token}
        authorsQuery={authorsQuery}
        setNotification={setNotification}
      />

      <Books
        show={page === 'books'}
        booksQuery={booksQuery}
      />
      <Recommendations
        show={page === 'recommendations'}
        userQuery={userQuery}
      />
      <NewBook
        show={page === 'add'}
        setPage={setPage}
        setNotification={setNotification}
      />
      {token
        ? null
        :
        <Login
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
          setNotification={setNotification}
        />
      }
    </div>
  )
}

export default App