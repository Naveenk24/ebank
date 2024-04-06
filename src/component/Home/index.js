import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const onClickTheLogoutButton = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/ebank/login')
  }

  return (
    <>
      <nav className="nav-element">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button
          type="button"
          className="logout-button"
          onClick={onClickTheLogoutButton}
        >
          Logout
        </button>
      </nav>
      <div className="bg-container">
        <h1 className="home-heading">your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card-logo"
        />
      </div>
    </>
  )
}

export default Home
