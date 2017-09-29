import merge from 'lodash/merge';

import {
  RECEIVE_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL
} from '../../actions/channels/channels_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/session/session_actions';

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      return merge({}, state, {[action.channel.id]: action.channel});
    case REMOVE_CHANNEL:
      const newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    case RECEIVE_CURRENT_USER:
      if (!action.user) {
        return {};
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default channelsReducer;
