import './index.css'
import {Component} from 'react'
import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'

// {jwt_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'}

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    try {
      const url = 'https://apis.ccbp.in/login'
      const userDetails = {username, password}
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        console.log(data.error_msg)
        this.setState({
          errMsg: data.error_msg,
        })
      }
    } catch (error) {
      console.log(`network error: ${error}`)
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            className="logo-img"
            alt=" website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <label className="label-text" htmlFor="username">
            USERNAME
          </label>
          <input
            value={username}
            type="text"
            placeholder="USERNAME"
            id="username"
            className="username-input-field"
            onChange={this.onChangeUsername}
          />
          <label className="label-text" htmlFor="password">
            PASSWORD
          </label>
          <input
            value={password}
            type="password"
            placeholder="password"
            id="password"
            className="password-input-field"
            onChange={this.onChangePassword}
          />
          <button className="login-btn" type="submit">
            Login
          </button>
          {errMsg && <p className="error-message">* {errMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
