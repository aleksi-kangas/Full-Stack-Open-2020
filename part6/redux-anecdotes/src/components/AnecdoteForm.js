import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from "react-redux";
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    // Empty the input field as shown in the material
    event.target.anecdote.value = ''
    // Create new anecdote only if it contains content
    if (anecdote !== '') {
      const newAnecdote = await anecdoteService.createAnecdote(anecdote)
      // Dispatch the new anecdote to the reducer
      dispatch(createAnecdote(newAnecdote))
      dispatch(setNotification(`Anecdote '${newAnecdote}' created`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
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



