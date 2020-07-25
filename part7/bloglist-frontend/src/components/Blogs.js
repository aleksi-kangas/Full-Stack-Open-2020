import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blogs = () => {
  // Retrieve the blogs from Redux store
  const blogs = useSelector(state => state.blogs)

  // Helper function to sort blogs by likes
  const sortBlogs = (blogs) => {
    return (
      blogs.sort((a, b) => a.likes < b.likes)
    )
  }

  const sortedBlogs = sortBlogs(blogs)

  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <ListGroup>
        {sortedBlogs.map(blog =>
          <ListGroup.Item key={blog.id} variant="light">
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default Blogs