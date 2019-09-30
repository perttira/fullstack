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
 console.log('props.store', props.props.getState().notify)  

 return (
  <div style={style}>
    {props.props.getState().notify}
  </div>
)
}

export default Notification