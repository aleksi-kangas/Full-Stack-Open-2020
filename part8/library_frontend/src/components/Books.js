import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/queries'

const Books = ({ show, booksQuery }) => {
  const [genre, setGenre] = useState('all genres')
  const [filteredBooks, setFilteredBooks] = useState([])
  const [booksGenreQuery, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (booksQuery.data && genre === 'all genres') {
      setFilteredBooks(booksQuery.data.allBooks)
    }
  }, [booksQuery, genre])

  if (!show) {
    return null
  }
  // Query not ready as shown in the material
  if (booksQuery.loading) {
    return <div>Loading...</div>
  }

  const allBooks = booksQuery.data.allBooks

  const extractGenres = () => {
    let filters = []
    allBooks.map((book) =>
      book.genres.forEach((genre) => {
        if (!filters.includes(genre)) {
          filters = filters.concat(genre)
        }
      })
    )
    filters.sort()
    return filters
  }

  const handleGenreChange = async (genre) => {
    setGenre(genre)
    await booksGenreQuery({
      variables: { genre: genre }
    })
  }

  return (
    <div>
      <h2>Books</h2>
      <p>In genre: {genre}</p>
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
      {extractGenres().map(genre =>
        <button key={genre} onClick={() => handleGenreChange(genre)}>{genre}</button>
      )}
      <div>
        <button key='all genres' onClick={() => setGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books