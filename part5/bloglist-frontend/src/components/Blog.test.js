import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const likeBlog = jest.fn()
const deleteBlog = jest.fn()

describe('<Blog />', () => {
    let component
    const blog = {
        title: 'Blog Title',
        author: 'Blog Author',
        url: 'Blog Url',
        user: {
            username: 'Username',
            name: 'User Name',
            id: 'User Id'
        },
        likes: 1
    }

    beforeEach(() => {
        const user = {}

        component = render(
            <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user}>
                <div className="testDiv" />
            </Blog>
        )
    })

    describe('Visibility of a blog\'s properties', () => {
        test('by default only title and author are visible', () => {
            const div = component.container.querySelector('.blog')
            expect(div).toHaveTextContent(blog.title)
            expect(div).toHaveTextContent(blog.author)

            expect(div).not.toHaveTextContent(blog.url)
            expect(div).not.toHaveTextContent(blog.likes)


        })
        test('after clicking "View"-button, all blog\'s properties are displayed', () => {
            const button = component.getByText('View')
            fireEvent.click(button)

            const div = component.container.querySelector('.blog')
            expect(div).toHaveTextContent(blog.title)
            expect(div).toHaveTextContent(blog.author)
            expect(div).toHaveTextContent(blog.url)
            expect(div).toHaveTextContent(blog.likes)
        })
        test('after clicking the "View/Hide"-button twice, only title and author are visible', () => {
            const button = component.getByText('View')
            fireEvent.click(button)
            fireEvent.click(button)

            const div = component.container.querySelector('.blog')
            expect(div).toHaveTextContent(blog.title)
            expect(div).toHaveTextContent(blog.author)
            expect(div).not.toHaveTextContent(blog.url)
            expect(div).not.toHaveTextContent(blog.likes)
        })
    })
    describe('Like functionality', () => {
        test('Like button clicked twice, event handler responsible for likes is called twice', () => {
            const viewButton = component.getByText('View')
            fireEvent.click(viewButton)

            const likeButton = component.getByText('Like')
            fireEvent.click(likeButton)
            fireEvent.click(likeButton)

            expect(likeBlog.mock.calls).toHaveLength(2)
        })
    })
})