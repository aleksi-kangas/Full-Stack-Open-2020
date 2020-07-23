import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs