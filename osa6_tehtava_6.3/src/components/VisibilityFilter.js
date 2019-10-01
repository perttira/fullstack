import React from 'react'
import { connect } from 'react-redux'
import { visibilityFilterChange } from '../reducers/visibilityFilterReducer'
import { log } from 'util'

const VisibilityFilter = (props) => {

  const filterClicked = (value) => {
    console.log('VisibilityFilter.js props.visibilityFilterChange', props.visibilityFilterChange)
    props.visibilityFilterChange(value)
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

const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.visibilityFilter,
  }
}

const mapDispatchToProps = {
  visibilityFilterChange
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityFilter)

