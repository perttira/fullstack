import React from 'react'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={props.store.getState().filter} onChange={handleChange} />
    </div>
  )
}

export default Filter