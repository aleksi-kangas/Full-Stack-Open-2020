import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import userService from './services/users'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  // Resolve id in users route
  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  // Resolve id in blogs route
  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  useEffect(() => {
    // Retrieve blogs from the backend
    blogService
      .getAll()
      .then(blogs => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    // Retrieve users from the backend
    userService
      .getAll()
      .then(users => dispatch(initializeUsers(users)))
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

  // Application requires login
  if (loggedUser === null) {
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
      <Menu />
      <h2>Blogs</h2>
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blog}/>
        </Route>
        <Route path="/users/:id">
          <User user={user}/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/">
          <div>
            <BlogForm />
            <Blogs/>
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App