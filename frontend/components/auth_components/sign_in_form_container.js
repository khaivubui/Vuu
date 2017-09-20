import { connect } from 'react-redux';

import { signIn } from '../../actions/session/session_actions';
import SignInForm from './sign_in_form';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  signIn: user => dispatch(signIn(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
