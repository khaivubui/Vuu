import { connect } from 'react-redux';

import { register } from '../../actions/session/session_actions';
import RegisterForm from './register_form';

// const mapStateToProps = state => ({
// });

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user))
});

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);