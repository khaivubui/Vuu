import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = {
    session: {
      currentUser: window.currentUser || null,
    },
    entities: {},
    ui: {
      loading: false
    },
    errors: []
  };
  delete window.currentUser;

  const store = configureStore(preloadedState);
  window.store = store;


  const root = document.getElementById('root');
  ReactDOM.render(
    <Root store={store}/>,
    root
  );
});
