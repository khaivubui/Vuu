import {
  receiveMessage // works for both channels and rooms
} from './messages/messages_actions';
import {
  receiveUsers // works for both channels and rooms
} from './users/users_actions';
import {
  receiveChannel
} from './channels/channels_actions';
import {
  receiveRoom
} from './rooms/rooms_actions';
import {
  receiveCurrentUser
} from './session/session_actions';

export const setSocket = username => dispatch => {
  if (window.App.channel) {
    removeSocket(username);
  }
  addSocket(username, dispatch);
};

// helper
const removeSocket = username => {
  window.App.cable.subscriptions.remove(window.App.channel);
};

// helper
const addSocket = (username, dispatch) => {
  window.App.channel = window.App.cable.subscriptions.create({
    channel: 'UserChannel',
    username
  }, {
    connected: () => {},
    disconnected: () => {},
    received: (data) => {
      if (data.message) {
        dispatch(receiveMessage(data.message));
      }
      if (data.users) {
        dispatch(receiveUsers(data.users));
      }
      if (data.channel) {
        dispatch(receiveChannel(data.channel));
      }
      if (data.room) {
        dispatch(receiveRoom(data.room));
      }
      if (data.currentUser) {
        dispatch(receiveCurrentUser(data.currentUser));
      }
    }
  });
};
