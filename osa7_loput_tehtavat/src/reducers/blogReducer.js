//var notification = ''
import blogService from '../services/blogs'

let initialState = ''
/*
const blogStateObject = {
  allBlogs: getAllBlogs(),
  todos: []
}
*/

const blogReducer = (state = [], action) => {
  //console.log('blogReducer action.data', action.data)
  console.log('blogReducer action.type', action.type)
  console.log('blogReducer action.data', action.data)

  switch (action.type) {
  case 'GET_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return [...state,action.data]
  case 'LIKE_BLOG':
    return state
  default:
    return state
  }
}

export const acAddBlog = (content) => {
  // return {type: 'SET_NOTIFICATION', content: content}
  return async dispatch => {
    await setTimeout(() => {
      dispatch({
        type: 'ADD_BLOG',
        data: content
      })
    })
  }
}

/*
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}
*/

export const acGetBlogs = () => {
  // return {type: 'SET_NOTIFICATION', content: content}
  return async dispatch => {
    let sortedBlogs = await blogService.getAll()

    sortedBlogs = sortedBlogs.sort(function (a, b) { return b.likes - a.likes })
    //console.log('sortedBlogs', sortedBlogs)


    dispatch({
      type: 'GET_BLOGS',
      data: sortedBlogs
    })
  }
}



export default (blogReducer)