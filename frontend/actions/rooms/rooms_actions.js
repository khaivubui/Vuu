import * as RoomsUtils from './rooms_utils';

export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ROOMS_AND_USERS = 'RECEIVE_ROOMS_AND_USERS';

export const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
});

const receiveRoomsAndUsers = (rooms, users) => ({
  type: RECEIVE_ROOMS_AND_USERS,
  rooms,
  users
});

export const fetchRoomsAndUsers = () => dispatch => (
  RoomsUtils.fetchRoomsAndUsers().then(
    data => dispatch(receiveRoomsAndUsers(data.rooms, data.users))
  )
);

export const createRoom = userIds => dispatch => (
  RoomsUtils.createRoom(userIds).then(
    room => dispatch(receiveRoom(room))
  )
);
