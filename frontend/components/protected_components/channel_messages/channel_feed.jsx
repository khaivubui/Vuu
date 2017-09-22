import React from 'react';

export default class ChannelFeed extends React.Component {
  componentDidMount () {
    this.props.fetchChannelMessages(this.props.match.params.channelId);
  }

  componentWillReceiveProps (newProps) {
    if (this.props.match.params.channelId !==
        newProps.match.params.channelId) {
      this.props.fetchChannelMessages(newProps.match.params.channelId);
    }
  }

  render () {
    const { channel } = this.props;
    const messages = this.props.messages[0] && this.props.messages.map(
      message => <li key={message.id}>{message.body}</li>
    );

    if (channel) {
      return (
        <div className='channel-feed'>
          <h1>{channel.displayname || channel.channelname}</h1>
          #{channel.channelname}
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
