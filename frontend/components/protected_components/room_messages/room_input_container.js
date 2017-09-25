import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  createRoomMessage
} from '../../../actions/messages/messages_actions';
import MessageInput from '../message_input';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage:
  (message) => dispatch(createRoomMessage(
    message,
    ownProps.match.params.roomId
  ))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput));
