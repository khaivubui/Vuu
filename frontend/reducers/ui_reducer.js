import { combineReducers } from 'redux';

import channelSearchResultsReducer
from './channel_search_results_reducer';

const uiReducer = combineReducers({
  channelSearchResults: channelSearchResultsReducer
});

export default uiReducer;
