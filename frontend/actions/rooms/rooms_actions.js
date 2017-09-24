import * as RoomsUtils from './rooms_utils';

export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';

const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
});

const receiveRooms = rooms => ({
  type: RECEIVE_ROOMS,
  rooms
});

export const fetchRooms = () => dispatch => (
  RoomsUtils.fetchRooms().then(
    rooms => dispatch(receiveRooms(rooms))
  )
);

export const createRoom = userIds => dispatch => (
  RoomsUtils.createRoom(userIds).then(
    room => dispatch(receiveRoom(room))
  )
);
