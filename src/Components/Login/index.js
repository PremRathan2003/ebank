import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    user: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUser = event => {
    this.setState({user: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {user, pin} = this.state
    const userDetails = {user_id: user, pin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {user, pin, showSubmitError, errorMsg} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />

          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                type="text"
                className="input"
                id="userId"
                value={user}
                onChange={this.onChangeUser}
                placeholder="Enter User ID"
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                type="password"
                className="input"
                id="pin"
                value={pin}
                onChange={this.onChangePin}
                placeholder="Enter PIN"
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
