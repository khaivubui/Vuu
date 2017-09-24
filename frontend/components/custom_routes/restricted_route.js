import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.session.currentUser),
  channelIds: Object.keys(state.entities.channels),
  roomIds: Object.keys(state.entities.rooms)
});

const Restricted = ({
  component: Component, path, exact, loggedIn, channelIds, roomIds }) => (
  <Route
    path={path}
    exact={exact}
    render={props => {
      const { channelId } = props.match.params;
      const { roomId } = props.match.params;
      if (loggedIn &&
          (channelId &&
          channelIds.includes(channelId) ||
          (roomId &&
          roomIds.includes(roomId)))) {
        return <Component {...props} />;
      } else {
        return <Redirect to='/messages'/>;
      }
    }}/>
);

export default withRouter(
  connect(mapStateToProps)(Restricted)
);
