import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  createChannelMessage
} from '../../../actions/messages/messages_actions';
import MessageInput from '../message_input';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  createMessage:
  (message, channelId) => dispatch(createChannelMessage(message, channelId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput));
