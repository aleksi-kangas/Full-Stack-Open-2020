import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../reducers/loginReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(removeUser())
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Link style={padding} to='/blogs/'>Blogs</Link>
      <Link style={padding} to='/users/'>Users</Link>
      {loggedUser.name} logged in
      <button style={padding} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Menu