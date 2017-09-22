import * as UsersUtils from './users_utils.js';

export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const fetchChannelUsers = () => dispatch => (
  UsersUtils.fetchChannelUsers().then(
    users => dispatch(receiveUsers(users))
  )
);
