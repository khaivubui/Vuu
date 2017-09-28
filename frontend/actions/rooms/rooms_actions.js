import * as RoomsUtils from './rooms_utils';

export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';
export const RECEIVE_ROOMS_AND_USERS = 'RECEIVE_ROOMS_AND_USERS';

export const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
});

export const removeRoom = (roomId) => ({
  type: REMOVE_ROOM,
  roomId
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

export const leaveRoom = roomId => dispatch => (
  RoomsUtils.leaveRoom(roomId).then(
    id => dispatch(removeRoom(id))
  )
);

export const addUser = (roomId, userId) => dispatch => (
  RoomsUtils.addUser(roomId, userId)
);

export const updateLastRead = roomId => dispatch => (
  RoomsUtils.updateLastRead(roomId)
);
