import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { setError, removeNotification, setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const loggedUser = useSelector(state => state.loggedUser)

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
      dispatch(updateBlog(updatedBlog))
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

  const handleComment = async (event) => {
    event.preventDefault()
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(event.target.comment.value)
    }
    try {
      await blogService.comment(blog.id, updatedBlog)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification(`Comment added`))
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
        history.push('/')
        dispatch(setNotification(`Deleted blog '${blog.title}'`))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 3000)
      } catch (error) {
        dispatch(setError(error.response.data.error))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)
      }
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle} className="blog" >
      <h2>{blog.title} by {blog.author}</h2>
      <p>Url: <a href={blog.url}>{blog.url}</a></p>
      <p>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></p>
      <p>Added by: {blog.user.name}</p>
      {loggedUser.id === blog.user.id
        ? <button onClick={() => handleDelete(blog)}>Remove</button>
        : null
      }
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <input name="comment" type="text"/>
          <button type="submit">Add Comment</button>
        </form>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment}>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog
