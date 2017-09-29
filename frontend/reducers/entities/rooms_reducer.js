import merge from 'lodash/merge';

import {
  RECEIVE_ROOM, REMOVE_ROOM, RECEIVE_ROOMS_AND_USERS
} from '../../actions/rooms/rooms_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/session/session_actions';

const roomsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ROOMS_AND_USERS:
      return action.rooms || {};
    case RECEIVE_ROOM:
      newState[action.room.id] = action.room;
      return newState;
    case REMOVE_ROOM:
      delete newState[action.roomId];
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

export default roomsReducer;
