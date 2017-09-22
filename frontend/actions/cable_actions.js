import {
  receiveMessage
} from './messages/messages_actions';
import {
  fetchChannels
} from './channels/channels_actions';

// create some kind of function that creates a socket connection
// (possibly delete all others) and run that function where needed (onEnter?)
export const setSocket = channelName => dispatch => {
  if (window.App.channel && window.App.channel[channelName]) {
    removeSocket(channelName);
  }
  addSocket(channelName, dispatch);
};

// helper
const removeSocket = channelName => {
  window.App.cable.subscriptions.remove(window.App.channel[channelName]);
};

// helper
const addSocket = (channelName, dispatch) => {
  window.App.channel = window.App.channel || {};
  window.App.channel[channelName] = window.App.cable.subscriptions.create({
    channel: 'ChannelChannel',
    channel_name: channelName
  }, {
    connected: () => {},
    disconnected: () => {},
    received: (data) => {
      dispatch(receiveMessage(data.message));
      dispatch(fetchChannels()); // make this front end
    }
  });
};
