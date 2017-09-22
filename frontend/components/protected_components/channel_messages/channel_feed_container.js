import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ChannelFeed from './channel_feed';

const mapStateToProps = (state, props) => ({
  channel: state.entities.channels[props.match.params.channelId]
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelFeed));
