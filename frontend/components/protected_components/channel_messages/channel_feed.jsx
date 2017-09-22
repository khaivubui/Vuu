import React from 'react';

export default class ChannelFeed extends React.Component {
  render () {
    const { channel } = this.props;

    if (channel) {
      return (
        <div className='channel-feed'>
          <h1>{channel.displayname || channel.channelname}</h1>
          {channel.channelname}
        </div>
      );
    } else {
      return (
        <div className='channel-feed'></div>
      );
    }
  }
}
