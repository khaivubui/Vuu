export const fetchChannels = () => (
  $.ajax({
    url: `/api/channels`
  })
);

export const createChannel = channel => (
  $.ajax({
    url: `api/channels`,
    method: 'POST',
    data: { channel }
  })
);

export const updateChannel = channel => (
  $.ajax({
    url: `api/channels/${channel.id}`,
    method: 'PATCH',
    data: { channel }
  })
);

export const leaveChannel = channelId => (
  $.ajax({
    url: `api/channels/leave/${channelId}`,
    method: 'DELETE'
  })
);

export const joinChannel = channelId => (
  $.ajax({
    url: `api/channels/join/${channelId}`,
    method: 'POST'
  })
);

export const searchChannels = query => (
  $.ajax({
    url: `api/channels/search/${query}`
  })
);

export const updateLastRead = channelId => (
  $.ajax({
    url: `/api/channels/update_last_read/${channelId}`,
    method: 'PATCH'
  })
);
