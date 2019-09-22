import { log } from "util"

var notification = ''

const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log('notificationReducer SET_NOTIFICATION')
      console.log('notificationReducer action.content', action.content)
      notification = action.content
      state = notification
      console.log('notificationReducer state', state);
      return state
      setTimeout(() => {
        state = ''
      }, 5000)
    default:
      return state
  }
}

export const setNotification = (content) => {
  console.log('setNotification() content', content)
  return {type: 'SET_NOTIFICATION', content: content}
}

export default (notificationReducer)