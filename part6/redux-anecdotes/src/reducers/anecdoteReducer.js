import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data
      // Replace the original anecdote with the updated one
      return state.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
    case 'CREATE':
      // Add the created anecdote to store with spread syntax
      return [...state, action.data]
    case 'INITIALIZE_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (anecdoteContent) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdoteContent)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer