import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../reducers/loginReducer'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { removeNotification, setError } from '../reducers/notificationReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(removeUser())
    history.push('/login')
  }

  const padding = {
    padding: 5
  }

  const notifyAboutLogin = () => {
    if (loggedUser) {
      return null
    } else {
      dispatch(setError('Application requires login'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }

  // Using course material as a base
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle/>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="#" as="span" className="m-2">
            <Link style={padding} to="/" onClick={notifyAboutLogin}>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span" className="m-2">
            <Link style={padding} to="/users" onClick={notifyAboutLogin}>
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span" className="m-2">
            {loggedUser
              ? <>{loggedUser.name} logged in</>
              : <Link  to="/login">Login</Link>
            }
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {loggedUser
              ? <Button className="m-1" onClick={handleLogout}>Logout</Button>
              : null
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu