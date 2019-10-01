import React from 'react'
import { connect } from 'react-redux'

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
 console.log('Notification.js props.notify', props.notify)  

 return (
  <div style={style}>
    {props.notify}
  </div>
)
}

const mapStateToProps = (state) => {
  return {
    notify: state.notify,
    filter: state.filter,
  }
}

export default connect(mapStateToProps)(Notification)