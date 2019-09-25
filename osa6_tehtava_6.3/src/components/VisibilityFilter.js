import React from 'react'
import { visibilityFilterChange } from '../reducers/visibilityFilterReducer'

const VisibilityFilter = (props) => {

  const filterClicked = (value) => {

    /*
    props.store.dispatch( {
      type: 'SET_FILTER',
      action: 'IMPORTANT'
    } )
    */
    props.store.dispatch(visibilityFilterChange(value))
  }

  return (
    <div>
      all    
      <input 
        type="radio" 
        name="filter" 
        onChange={() => filterClicked('ALL')}
      />
      important   
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('IMPORTANT')}
      />
      nonimportant 
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('NONIMPORTANT')}
      />
    </div>
  )
}

export default VisibilityFilter