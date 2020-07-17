import React, { useState } from 'react'

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
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setShowInfo(!showInfo)}>{showInfo === true ? 'Hide' : 'View'}</button>
      </div>
      {showInfo === true ?
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            Likes {blog.likes}
            <button onClick={() => likeBlog(blog)}>Like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {user.username === blog.user.username ?
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

export default Blog
