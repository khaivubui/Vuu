import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchRoomsAndUsers } from '../../../actions/rooms/rooms_actions';
import Rooms from './rooms';

const arrayRooms = state => (
  Object.keys(state.entities.rooms).map(
    id => state.entities.rooms[id]
  )
);


const mapStateToProps = state => ({
  users: state.entities.users,
  rooms: arrayRooms(state),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchRoomsAndUsers: () => dispatch(fetchRoomsAndUsers())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms));
