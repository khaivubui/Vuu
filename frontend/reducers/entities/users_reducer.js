import {
  RECEIVE_USERS
} from '../../actions/users/users_actions';
import {
  RECEIVE_MESSAGES_WITH_USERS
} from '../../actions/messages/messages_actions';
import {
  RECEIVE_ROOMS_AND_USERS
} from '../../actions/rooms/rooms_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
    case RECEIVE_MESSAGES_WITH_USERS:
      return merge({}, state, action.users);
    case RECEIVE_ROOMS_AND_USERS:
      return merge({}, state, action.users);
    default:
      return state;
  }
};

export default usersReducer;
