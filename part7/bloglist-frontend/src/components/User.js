import React from 'react'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Created Blogs</h4>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroup.Item key={blog.id}>{blog.title} by {blog.author}</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default User