export const createChannelMessage = (message, channelId) => (
  $.ajax({
    url: `/api/channels/${channelId}/messages`,
    method: 'POST',
    data: { message }
  })
);

export const createRoomMessage = (message, roomId) => (
  $.ajax({
    url: `/api/rooms/${roomId}/messages`,
    method: 'POST',
    data: { message }
  })
);

export const fetchChannelMessagesWithUsers = channelId => (
  $.ajax({
    url: `/api/channels/${channelId}/messages`
  })
);

export const fetchRoomMessagesWithUsers = roomId => (
  $.ajax({
    url: `/api/rooms/${roomId}/messages`
  })
);
