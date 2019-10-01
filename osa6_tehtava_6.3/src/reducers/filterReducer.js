const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
        console.log('filterReducer.js SET_FILTER')
      return action.filter
    default:
      return state
  }
}

export const filterChange = filter => {
  console.log('filterReducer.js filterChange()')

  return {
    type: 'SET_FILTER',
    filter
  }
}

export default (filterReducer)