import { connect } from 'react-redux';

import {
  updateChannel,
  leaveChannel
} from '../../actions/channels/channels_actions';
import ChannelSettings from './channel_settings';

const mapStateToProps = (state, ownProps) => ({
  channel: state.entities.channels[ownProps.channelId],
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  updateChannel: channel => dispatch(updateChannel(channel)),
  leaveChannel: channelId => dispatch(leaveChannel(channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSettings);
