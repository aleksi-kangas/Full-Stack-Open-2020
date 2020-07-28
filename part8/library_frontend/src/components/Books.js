import React, { useState } from 'react'

const Books = ({ show, booksQuery }) => {
  const [filter, setFilter] = useState('all genres')

  if (!show) {
    return null
  }
  // Query not ready as shown in the material
  if (booksQuery.loading) {
    return <div>Loading...</div>
  }

  const books = booksQuery.data.allBooks

  const filterBooks = () => {
    if (filter === 'all genres') {
      return books
    } else {
      return books.filter(book => book.genres.includes(filter))
    }
  }

  const extractGenres = () => {
    let filters = []
    books.map((book) =>
      book.genres.forEach((genre) => {
        if (!filters.includes(genre)) {
          filters = filters.concat(genre)
        }
      })
    )
    filters.sort()
    return filters
  }

  return (
    <div>
      <h2>Books</h2>
      <p>In genre: {filter}</p>
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
          {filterBooks().map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {extractGenres().map(genre =>
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      )}
      <div>
        <button key='all genres' onClick={() => setFilter('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books