import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';

import {
  receiveMessage
} from '../actions/messages/messages_actions';

class Root extends React.Component {
  render () {
    return (
      <Provider store={ this.props.store }>
        <HashRouter>
          <App/>
        </HashRouter>
      </Provider>
    );
  }
}

export default Root;
