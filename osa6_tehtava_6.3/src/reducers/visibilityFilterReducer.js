const visibilityFilterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      console.log('visibilityFilterReducer.js SET_FILTER')
      
      return action.visibilityFilter
    default:
      return state
  }
}

export const visibilityFilterChange = visibilityFilter => {
  console.log('visibilityFilterReducer.js filterChange()')

  return {
    type: 'SET_VISIBILITY_FILTER',
    visibilityFilter
  }
}

export default (visibilityFilterReducer)