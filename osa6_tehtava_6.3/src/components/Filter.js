import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { log } from 'util'

const Filter = (store) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    event.preventDefault()
    console.log(' Filter.js event.target.value', event.target.value)
    console.log(' store.store.getValue().filter', store.store.getState().filter)
    console.log('filterChange', filterChange)

    store.store.dispatch(filterChange(event.target.value))

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter anecdotes : <input value={store.store.getState().filter} onChange={handleChange} />
    </div>
  )
}

export default Filter