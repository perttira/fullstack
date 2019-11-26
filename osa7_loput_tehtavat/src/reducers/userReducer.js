import loginService from '../services/login'
import blogService from '../services/blogs'
import { log } from 'util'


const userReducer = (state = null, action) => {

  switch (action.type) {
  case 'SET_LOGIN':
    return action.data
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const acUserLogin = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    console.log('userReducer user.name', user.name)
    console.log('userReducer user', user)
    window.localStorage.setItem('name', user.name)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_LOGIN',
      data: user
    })
  }
}

export const acSetUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export default (userReducer)