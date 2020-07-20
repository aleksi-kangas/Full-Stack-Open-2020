import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from "react-redux";
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    // Empty the input field as shown in the material
    event.target.anecdote.value = ''
    // Create new anecdote only if it contains content
    if (anecdoteContent !== '') {
      dispatch(createAnecdote(anecdoteContent))
      dispatch(setNotification(`Anecdote '${anecdoteContent}' created`, 5))
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

export default AnecdoteForm



