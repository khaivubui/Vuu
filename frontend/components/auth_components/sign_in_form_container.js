import { connect } from 'react-redux';

import {
  signIn, clearErrors
} from '../../actions/session/session_actions';
import SignInForm from './sign_in_form';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  signIn: user => dispatch(signIn(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
