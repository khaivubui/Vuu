import merge from 'lodash/merge';

import {
  OPEN_USER_SHOW, CLOSE_USER_SHOW
} from '../../actions/ui/user_show_actions';

const initialState = { isOpen: false, userId: null};

const userShowReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_USER_SHOW:
      return { isOpen: true, userId: action.userId };
    case CLOSE_USER_SHOW:
      return initialState;
    default:
      return state;
  }
};

export default userShowReducer;
