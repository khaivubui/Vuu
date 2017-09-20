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

export const searchChannels = query => (
  $.ajax({
    url: `api/channels/search/${query}`
  })
);
