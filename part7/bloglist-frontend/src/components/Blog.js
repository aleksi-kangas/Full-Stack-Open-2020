import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setError, removeNotification, setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  // Style from the material
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (blog) => {
    const updatedBlog = {...blog, likes: blog.likes + 1 }
    try {
      await blogService.update(blog.id, updatedBlog)
      dispatch(likeBlog(updatedBlog))
      dispatch(setNotification(`Liked blog '${blog.title}'`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 2000)
    } catch (error) {
      dispatch(setError(error.response.data.error))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    const confirmation = window.confirm(`Remove blog ${blog.title}?`)
    if (confirmation) {
      try {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog))
        dispatch(setNotification(`Deleted blog '${blog.title}'`))
        setTimeout(() => {
          removeNotification()
        }, 3000)
      } catch (error) {
        setError(error.response.data.error)
        setTimeout(() => {
          removeNotification()
        }, 5000)
      }
    }
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
          <div>
            Likes {blog.likes}
            <button onClick={() => handleLike(blog)}>Like</button>
          </div>
          <div>
            Added by {blog.user.name}
          </div>
          {currentUser.id === blog.user.id ?
            <div>
              <button onClick={() => handleDelete(blog)}>Remove</button>
            </div>
            :
            null
          }
        </div>
        :
        null
      }
    </div>
  )
}

export default Blog
