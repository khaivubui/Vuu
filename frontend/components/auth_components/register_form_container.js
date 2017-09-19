import { connect } from 'react-redux';

import RegisterForm from './register_form.jsx';
import { register } from '../../actions/session/session_actions';

// const mapStateToProps = state => ({
// });

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user))
});

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
