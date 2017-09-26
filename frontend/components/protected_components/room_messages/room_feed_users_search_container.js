import { connect } from 'react-redux';

import { searchUsers } from '../../../actions/users/users_actions';
import { addUser } from '../../../actions/rooms/rooms_actions';
import RoomFeedUsersSearch from './room_feed_users_search';

const arrayUsersSearchResults = state => (
  Object.keys(state.ui.usersSearchResults).map(
    id => state.ui.usersSearchResults[id]
  )
);

const mapStateToProps = state => ({
  usersSearchResults: arrayUsersSearchResults(state),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  searchUsers: (query) => dispatch(searchUsers(query)),
  clearSearch: () => dispatch({
    type: 'UPDATE_USERS_SEARCH_RESULTS',
    usersSearchResults: {}
  }),
  addUser: (roomId, userId) => dispatch(addUser(roomId, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomFeedUsersSearch);
