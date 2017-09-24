import { combineReducers } from 'redux';

import channelsReducer from './entities/channels_reducer';
import roomsReducer from './entities/rooms_reducer';
import usersReducer from './entities/users_reducer';
import messagesReducer from './entities/messages_reducer';

const entitiesReducer = combineReducers({
  channels: channelsReducer,
  rooms: roomsReducer,
  users: usersReducer,
  messages: messagesReducer
});

export default entitiesReducer;
