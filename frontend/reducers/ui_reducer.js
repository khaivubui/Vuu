const uiReducer = (state = {loading: false}, action) => {
  Object.freeze(state);
  switch (action.type) {
    default:
      return state;
  }
};

export default uiReducer;
