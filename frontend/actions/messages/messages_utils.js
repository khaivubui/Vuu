export const createChannelMessage = (message, channelId) => (
  $.ajax({
    url: `/api/channels/${channelId}/messages`,
    method: 'POST',
    data: { message }
  })
);

export const fetchChannelMessages = channelId => (
  $.ajax({
    url: `/api/channels/${channelId}/messages`
  })
);

export const fetchRoomMessagesWithUsers = roomId => (
  $.ajax({
    url: `/api/rooms/${roomId}/messages`
  })
);
