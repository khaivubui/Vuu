import { combineReducers } from 'redux';

import channelsReducer from './entities/channels_reducer';
import messagesReducer from './entities/messages_reducer';

const entitiesReducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer
});

export default entitiesReducer;
