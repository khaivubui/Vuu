export const fetchChannels = userId => (
  $.ajax({
    url: `/api/users/${userId}/channels`
  })
);
