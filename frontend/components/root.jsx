import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';

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

  removeSocket () {
    window.App.cable.subscriptions.remove(window.App.channel);
  }

  addSocket (channelName) {
    window.App.channel = window.App.cable.subscriptions.create(
      {
        channel: 'ChannelChannel',
        channel_name: channelName
      }, {
        connected: () => {},
        disconnected: () => {},
        received: (data) => {
          this.props.store.dispatch(receiveMessage(data.message));
        }
      }
    );
  }

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
