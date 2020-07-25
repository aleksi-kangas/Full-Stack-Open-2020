import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { removeNotification, setError, setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'


const BlogForm = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      comments: []
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
        <Form onSubmit={addBlog}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              id="title"
              name="title"
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author:</Form.Label>
            <Form.Control
              id="author"
              name="author"
              type="text"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Url:</Form.Label>
            <Form.Control
              id="url"
              name="url"
              type="text"
            />
          </Form.Group>
          <Button className='m-1' type="submit" id='submit-button'>Create</Button>
          <Button className='m-1' type="button" onClick={() => setShowForm(false)}>Cancel</Button>
        </Form>
      </div>
    )
  } else {
    return (
      <div className='m-2'>
        <Button onClick={() => setShowForm(true)}>Create</Button>
      </div>
    )
  }

}

export default BlogForm