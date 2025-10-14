import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

const Header = props => {
  const handleLogoutBtn = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-nav">
      <div className="header-container">
        <Link to="/">
          <img
            className="header-logo-img"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
        <ul className="home-and-job-container">
          <li>
            <Link to="/" className="header-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="header-link">
              Jobs
            </Link>
          </li>
          <li className="logout-btn-list-item">
            <button
              onClick={handleLogoutBtn}
              className="logout-btn"
              type="button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
