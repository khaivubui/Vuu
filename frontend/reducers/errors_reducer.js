import { RECEIVE_ERROR } from '../actions/session/session_actions';

const errorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERROR:
      return action.error.responseJSON;
    default:
      return state;
  }
};

export default errorsReducer;
