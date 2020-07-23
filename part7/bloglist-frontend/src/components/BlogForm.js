import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { removeNotification, setError, setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    try {
      const savedBlog = await blogService.create(blog)
      dispatch(createBlog(savedBlog))
      setShowForm(false)
      dispatch(setNotification(`Created blog '${savedBlog.title}'`))
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

  if (showForm) {
    return (
      <div>
        <h2>Create a New Blog</h2>
        <form onSubmit={addBlog}>
          <div>
            Title:
            <input
              id="title"
              name="title"
              type="text"
            />
          </div>
          <div>
            Author:
            <input
              id="author"
              name="author"
              type="text"
            />
          </div>
          <div>
            Url:
            <input
              id="url"
              name="url"
              type="text"
            />
          </div>
          <button type="submit" id='submit-button'>Create</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      </div>
    )
  } else {
    return (
      <button onClick={() => setShowForm(true)}>Create</button>
    )
  }

}

export default BlogForm