import * as UsersUtils from './users_utils.js';

export const RECEIVE_USERS = 'RECEIVE_USERS';

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const fetchChannelUsers = channelId => dispatch => (
  UsersUtils.fetchChannelUsers(channelId).then(
    users => dispatch(receiveUsers(users))
  )
);
