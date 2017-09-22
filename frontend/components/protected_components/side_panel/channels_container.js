import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import Channels from './channels';
import { fetchChannels } from '../../../actions/channels/channels_actions';
import { receiveMessage } from '../../../actions/messages/messages_actions';

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
  fetchChannels: () => dispatch(fetchChannels()),
  receiveMessage: message => dispatch(receiveMessage(message))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels));
