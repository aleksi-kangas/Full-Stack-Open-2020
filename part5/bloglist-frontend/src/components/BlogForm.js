import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
                    Title:
          <input
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            value={title}
          />
        </div>
        <div>
                    Author:
          <input
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            type="text"
            value={author}
          />
        </div>
        <div>
                    Url:
          <input
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            type="text"
            value={url}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm