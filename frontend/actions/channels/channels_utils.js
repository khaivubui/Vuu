export const fetchChannels = () => (
  $.ajax({
    url: `/api/channels`
  })
);
