import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  createChannelMessage
} from '../../../actions/messages/messages_actions';
import ChannelInput from './channel_input';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  createChannelMessage:
  (message, channelId) => dispatch(createChannelMessage(message, channelId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelInput));
