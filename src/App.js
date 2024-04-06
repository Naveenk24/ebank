import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './component/Login/index'

import Home from './component/Home/index'

import NotFound from './component/NotFound/index'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
