export const fetchRoomsAndUsers = () => (
  $.ajax({
    url: `/api/rooms`
  })
);

export const createRoom = (userIds) => (
  $.ajax({
    url: `/api/rooms`,
    method: 'POST',
    data: { userIds }
  })
);

export const leaveRoom = roomId => (
  $.ajax({
    url: `api/rooms/leave/${roomId}`,
    method: 'DELETE'
  })
);

export const addUser = (roomId, userId) => (
  $.ajax({
    url: `/api/rooms/${roomId}/add/${userId}`,
    method: 'POST'
  })
);

export const updateLastRead = roomId => (
  $.ajax({
    url: `/api/rooms/update_last_read/${roomId}`,
    method: 'PATCH'
  })
);
