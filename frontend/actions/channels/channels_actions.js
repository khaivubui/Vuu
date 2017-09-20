import * as ChannelsUtils from './channels_utils';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';

export const fetchChannels = () => dispatch => (
  ChannelsUtils.fetchChannels().then(
    channels => dispatch({
      type: RECEIVE_CHANNELS,
      channels
    }),
    error => console.log(error)
  )
);

export const createChannel = channelData => dispatch => (
  ChannelsUtils.createChannel(channelData).then(
    channel => dispatch({
      type: RECEIVE_CHANNEL,
      channel
    })
  )
);
