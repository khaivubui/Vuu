import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createRoom } from '../../actions/rooms/rooms_actions';
import { closeUserShow } from '../../actions/ui/user_show_actions';
import UserShow from './user_show';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  user: state.entities.users[state.ui.userShow.userId],
  isOpen: state.ui.userShow.isOpen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createRoom: userId => dispatch(createRoom([userId])),
  closeUserShow: () => dispatch(closeUserShow())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow));
