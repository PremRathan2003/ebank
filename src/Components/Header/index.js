import './index.css'
import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickRemove = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="logo-img"
      />
      <button type="button" className="logout-btn" onClick={onClickRemove}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
