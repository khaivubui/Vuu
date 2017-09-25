import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  createChannelMessage
} from '../../../actions/messages/messages_actions';
import MessageInput from '../message_input';

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage:
  (message) => dispatch(createChannelMessage(
    message,
    ownProps.match.params.channelId
  ))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput));
