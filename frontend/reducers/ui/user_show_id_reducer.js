const uiReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    default:
      return state;
  }
};

export default uiReducer;
