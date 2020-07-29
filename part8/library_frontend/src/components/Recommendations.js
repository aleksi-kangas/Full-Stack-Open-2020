import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/queries'

const Recommendations = ({ show, userQuery }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])
  const [booksGenreQuery, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (userQuery.data && userQuery.data.me) {
      setFavoriteGenre(userQuery.data.me.favoriteGenre)
      booksGenreQuery({ variables: { genre: userQuery.data.me.favoriteGenre }})
    }
  }, [userQuery.data, booksGenreQuery])

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  if (userQuery.loading || booksGenreQuery.loading) {
    return <div>Loading...</div>
  }

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