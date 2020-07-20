import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    // Empty the input field as shown in the material
    event.target.anecdote.value = ''
    // Create new anecdote only if it contains content
    if (anecdoteContent !== '') {
      props.createAnecdote(anecdoteContent)
      props.setNotification(`Anecdote '${anecdoteContent}' created`, 5)
    }
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote'/>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

const ConnectedAnecdoteForm = connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm



