import * as SessionUtils from './session_utils';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveError = error => ({
  type: RECEIVE_ERROR,
  error
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const register = user => dispatch => (
  SessionUtils.register(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser)),
    error => dispatch(receiveError(error))
  )
);

export const signIn = user => dispatch => (
  SessionUtils.signIn(user).then(
    currentUser => dispatch(receiveCurrentUser(currentUser)),
    error => dispatch(receiveError(error))
  )
);

// signOut also needs to clear search results from the ui
export const signOut = () => dispatch => (
  SessionUtils.signOut().then(
    emptyUser =>
      dispatch(receiveCurrentUser(null)),
    error => dispatch(receiveError(error))
  )
);
