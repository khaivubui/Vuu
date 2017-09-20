import {
  RECEIVE_ERROR,
  CLEAR_ERRORS
} from '../actions/session/session_actions';

const errorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERROR:
      return action.error.responseJSON;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default errorsReducer;
