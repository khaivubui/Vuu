import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchRoomMessagesWithUsers
} from '../../../actions/messages/messages_actions';
import RoomFeed from './room_feed';

const roomMessages = (state, roomId) => {
  if (state.entities.rooms[roomId]) {
    return state.entities.rooms[roomId].messageIds
    .sort((a,b) => a - b).map( // the sort is destructive
      messageId => state.entities.messages[messageId]
    );
  } else {
    return [];
  }
};

const mapStateToProps = (state, props) => ({
  room: state.entities.rooms[props.match.params.roomId],
  messages: roomMessages(state, props.match.params.roomId),
  users: state.entities.users
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchRoomMessagesWithUsers: roomId => dispatch(
    fetchRoomMessagesWithUsers(roomId)
  ),
  // fetchRoomUsers: roomId => dispatch(
  //   fetchRoomUsers(roomId)
  // )
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomFeed));
