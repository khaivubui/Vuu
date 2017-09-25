import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  createChannel
} from '../../actions/channels/channels_actions';
import {
  clearErrors
} from '../../actions/session/session_actions';
import NewChannelForm from './new_channel_form';

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel)),
  clearErrors: () => dispatch(clearErrors())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannelForm));
