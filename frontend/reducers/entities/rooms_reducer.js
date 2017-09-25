import {
  RECEIVE_ROOM, REMOVE_ROOM, RECEIVE_ROOMS_AND_USERS
} from '../../actions/rooms/rooms_actions';
import merge from 'lodash/merge';

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
    default:
      return state;
  }
};

export default roomsReducer;
