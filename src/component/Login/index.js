import {useState} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [userId, setUserId] = useState('')
  const [pin, setPin] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [error, setError] = useState(false)

  const userLoginSuccess = jwtToken => {
    setError(false)

    Cookies.set('jwt_token', jwtToken, {expires: 20})
    const {history} = props
    history.replace('/')
  }

  const userLoginFailure = errorMsg => {
    setErrorMessage(errorMsg)
    setError(true)
  }

  const onSubmitTheForm = async event => {
    event.preventDefault()
    const userDetails = {
      user_id: userId,
      pin,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const apiURL = 'https://apis.ccbp.in/ebank/login'

    const response = await fetch(apiURL, options)
    const data = await response.json()

    if (response.ok) {
      userLoginSuccess(data.jwt_token)
    } else {
      userLoginFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  console.log(jwtToken)
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-bg-container">
      <div className="content-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
          className="login-image"
        />
        <div className="user-login-container">
          <form onSubmit={onSubmitTheForm}>
            <h1 className="login-heading">Welcome Back!</h1>
            <label className="label" htmlFor="username">
              User ID
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter User ID"
              className="username-input"
              onChange={event => setUserId(event.target.value)}
            />
            <label className="label" htmlFor="password">
              PIN
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter PIN"
              className="password-input"
              onChange={event => setPin(event.target.value)}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="error-message">{error && errorMessage}</p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
