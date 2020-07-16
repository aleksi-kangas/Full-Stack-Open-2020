import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    // Get logged in user from local storage
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // Login
      const user = await loginService.login({
        username, password
      })
      // Set user to local storage
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      // Update state
      setUser(user)
      setUsername('')
      setPassword('')
      // Notification
      setMessage('Successfully logged in')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    blogService
        .create(blog)
        .then(savedBlog => {
          setBlogs(blogs.concat(savedBlog))
          setMessage(`A new blog "${blogTitle}" by ${blogAuthor} created.`)
          setBlogTitle('')
          setBlogAuthor('')
          setBlogUrl('')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
  }

  // Application requires login
  if (user === null) {
    return (
        <div>
          <h2>Log in to application</h2>
          <Notification message={message} errorMessage={errorMessage} />
          <form onSubmit={handleLogin}>
            <div>
              Username:
              <input
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                  type="text"
                  value={username}
              />
            </div>
            <div>
              Password:
              <input
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                  type="password"
                  value={password}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      <h2>Create a new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
              name="Title"
              onChange={({ target }) => setBlogTitle(target.value)}
              type="text"
              value={blogTitle}
          />
        </div>
        <div>
          Author:
          <input
              name="Author"
              onChange={({ target }) => setBlogAuthor(target.value)}
              type="text"
              value={blogAuthor}
          />
        </div>
        <div>
          Url:
          <input
              name="Url"
              onChange={({ target }) => setBlogUrl(target.value)}
              type="text"
              value={blogUrl}
          />
        </div>
        <button type="submit">Create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App