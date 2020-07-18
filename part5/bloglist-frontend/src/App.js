import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Reference for BlogForm object to control visibility
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => sortBlogs(blogs))
      .then(sortedBlogs => setBlogs(sortedBlogs))
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

  const sortBlogs = (blogs) => {
    return (
      blogs.sort((a, b) => a.likes < b.likes)
    )
  }

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blog) => {
    // Toggle BlogForm visibility as shown in the material
    blogFormRef.current.toggleVisibility()
    try {
      const savedBlog = await blogService.create(blog)
      savedBlog.user = {
        id: user.id,
        username: user.username,
        name: user.name
      }
      setBlogs(blogs.concat(savedBlog))
      setMessage(`A new blog "${blog.title}" by ${blog.author} created.`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user
    }
    try {
      const savedBlog = await blogService.update(blog.id, updatedBlog)
      updatedBlog.id = savedBlog.id
      const updatedBlogs = blogs.map(b => b.id !== blog.id ? b : updatedBlog)
      const sortedBlogs = sortBlogs(updatedBlogs)
      setBlogs(sortedBlogs)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // User to render BlogFrom inside a Togglable component
  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const deleteBlog = async (blog) => {
    const confirmation = window.confirm(`Remove blog ${blog.title}?`)
    if (confirmation) {
      try {
        await blogService.remove(blog.id)
        const updatedBlogs = blogs.filter(b => b.id !== blog.id)
        const sortedBlogs = sortBlogs(updatedBlogs)
        setBlogs(sortedBlogs)
      } catch (error) {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  // Application requires login
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} errorMessage={errorMessage} />
        <form onSubmit={handleLogin} className="loginForm">
          <div>
              Username:
            <input
              id="username"
              onChange={({ target }) => setUsername(target.value)}
              type="text"
              value={username}
            />
          </div>
          <div>
              Password:
            <input
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              value={password}
            />
          </div>
          <button type="submit" id="login-button" >Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      {blogForm()}
      <div className="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
        )}
      </div>
    </div>
  )
}

export default App