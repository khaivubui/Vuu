import {
  UPDATE_CHANNEL_SEARCH_RESULTS
} from '../../actions/channels/channels_actions';
import merge from 'lodash/merge';

const channelSearchResultsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_CHANNEL_SEARCH_RESULTS:
      return action.channelSearchResults;
    default:
      return state;
  }
};

export default channelSearchResultsReducer;
