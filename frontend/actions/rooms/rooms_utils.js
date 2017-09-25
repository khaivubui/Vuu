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
