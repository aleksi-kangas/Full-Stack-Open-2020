import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const [users, setUsers] = useState([])
-
  useEffect(() => {
    userService
      .getAll()
      .then(u => setUsers(u))
  })

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td><strong>Blogs Created</strong></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>+
                
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users