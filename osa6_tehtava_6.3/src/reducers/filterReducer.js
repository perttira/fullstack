import { log } from "util"

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      console.log('filterReducer action.filter', action.filter)
      state = action.filter
      return state
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export default (filterReducer)