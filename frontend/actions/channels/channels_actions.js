import * as ChannelsUtils from './channels_utils';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

export const fetchChannels = userId => dispatch => (
  ChannelsUtils.fetchChannels(userId).then(
    channels => dispatch({
      type: RECEIVE_CHANNELS,
      channels
    }),
    error => console.log(error)
  )
);
