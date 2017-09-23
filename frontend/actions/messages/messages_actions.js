import * as MessagesUtils from './messages_utils';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGES_WITH_USERS = 'RECEIVE_MESSAGES_WITH_USERS';

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessagesWithUsers = ({messages, users}) => ({
  type: RECEIVE_MESSAGES_WITH_USERS,
  messages,
  users
});

export const createChannelMessage = (message, channelId) => dispatch => (
  MessagesUtils.createChannelMessage(message, channelId)
);

export const fetchChannelMessagesWithUsers = channelId => dispatch => (
  MessagesUtils.fetchChannelMessages(channelId).then(
    data => dispatch(receiveMessagesWithUsers(data))
  )
);
