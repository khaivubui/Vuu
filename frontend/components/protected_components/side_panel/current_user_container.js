import { connect } from 'react-redux';

import { setSocket } from '../../../actions/cable_actions';
import { signOut } from '../../../actions/session/session_actions';
import { openUserShow } from '../../../actions/ui/user_show_actions';
import CurrentUser from './current_user';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  setSocket: username => dispatch(setSocket(username)),
  openUserShow: userId => dispatch(openUserShow(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentUser);
