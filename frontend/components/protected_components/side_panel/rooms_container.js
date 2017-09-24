import { connect } from 'react-redux';

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
  // fetchRooms here
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);
