import React from 'react'
import { connect } from 'react-redux'
import { red } from '@material-ui/core/colors'

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

/*import React from 'react'

//import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}



export default Notification

*/