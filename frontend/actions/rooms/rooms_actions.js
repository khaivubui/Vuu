import * as RoomsUtils from './rooms_utils';

const RECEIVE_ROOM = 'RECEIVE_ROOM';

const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
});

export const createRoom = userIds => dispatch => (
  RoomsUtils.createRoom(userIds).then(
    room => dispatch(receiveRoom(room))
  )
);
