const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'UPDATE_BLOG':
      return state.map(b => b.id === action.data.id ? action.data : b)
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INITIALIZE_BLOGS',
    data: blogs
  }
}

export const createBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog
  }
}

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog
  }
}

export const removeBlog = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    data: blog
  }
}

export default blogReducer