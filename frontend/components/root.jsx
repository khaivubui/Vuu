import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';

import {
  receiveMessage
} from '../actions/messages/messages_actions';

class Root extends React.Component {
  //...

  // create some kind of function that creates a socket connection
  // (possibly delete all others) and run that function where needed (onEnter?)
  setSocket (channelName) {
    if (window.App.channel) {
      this.removeSocket();
    }
    this.addSocket(channelName);
  }

  // helper
  removeSocket () {
    window.App.cable.subscriptions.remove(window.App.channel);
  }

  // helper
  addSocket (channelName) {
    window.App.channel = window.App.cable.subscriptions.create(
      {
        channel: 'ChannelChannel',
        channel_name: channelName
      }, {
        connected: () => { console.log('HELL YES CONNECTED');},
        disconnected: () => { console.log('k then disconencted');},
        received: (data) => {
          console.log('received something', data);
          this.props.store.dispatch(receiveMessage(data.message));
        }
      }
    );
  }

  render () {
    debugger;
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
