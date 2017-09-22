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
    if (this.props.messages.length !== newProps.messages.length) {
      this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
    }
  }

  render () {
    const { channel } = this.props;
    const { users } = this.props;
    const messages = this.props.messages[0] && this.props.messages.map(
      message =>
      <li key={message.id}>
        {users[message.userId].displayname ||
          users[message.userId].displayname.username}
        : {message.body}
      </li>
    );

    if (channel) {
      return (
        <div className='channel-feed'>
          <h1>{channel.displayname || channel.channelname}</h1>
          #{channel.channelname}
          <ul className='messages' ref='messages'>
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
