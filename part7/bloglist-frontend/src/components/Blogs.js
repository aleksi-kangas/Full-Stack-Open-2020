import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
      {sortedBlogs.map(blog =>
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </li>
      )}
    </div>
  )
}

export default Blogs