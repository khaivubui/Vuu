import { connect } from 'react-redux';

import {
  searchUsers
} from '../../actions/users/users_actions';
import UsersSearch from './users_search';

// const arrayChannelSearchResults = state => (
//   Object.keys(state.ui.channelSearchResults).map(
//     id => state.ui.channelSearchResults[id]
//   )
// );

const mapStateToProps = state => ({
  // channelSearchResults: arrayChannelSearchResults(state),
  // currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  // searchChannels: (query) => dispatch(searchChannels(query)),
  // clearSearch: () => dispatch({
  //   type: 'UPDATE_CHANNEL_SEARCH_RESULTS',
  //   channelSearchResults: {}
  // }),
  // joinChannel: channelId => dispatch(joinChannel(channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersSearch);
