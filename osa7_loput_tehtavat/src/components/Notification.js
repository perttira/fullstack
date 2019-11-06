import React from 'react'
import { connect } from 'react-redux'
//import { red } from '@material-ui/core/colors'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: '10',
    borderWidth: '1',
    backgroundColor: 'red',
  }

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