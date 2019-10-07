import { log } from "util"

var notification = ''

const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    default:
      return state
  }
}

export const setNotification = (content) => {
  return {type: 'SET_NOTIFICATION', content: content}
}

export default (notificationReducer)