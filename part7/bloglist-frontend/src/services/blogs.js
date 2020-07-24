import axios from 'axios'
const baseUrl = '/api/blogs'

// From the course material
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  // Set token to authorization header
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newBlog) => {
  // Set token to authorization header
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

const comment = async (id, newBlog) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newBlog)
  return response.data
}

const remove = async (id) => {
  // Set token to authorization header
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, comment, remove, setToken }