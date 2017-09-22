import { connect } from 'react-redux';

import {
  createChannel
} from '../../actions/channels/channels_actions';
import {
  clearErrors
} from '../../actions/session/session_actions';
import { setSocket } from '../../actions/cable_actions';
import NewChannelForm from './new_channel_form';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel)),
  clearErrors: () => dispatch(clearErrors()),
  setSocket: channelName => dispatch(setSocket(channelName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannelForm);
