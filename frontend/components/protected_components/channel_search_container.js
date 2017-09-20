import { connect } from 'react-redux';

import {
  searchChannels
} from '../../actions/channels/channels_actions';
import ChannelSearch from './channel_search';

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
  searchChannels: (query) => dispatch(searchChannels(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSearch);
