import { connect } from 'react-redux';

// import {
//   leaveRoom
// } from '../../actions/rooms/rooms_actions';
import RoomSettings from './room_settings';

const mapStateToProps = (state, ownProps) => ({
  room: state.entities.rooms[ownProps.roomId],
  users: state.entities.users,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  // leaveRoom: roomId => dispatch(leaveRoom(roomId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSettings);
