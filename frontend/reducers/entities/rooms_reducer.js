import {
  RECEIVE_ROOM
} from '../../actions/rooms/rooms_actions';
import merge from 'lodash/merge';

const roomsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ROOM:
      return merge({}, state, {[action.room.id]: action.room});
    default:
      return state;
  }
};

export default roomsReducer;