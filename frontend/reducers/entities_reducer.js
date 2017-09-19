import { combineReducers } from 'redux';

import channelsReducer from './entities/channels_reducer';

const entitiesReducer = combineReducers({
  channels: channelsReducer
});

export default entitiesReducer;
