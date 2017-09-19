import { connect } from 'react-redux';

import Rooms from './rooms';

const mapStateToProps = state => ({
  rooms: state.entities.rooms
});

const mapDispatchToProps = dispatch => ({
  // fetchRooms here
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);
