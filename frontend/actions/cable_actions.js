import {
  receiveMessage
} from './messages/messages_actions';
import {
  receiveUsers
} from './users/users_actions';
import {
  receiveChannel
} from './channels/channels_actions';

export const setSocket = channelName => dispatch => {
  if (window.App.channels && window.App.channels[channelName]) {
    removeSocket(channelName);
  }
  addSocket(channelName, dispatch);
};

// helper
const removeSocket = channelName => {
  window.App.cable.subscriptions.remove(window.App.channels[channelName]);
};

// helper
const addSocket = (channelName, dispatch) => {
  window.App.channels = window.App.channels || {};
  window.App.channels[channelName] = window.App.cable.subscriptions.create({
    channel: 'ChannelChannel',
    channel_name: channelName
  }, {
    connected: () => {},
    disconnected: () => {},
    received: (data) => {
      console.log(data);
      if (data.message) {
        dispatch(receiveMessage(data.message));
      }
      if (data.users) {
        dispatch(receiveUsers(data.users));
      }
      if (data.channel) {
        dispatch(receiveChannel(data.channel));
      }
    }
  });
};
