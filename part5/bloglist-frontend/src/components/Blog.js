import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showInfo, setShowInfo] = useState(false)

  // Style from the material
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog" >
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setShowInfo(!showInfo)}>{showInfo === true ? 'Hide' : 'View'}</button>
      </div>
      {showInfo === true ?
        <div>
          <div>
            {blog.url}
          </div>
          <div className="blogLikes">
            Likes {blog.likes}
            <button onClick={() => likeBlog(blog)}>Like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {user.id === blog.user.id ?
            <div>
              <button onClick={() => deleteBlog(blog)}>Remove</button>
            </div>
            :
            null
          }
        </div>
        :
        null
      }
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
