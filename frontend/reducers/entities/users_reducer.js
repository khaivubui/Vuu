import {
  RECEIVE_USERS
} from '../../actions/users/users_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      // ??
    default:
      return state;
  }
};

export default usersReducer;
