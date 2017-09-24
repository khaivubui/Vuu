export const OPEN_USER_SHOW = 'OPEN_USER_SHOW';
export const CLOSE_USER_SHOW = 'CLOSE_USER_SHOW';

export const openUserShow = userId => ({
  type: OPEN_USER_SHOW,
  userId
});

export const closeUserShow = () => ({
  type: CLOSE_USER_SHOW
});
