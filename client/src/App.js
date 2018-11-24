import React, { Component } from 'react';
import { connect } from "react-redux"
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./components/Home"
import Register from './components/Register'
import Login from "./components/Login"
import Board from './components/Board'
import Profile from './components/Profile'
import { verify } from "./redux/auth"

class App extends Component {
  componentDidMount(){
    this.props.verify()
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/register" render = { props => isAuthenticated ? 
              <Redirect to="/board" /> : <Register {...props} /> 
              } />
          <Route path="/login" render = { props => isAuthenticated ?
              <Redirect to="/board" /> : <Login {...props} />
              } />
          <ProtectedRoute path="/board" isAuthenticated= {isAuthenticated} component={ Board } />
          <ProtectedRoute path="/profile" isAuthenticated= {isAuthenticated} component={ Profile } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(state => ({auth: state.auth}), { verify })(App));
