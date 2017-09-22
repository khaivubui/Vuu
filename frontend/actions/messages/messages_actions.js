import * as MessagesUtils from './messages_utils';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const fetchChannelMessages = () => dispatch => (
  MessagesUtils.fetchChannelMessages.then(
    messages => dispatch(receiveMessages(messages))
  )
);
