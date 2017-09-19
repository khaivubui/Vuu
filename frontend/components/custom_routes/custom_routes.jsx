import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, exact, loggedIn }) => (
  <Route
    path={path}
    exact={exact}
    render={props => {
      if (loggedIn) {
        return <Redirect to='/messages'/>;
      } else {
        return <Component {...props} />;
      }
    }}/>
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser)
});

export const AuthRoute = withRouter(
  connect(mapStateToProps)(Auth)
);

const Protected = ({ component: Component, path, exact, loggedIn }) => (
  <Route
    path={path}
    exact={exact}
    render={props => {
      if (loggedIn) {
        return <Component {...props} />;
      } else {
        return <Redirect to='/'/>;
      }
    }}/>
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);
