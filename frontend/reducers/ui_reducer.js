import { combineReducers } from 'redux';

import channelSearchResultsReducer
from './ui/channel_search_results_reducer';
import userShowIdReducer
from './ui/user_show_id_reducer';

const uiReducer = combineReducers({
  channelSearchResults: channelSearchResultsReducer,
  userShowId: userShowIdReducer
});

export default uiReducer;
