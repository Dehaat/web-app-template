import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import Home from 'routes/Home'

import history from 'config/history'

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
)

export default App
