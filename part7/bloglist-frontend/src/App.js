import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { removeUser, setUser } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.user)

  // Reference for BlogForm object to control visibility
  const blogFormRef = React.createRef()
  useEffect(() => {
    const fetchBlogs = async () => {
      return await blogService.getAll()
    }
    fetchBlogs()
      .then(blogs => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    // Get logged in user from local storage
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(removeUser())
  }

  // User to render BlogFrom inside a Togglable component
  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  // Application requires login
  if (currentUser === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <LoginForm />
      </div>

    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{currentUser.name} logged in <button onClick={handleLogout}>Logout</button></p>
      {blogForm()}
      <Blogs />
    </div>
  )
}

export default App