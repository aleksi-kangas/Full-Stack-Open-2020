import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../graphql/queries'
import { EDIT_AUTHOR } from '../graphql/mutations'

const AuthorForm = ({ authors, setNotification }) => {
  const [ selectedAuthor, setSelectedAuthor ] = useState(authors[0].name)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setNotification(error.message)
      setTimeout(() => setNotification(null), 5000)
    }
  })

  const updateAuthor = async (event) => {
    event.preventDefault()
    const born = Number(event.target.born.value)
    event.target.born.value = ''
    await editAuthor({
      variables: {
        name: selectedAuthor,
        setBornTo: born
      }
    })
  }
  return(
    <div>
      <h3>Set Birth Year</h3>
      <form onSubmit={updateAuthor}>
        <div>
          <select
            value={selectedAuthor}
            onChange={(event) => setSelectedAuthor(event.target.value)}>
              {authors.map(author =>
                  <option key={author.id} value={author.name}>{author.name}</option>
              )}
          </select>
        </div>
        <div>
          Born:
          <input
            name="born"
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}

export default AuthorForm