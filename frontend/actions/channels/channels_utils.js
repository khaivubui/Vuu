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
