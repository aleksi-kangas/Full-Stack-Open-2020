import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
    props.setNotification(`A new anecdote '${content}' created`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content} />
        </div>
        <div>
          Author
          <input {...author} />
        </div>
        <div>
          Url for more information
          <input {...info} />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={resetFields}>Reset</button>
      </form>
    </div>
  )
}

export default AnecdoteForm