const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      // Voted anecdote's id
      const id = action.data
      const anecdote = state.find(a => a.id === id)
      // Increment the votes of the anecdote
      const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: id
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: asObject(anecdote)
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INITIALIZE_ANECDOTES',
    data: anecdotes
  }
}

export default anecdoteReducer