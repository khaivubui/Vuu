import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  createRoomMessage
} from '../../../actions/messages/messages_actions';
import MessageInput from '../message_input';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  createMessage:
  (message, roomId) => dispatch(createRoomMessage(message, roomId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput));
