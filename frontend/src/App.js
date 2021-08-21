import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './screens/Login'
import Register from './screens/Register'
import List from './screens/List'
import Create from './screens/Create'
import Update from './screens/Update'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/tasks" component={List} exact />
          <Route path="/create" component={Create} exact />
          <Route path="/update/:id" component={Update} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;