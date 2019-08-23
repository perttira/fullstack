import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div id="container-login-form">
      <h2>Kirjaudu</h2>
      <p>Käyttäjätunnus: mluukkai</p>
      <p>Salasana: salainen</p>
      <form id="login-form"onSubmit={handleSubmit}>
        <div>
          Käyttäjätunnus
          <input
            data-testid="newItemField"
            value={username}
            onChange={handleUsernameChange}
            className="login-input"
          />
        </div>
        <div>
          Salasana
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
          />
        </div>
        <button data-testid="click" type="submit" className='login'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm