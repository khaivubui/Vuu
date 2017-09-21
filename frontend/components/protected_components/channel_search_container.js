import { connect } from 'react-redux';

import {
  searchChannels,
  joinChannel
} from '../../actions/channels/channels_actions';
import ChannelSearch from './channel_search';

const arrayChannelSearchResults = state => (
  Object.keys(state.ui.channelSearchResults).map(
    id => state.ui.channelSearchResults[id]
  )
);

const mapStateToProps = state => ({
  channelSearchResults: arrayChannelSearchResults(state),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  searchChannels: (query) => dispatch(searchChannels(query)),
  joinChannel: channelId => dispatch(joinChannel(channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSearch);
