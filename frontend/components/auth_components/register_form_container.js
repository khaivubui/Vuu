import { connect } from 'react-redux';

import {
  register, signIn, clearErrors
} from '../../actions/session/session_actions';
import RegisterForm from './register_form';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  guestSignIn: () => dispatch(signIn({
    username: 'guest',
    password: 'password'
  })),
  register: user => dispatch(register(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
