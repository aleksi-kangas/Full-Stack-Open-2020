import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = (props) => {
  // Destructure properties of the hook
  // Enables using destructuring of e.g. {...content} in <input />
  const { resetField: contentReset, ...content } = useField('text')
  const { resetField: authorReset, ...author } = useField('text')
  const { resetField: infoReset, ...info } = useField('text')

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
    props.setNotification(`A new anecdote '${content.value}' created`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
  }

  const resetFields = () => {
    // Reset the input fields by using the hook's reset function
    contentReset()
    authorReset()
    infoReset()
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
        <button type="reset" onClick={resetFields}>Reset</button>
      </form>
    </div>
  )
}

export default AnecdoteForm