import { combineReducers } from 'redux';

import channelSearchResultsReducer
from './ui/channel_search_results_reducer';
import userShowReducer
from './ui/user_show_reducer';

const uiReducer = combineReducers({
  channelSearchResults: channelSearchResultsReducer,
  userShow: userShowReducer
});

export default uiReducer;
