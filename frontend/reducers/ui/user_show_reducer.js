import merge from 'lodash/merge';

const OPEN_USER_SHOW = 'OPEN_USER_SHOW';
const CLOSE_USER_SHOW = 'CLOSE_USER_SHOW';

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
