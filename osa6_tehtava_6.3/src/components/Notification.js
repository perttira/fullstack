import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  /*
  return (
    <div style={style}>
      render here notification...
    </div>
  )
  */

 return (
  <div style={style}>
    {props.store.getState().notify}
  </div>
)
}

export default Notification