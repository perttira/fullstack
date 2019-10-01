import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import { log } from 'util'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value

    console.log('Filter.js props.filter', props.filter)
    console.log('Filter.js event.target.value', event.target.value)
    console.log('Filter.js props.filterChange', props.filterChange)


    //props.filterChange(event.target.value)
    props.filterChange(event.target.value)
  } 
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={props.filter} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filterChange
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)