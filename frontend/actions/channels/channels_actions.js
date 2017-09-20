import * as ChannelsUtils from './channels_utils';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

export const fetchChannels = () => dispatch => (
  ChannelsUtils.fetchChannels().then(
    channels => dispatch({
      type: RECEIVE_CHANNELS,
      channels
    }),
    error => console.log(error)
  )
);

const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

const removeChannel = channelId => ({
  type: REMOVE_CHANNEL,
  channelId
});

export const createChannel = channelData => dispatch => (
  ChannelsUtils.createChannel(channelData).then(
    channel => dispatch(receiveChannel(channel))
  )
);

export const updateChannel = channelData => dispatch => (
  ChannelsUtils.updateChannel(channelData).then(
    channel => dispatch(receiveChannel(channel))
  )
);

export const leaveChannel = channelId => dispatch => (
  ChannelsUtils.leaveChannel(channelId).then(
    id => dispatch(removeChannel(id)) 
  )
);
