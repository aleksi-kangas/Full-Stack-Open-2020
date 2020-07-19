import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from "react-redux";
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    // Empty the input field as shown in the material
    event.target.anecdote.value = ''
    // Dispatch the new anecdote to the reducer
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`Anecdote '${anecdote}' created`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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



