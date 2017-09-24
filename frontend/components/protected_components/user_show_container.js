import { connect } from 'react-redux';

import { closeUserShow } from '../../actions/ui/user_show_actions';
import UserShow from './user_show';

const mapStateToProps = state => ({
  user: state.entities.users[state.ui.userShow.userId],
  isOpen: state.ui.userShow.isOpen
});

const mapDispatchToProps = dispatch => ({
  // openUserShow: userId => dispatch(openUserShow(userId))
  closeUserShow: () => dispatch(closeUserShow())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
