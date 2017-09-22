import React from 'react';

export default class ChannelFeed extends React.Component {
  componentDidMount () {
    this.props.fetchChannelMessages();
  }

  render () {
    const { channel } = this.props;
    const messages = this.props.messages && this.props.messages.map(message =>
      <li key={message.id}>{message.body}</li>
    );

    if (channel) {
      return (
        <div className='channel-feed'>
          <h1>{channel.displayname || channel.channelname}</h1>
          {channel.channelname}
          <ul className='messages'>
            {messages}
          </ul>
        </div>
      );
    } else {
      return (
        <div className='channel-feed'></div>
      );
    }
  }
}
