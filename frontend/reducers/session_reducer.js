import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session/session_actions';
import { RECEIVE_ROOM } from '../actions/rooms/rooms_actions';

const nullUser = {
  currentUser: null
};

const sessionReducer = (state = nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.user };
    case RECEIVE_ROOM:
      if (action.room.userIds.length === 2) {
        const newDmUserIds = action.room.userIds.filter(
          id => id !== state.currentUser.id
        );

        return merge({}, state, {
          currentUser: {
            dmUserIds: newDmUserIds,
            dmsByUserIds: { [newDmUserIds[0]]: action.room}
          }
        });
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default sessionReducer;
