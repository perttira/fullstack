import { log } from "util"

//import { log } from "util"

var notification = ''

const notificationReducer = (state = notification, action) => {

  console.log('notificationReducer action.data', action.data)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = (content, time) => {
  // return {type: 'SET_NOTIFICATION', content: content}
  return async dispatch => {
    await setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: ''
      })
    }, time)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })
  }
}

export default (notificationReducer)