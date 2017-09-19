import { connect } from 'react-redux';

import Channels from './channels';
import { fetchChannels } from '../../../actions/channels/channels_actions';

const arrayChannels = state => (
  Object.keys(state.entities.channels).map(
    id => state.entities.channels[id]
  )
);

const mapStateToProps = state => ({
  channels: arrayChannels(state),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: userId => dispatch(fetchChannels(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
