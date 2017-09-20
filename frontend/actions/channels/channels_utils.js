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

export const leaveChannel = channelId => (
  $.ajax({
    url: `api/channels/leave/${channelId}`,
    method: 'DELETE'
  })
);
