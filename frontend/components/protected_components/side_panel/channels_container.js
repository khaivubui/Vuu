import { connect } from 'react-redux';

import Channels from './channels';

const mapStateToProps = state => ({
  channels: state.entities.channels
});

const mapDispatchToProps = dispatch => ({
  // fetchChannels here
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
