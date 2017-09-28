import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchChannelMessagesWithUsers
} from '../../../actions/messages/messages_actions';
import {
  updateLastRead
} from '../../../actions/channels/channels_actions';
import ChannelFeed from './channel_feed';

const channelMessages = (state, channelId) => {
  if (state.entities.channels[channelId]) {
    return state.entities.channels[channelId].messageIds
    .sort((a,b) => a - b).map( // the sort is destructive
      messageId => state.entities.messages[messageId]
    );
  } else {
    return [];
  }
};

const mapStateToProps = (state, props) => ({
  channel: state.entities.channels[props.match.params.channelId],
  messages: channelMessages(state, props.match.params.channelId),
  users: state.entities.users,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchChannelMessagesWithUsers: channelId => dispatch(
    fetchChannelMessagesWithUsers(channelId)
  ),
  updateLastRead: channelId => dispatch(updateLastRead(channelId))
  // fetchChannelUsers: channelId => dispatch(
  //   fetchChannelUsers(channelId)
  // )
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelFeed));
