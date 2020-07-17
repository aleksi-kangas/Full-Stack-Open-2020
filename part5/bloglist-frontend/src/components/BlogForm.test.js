import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('createBlog-handler receives correct details when a new blog is submitted', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Blog-title' }
    })
    fireEvent.change(author, {
      target: { value: 'Blog-author' }
    })
    fireEvent.change(url, {
      target: { value: 'Blog-url' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls.length).toBe(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Blog-title')
    expect(createBlog.mock.calls[0][0].author).toBe('Blog-author')
    expect(createBlog.mock.calls[0][0].url).toBe('Blog-url')
  })
})