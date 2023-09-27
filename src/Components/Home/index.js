import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-container">
      <Header />
      <h1 className="home-heading">Your flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="card-img"
      />
    </div>
  )
}
export default Home
