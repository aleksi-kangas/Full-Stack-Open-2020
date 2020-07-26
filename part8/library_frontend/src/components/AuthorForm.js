import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [ selectedAuthor, setSelectedAuthor ] = useState(authors[0])
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const updateAuthor = async (event) => {
    event.preventDefault()
    await editAuthor({
      variables: {
        name: selectedAuthor,
        setBornTo: Number(event.target.born.value)
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