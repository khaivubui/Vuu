import {
  receiveMessage
} from './actions/messages/messages_actions';

// create some kind of function that creates a socket connection
// (possibly delete all others) and run that function where needed (onEnter?)
export default (channelName) => {
  if (window.App.channel) {
    removeSocket();
  }
  addSocket(channelName);
};

// helper
const removeSocket = () => {
  window.App.cable.subscriptions.remove(window.App.channel);
};

// helper
const addSocket = (channelName) => {
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
