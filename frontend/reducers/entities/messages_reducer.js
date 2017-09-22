import {
  RECEIVE_MESSAGE, RECEIVE_MESSAGES
} from '../../actions/messages/messages_actions';
import merge from 'lodash/merge';

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return merge({}, state, {[action.message.id]: action.message});
    case RECEIVE_MESSAGES:
      return merge({}, state, action.messages);
    default:
      return state;
  }
};

export default messagesReducer;
