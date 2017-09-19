import { connect } from 'react-redux';

import { signOut } from '../../actions/session/session_actions';
import SignOutButton from './sign_out_button';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutButton);
