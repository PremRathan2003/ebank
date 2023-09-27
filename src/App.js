import './App.css'
import {Route, Switch} from 'react-router-dom'

import Home from './Components/Home'
import Login from './Components/Login'
import NotFound from './Components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)
export default App
