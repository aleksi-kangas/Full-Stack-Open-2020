import axios from 'axios'
const baseUrl = '/api/login'

// From the course material
const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }