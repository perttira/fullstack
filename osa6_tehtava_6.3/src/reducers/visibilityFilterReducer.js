const visibilityFilterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.visibilityFilter
    default:
      return state
  }
}

export const filterChange = visibilityFilter => {
  return {
    type: 'SET_FILTER',
    visibilityFilter,
  }
}

export default (visibilityFilterReducer)