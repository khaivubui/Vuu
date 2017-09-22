import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchChannelMessages
} from '../../../actions/messages/messages_actions';
import ChannelFeed from './channel_feed';

const channelMessages = (state, channelId) => {
  if (state.entities.channels[channelId]) {
    return state.entities.channels[channelId].messageIds.map(
      messageId => state.entities.messages[messageId]
    );
  } else {
    return [];
  }
};

const mapStateToProps = (state, props) => ({
  channel: state.entities.channels[props.match.params.channelId],
  messages: channelMessages(state, props.match.params.channelId)
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchChannelMessages: channelId => dispatch(
    fetchChannelMessages(channelId)
  )
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelFeed));
