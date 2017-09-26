export const searchUsers = query => (
  $.ajax({
    url: `api/users/search/${query}`
  })
);
