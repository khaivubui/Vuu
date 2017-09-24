export const fetchRooms = () => (
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
