import { RECEIVE_CHANNELS } from '../../actions/channels/channels_actions';

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    default:
      return state;
  }
};

export default channelsReducer;
