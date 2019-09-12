import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Styles from'../style.js'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // luodaan komponentin ulkopuolella käytettävä viite toggleVisiBility -metodille
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  const classes = Styles.useStyles()

  return (
    <Styles.Container component="main" maxWidth="xl" align="center">
      <Styles.CssBaseline/>
      <div className={classes.paper}>
        <div style={hideWhenVisible}>
          <Styles.Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={toggleVisibility}>
            {props.buttonLabel}
          </Styles.Button>
        </div>
        <div style={showWhenVisible} className="togglableContent">
          {props.children}
          <Styles.Button
            type="button"
            size="small"
            variant="contained"
            color="secondary"
            value="cancel"
            onClick={toggleVisibility}>
            Hide form
          </Styles.Button>
        </div>
      </div>
    </Styles.Container>

  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'


export default Togglable