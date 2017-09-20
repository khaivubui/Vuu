import { connect } from 'react-redux';

import {
  createChannel
} from '../../actions/channels/channels_actions';
import NewChannelForm from './new_channel_form';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChannelForm);
