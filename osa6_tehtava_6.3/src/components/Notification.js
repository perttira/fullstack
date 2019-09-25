import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

 return (
  <div style={style}>
    {props.props.getState().notify}
  </div>
)
}

export default Notification