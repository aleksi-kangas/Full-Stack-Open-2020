import React, { useEffect, useState } from 'react'

const Recommendations = ({ show, booksQuery, userQuery }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)

  useEffect(() => {
    if (userQuery.data && userQuery.data.me) {
      setFavoriteGenre(userQuery.data.me.favoriteGenre)
    }
  }, [userQuery.data])

  if (!show) {
    return null
  }

  if (booksQuery.loading || userQuery.loading) {
    return <div>Loading...</div>
  }

  const books = booksQuery.data.allBooks
  const filteredBooks = books.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre: {favoriteGenre}</p>
      <table>
        <tbody>
        <tr>
          <th>
            Title
          </th>
          <th>
            Author
          </th>
          <th>
            Published
          </th>
        </tr>
        {filteredBooks.map(b =>
          <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations