import { connect } from 'react-redux';

import { openUserShow } from '../../actions/ui/user_show_actions';
import Message from './message';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  openUserShow: userId => dispatch(openUserShow(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
