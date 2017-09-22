import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.currentUser),
  channelIds: Object.keys(state.entities.channels)
});

const Restricted = ({
  component: Component, path, exact, loggedIn, channelIds }) => (
  <Route
    path={path}
    exact={exact}
    render={props => {
      if (loggedIn && channelIds.includes(props.match.params.channelId)) {
        return <Component {...props} />;
      } else {
        return <Redirect to='/messages'/>;
      }
    }}/>
);

export default withRouter(
  connect(mapStateToProps)(Restricted)
);
