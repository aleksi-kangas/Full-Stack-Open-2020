import React from 'react'
import AuthorForm from './AuthorForm'

const Authors = ({ show, token, authorsQuery, setNotification }) => {
  if (!show) {
    return null
  }

  // Query not ready as shown in the material
  if (authorsQuery.loading) {
    return <div>Loading...</div>
  }

  const authors = authorsQuery.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              Name
            </th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token
        ? <AuthorForm authors={authors} setNotification={setNotification} />
        : null
      }
    </div>
  )
}

export default Authors
