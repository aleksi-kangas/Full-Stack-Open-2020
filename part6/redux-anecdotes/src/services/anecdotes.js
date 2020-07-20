import axios from 'axios'

// Using the material as a base

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (anecdoteContent) => {
  const anecdoteObject = {
    content: anecdoteContent,
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

export default { getAll, createAnecdote }