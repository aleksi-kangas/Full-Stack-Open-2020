import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns initialized state correctly', () => {
    const state = []
    const init_blogs = [
      {
        title: 'Title1',
        author: 'Author1',
        url: 'Url1'
      },
      {
        title: 'Title2',
        author: 'Author2',
        url: 'Url2'
      }
    ]
    const action = {
      type: 'INITIALIZE_BLOGS',
      data: init_blogs
    }

    deepFreeze(state)
    const initializedState = blogReducer(state, action)

    expect(initializedState.length).toBe(2)
  })

  describe('blog functionality', () => {
    const initialState = [
      {
        id: 1,
        title: 'Title1',
        author: 'Author1',
        url: 'Url1',
        likes: 0
      },
      {
        id: 2,
        title: 'Title2',
        author: 'Author2',
        url: 'Url2',
        likes: 0
      }
    ]
    test('returns state correctly with action NEW_BLOG', () => {
      const state = initialState
      const newBlog = {
        id: 3,
        title: 'Title3',
        author: 'Author3',
        url: 'Url3',
        likes: 0
      }
      const action = {
        type: 'NEW_BLOG',
        data: newBlog
      }

      deepFreeze(state)
      const newState = blogReducer(state, action)

      expect(newState.length).toBe(3)
      expect(newState).toContainEqual(newBlog)
    })

    test('returns state correctly with action LIKE_BLOG', () => {
      const state = initialState
      const blogToLike = initialState[0]
      const action = {
        type: 'LIKE_BLOG',
        data: {
          ...blogToLike,
          likes: 1
        }
      }

      deepFreeze(state)
      const newState =  blogReducer(state, action)

      expect(newState.length).toBe(2)
      expect(newState).toContainEqual({
        id: 1,
        title: 'Title1',
        author: 'Author1',
        url: 'Url1',
        likes: 1
        }
      )
    })

    test('returns state correctly with action REMOVE_BLOG', () => {
      const state = initialState
      const blogToRemove = initialState[1]
      const action = {
        type: 'REMOVE_BLOG',
        data: blogToRemove
      }

      deepFreeze(state)
      const newState = blogReducer(state, action)

      expect(newState).not.toContainEqual(blogToRemove)
      expect(newState.length).toBe(1)
    })
  })
})