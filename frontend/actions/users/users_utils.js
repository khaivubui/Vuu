export const fetchChannelUsers = channelId => (
  $.ajax({
    url: `/api/channels/${channelId}/users`
  })
);
