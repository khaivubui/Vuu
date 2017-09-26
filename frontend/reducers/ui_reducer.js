import { combineReducers } from 'redux';

import channelSearchResultsReducer
from './ui/channel_search_results_reducer';
import usersSearchResultsReducer
from './ui/users_search_results_reducer';
import userShowReducer
from './ui/user_show_reducer';

const uiReducer = combineReducers({
  channelSearchResults: channelSearchResultsReducer,
  usersSearchResults: usersSearchResultsReducer,
  userShow: userShowReducer
});

export default uiReducer;
