import { log } from "util"

const visibilityFilterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      console.log('action.visibilityFilter', action.visibilityFilter)
      state = action.visibilityFilter
      console.log('state', state)
      return state

    default:
      return state
  }
}

export const visibilityFilterChange = visibilityFilter => {
  return {
    type: 'SET_FILTER',
    visibilityFilter
  }
}

export default (visibilityFilterReducer)