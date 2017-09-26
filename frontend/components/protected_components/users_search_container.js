import { connect } from 'react-redux';

import { searchUsers } from '../../actions/users/users_actions';
import { openUserShow } from '../../actions/ui/user_show_actions';
import UsersSearch from './users_search';

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
  openUserShow: userId => dispatch(openUserShow(userId))
  // joinUsers: usersId => dispatch(joinUsers(usersId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersSearch);
