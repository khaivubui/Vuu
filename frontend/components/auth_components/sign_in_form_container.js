import { connect } from 'react-redux';

import { signIn } from '../../actions/session/session_actions';
import SignInForm from './sign_in_form';

// const mapStateToProps = state => ({
// });

const mapDispatchToProps = dispatch => ({
  signIn: user => dispatch(signIn(user))
});

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);
